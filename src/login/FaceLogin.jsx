import React from 'react';
import FaceCapture from './FaceCapture';

export default function FaceLogin({ onBack, onDone }) {
  const handleFaceLogin = (data) => {
    if (data.success) {
      onDone && onDone(data.userName || 'User');
    }
  };

  return (
    <FaceCapture
      mode="login"
      onBack={onBack}
      onCapture={handleFaceLogin}
    />
  );
}


