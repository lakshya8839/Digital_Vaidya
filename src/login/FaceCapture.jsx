import React, { useRef, useState, useEffect } from 'react';

export default function FaceCapture({ onBack, onCapture, mode = 'register', userName = '', mobile = '' }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      setCaptured(true);
    }
  };

  const retake = () => {
    setCaptured(false);
    setCapturedImage(null);
    setError('');
  };

  const handleSubmit = async () => {
    if (!capturedImage) return;
    
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = mode === 'register' 
        ? '/api/face/register'
        : '/api/face/login';
      
      const requestBody = mode === 'register' 
        ? { image: capturedImage, userName: userName, mobile: mobile }
        : { image: capturedImage };
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      const data = await response.json();
      
      if (data.success) {
        stopCamera();
        onCapture && onCapture(data);
      } else {
        setError(data.message || 'Face processing failed');
        retake();
      }
    } catch (err) {
      console.error('Face processing error:', err);
      setError('Failed to process face. Please ensure the backend server is running.');
      retake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40">
        <div className="text-sm opacity-80 mb-3">
          {mode === 'register' 
            ? 'Position your face in the frame and capture' 
            : 'Look at the camera to login'}
        </div>
        
        {error && (
          <div className="mb-3 p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm">
            {error}
          </div>
        )}
        
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
          {!captured ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                  <div className="text-white text-sm">Initializing camera...</div>
                </div>
              )}
              <div className="absolute inset-0 border-4 border-cyan-500/50 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cyan-400"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-400"></div>
              </div>
            </>
          ) : (
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
          )}
        </div>
        
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {!captured ? (
          <button
            onClick={captureImage}
            disabled={!cameraReady}
            className="mt-4 w-full btn-primary flex items-center justify-center gap-2"
          >
            <span>📸</span>
            <span>Capture Face</span>
          </button>
        ) : (
          <div className="mt-4 flex gap-2">
            <button onClick={retake} className="flex-1 btn-secondary">
              Retake
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 btn-primary"
            >
              {loading ? 'Processing...' : mode === 'register' ? 'Register' : 'Login'}
            </button>
          </div>
        )}
      </div>
      
      <div className="flex justify-start">
        <button onClick={() => { stopCamera(); onBack && onBack(); }} className="btn-secondary">
          Back
        </button>
      </div>
    </div>
  );
}
