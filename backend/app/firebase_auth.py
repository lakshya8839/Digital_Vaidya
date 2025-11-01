import firebase_admin
from firebase_admin import auth, credentials
from flask import request, jsonify
from functools import wraps
import os


def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    if not firebase_admin._apps:
        firebase_config = {
            "apiKey": os.environ.get("GOOGLE_API_KEY"),
            "authDomain": "gen-lang-client-0305521767.firebaseapp.com",
            "projectId": "gen-lang-client-0305521767",
            "storageBucket": "gen-lang-client-0305521767.firebasestorage.app",
            "messagingSenderId": "1045199943755",
            "appId": "1:1045199943755:web:4964c2c22b6d04f563f5ce"
        }
        
        cred = credentials.Certificate({
            "type": "service_account",
            "project_id": firebase_config["projectId"],
            "private_key_id": os.environ.get("FIREBASE_PRIVATE_KEY_ID"),
            "private_key": os.environ.get("FIREBASE_PRIVATE_KEY", "").replace('\\n', '\n'),
            "client_email": os.environ.get("FIREBASE_CLIENT_EMAIL"),
            "client_id": os.environ.get("FIREBASE_CLIENT_ID"),
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs"
        }) if os.environ.get("FIREBASE_PRIVATE_KEY") else None
        
        if cred:
            firebase_admin.initialize_app(cred)
        else:
            firebase_admin.initialize_app()


def verify_token(f):
    """Decorator to verify Firebase ID token"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'error': 'No token provided', 'ok': False}), 401
        
        try:
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': f'Invalid token: {str(e)}', 'ok': False}), 401
    
    return decorated_function


def optional_auth(f):
    """Decorator for optional authentication - adds user info if token is present"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if token:
            try:
                decoded_token = auth.verify_id_token(token)
                request.user = decoded_token
            except:
                request.user = None
        else:
            request.user = None
        
        return f(*args, **kwargs)
    
    return decorated_function
