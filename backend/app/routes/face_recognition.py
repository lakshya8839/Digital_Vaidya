from flask import Blueprint, request, jsonify
import cv2
import numpy as np
import base64
import json
import os
from pathlib import Path
from datetime import datetime

bp = Blueprint("face_recognition", __name__)

FACE_DATA_DIR = 'backend/face_data'
os.makedirs(FACE_DATA_DIR, exist_ok=True)

CASCADE_PATH = str(Path(__file__).resolve().parent.parent / 'cascade_data' / 'haarcascade_frontalface_default.xml')
face_cascade = cv2.CascadeClassifier(CASCADE_PATH)

if face_cascade.empty():
    raise RuntimeError(f"Failed to load Haar cascade from {CASCADE_PATH}. File may be missing or corrupted.")

def decode_base64_image(base64_string):
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    
    img_data = base64.b64decode(base64_string)
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def detect_face(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5, minSize=(100, 100))
    
    if len(faces) == 0:
        return None
    
    x, y, w, h = faces[0]
    face_roi = img[y:y+h, x:x+w]
    face_resized = cv2.resize(face_roi, (128, 128))
    
    return face_resized

def compute_face_histogram(face):
    hist_b = cv2.calcHist([face], [0], None, [256], [0, 256])
    hist_g = cv2.calcHist([face], [1], None, [256], [0, 256])
    hist_r = cv2.calcHist([face], [2], None, [256], [0, 256])
    
    hist_b = cv2.normalize(hist_b, hist_b).flatten()
    hist_g = cv2.normalize(hist_g, hist_g).flatten()
    hist_r = cv2.normalize(hist_r, hist_r).flatten()
    
    return np.concatenate([hist_b, hist_g, hist_r])

def compare_faces(hist1, hist2):
    correlation = cv2.compareHist(hist1.reshape(-1, 1), hist2.reshape(-1, 1), cv2.HISTCMP_CORREL)
    return correlation

@bp.route('/face/register', methods=['POST'])
def register_face():
    try:
        data = request.json
        mobile = data.get('mobile')
        image_data = data.get('image')
        user_name = data.get('userName', 'User')
        
        if not mobile or not image_data:
            return jsonify({'success': False, 'message': 'Mobile and image are required'}), 400
        
        img = decode_base64_image(image_data)
        if img is None:
            return jsonify({'success': False, 'message': 'Invalid image data'}), 400
        
        face = detect_face(img)
        if face is None:
            return jsonify({'success': False, 'message': 'No face detected. Please ensure your face is clearly visible.'}), 400
        
        face_histogram = compute_face_histogram(face)
        
        user_data = {
            'mobile': mobile,
            'userName': user_name,
            'faceHistogram': face_histogram.tolist(),
            'registeredAt': datetime.now().isoformat()
        }
        
        file_path = os.path.join(FACE_DATA_DIR, f'{mobile}.json')
        with open(file_path, 'w') as f:
            json.dump(user_data, f)
        
        face_image_path = os.path.join(FACE_DATA_DIR, f'{mobile}_face.jpg')
        cv2.imwrite(face_image_path, face)
        
        return jsonify({
            'success': True,
            'message': 'Face registered successfully',
            'userName': user_name
        })
    
    except Exception as e:
        print(f"Error in register_face: {str(e)}")
        return jsonify({'success': False, 'message': f'Error: {str(e)}'}), 500

@bp.route('/face/login', methods=['POST'])
def login_face():
    try:
        data = request.json
        image_data = data.get('image')
        
        if not image_data:
            return jsonify({'success': False, 'message': 'Image is required'}), 400
        
        img = decode_base64_image(image_data)
        if img is None:
            return jsonify({'success': False, 'message': 'Invalid image data'}), 400
        
        face = detect_face(img)
        if face is None:
            return jsonify({'success': False, 'message': 'No face detected. Please ensure your face is clearly visible.'}), 400
        
        current_histogram = compute_face_histogram(face)
        
        best_match = None
        best_score = -1
        threshold = 0.75
        
        for filename in os.listdir(FACE_DATA_DIR):
            if filename.endswith('.json'):
                file_path = os.path.join(FACE_DATA_DIR, filename)
                with open(file_path, 'r') as f:
                    user_data = json.load(f)
                
                stored_histogram = np.array(user_data['faceHistogram'])
                score = compare_faces(current_histogram, stored_histogram)
                
                if score > best_score:
                    best_score = score
                    best_match = user_data
        
        if best_match and best_score >= threshold:
            return jsonify({
                'success': True,
                'message': 'Face recognized successfully',
                'mobile': best_match['mobile'],
                'userName': best_match['userName'],
                'confidence': float(best_score)
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Face not recognized. Please try again or use another login method.',
                'confidence': float(best_score) if best_score > 0 else 0
            }), 401
    
    except Exception as e:
        print(f"Error in login_face: {str(e)}")
        return jsonify({'success': False, 'message': f'Error: {str(e)}'}), 500

@bp.route('/face/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Face recognition API is running'})
