import React from 'react';
import FaceCapture from './FaceCapture';

export default function FaceRegister({ onBack, onDone, onSkip, userName, mobile }) {
  const [showCapture, setShowCapture] = React.useState(false);

  const handleFaceRegistration = (data) => {
    if (data.success) {
      onDone && onDone();
    }
  };

  if (showCapture) {
    return (
      <FaceCapture
        mode="register"
        userName={userName}
        mobile={mobile}
        onBack={() => setShowCapture(false)}
        onCapture={handleFaceRegistration}
      />
    );
  }

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40">
        <div className="text-xl font-semibold mb-3">🔐 Setup Face Login</div>
        <div className="text-sm opacity-80 mb-4">
          Would you like to set up face login for faster access next time? This is optional but recommended for convenience.
        </div>
        <div className="grid gap-2 text-sm opacity-70">
          <div className="flex items-start gap-2">
            <div className="mt-1">✓</div>
            <div>Quick login without typing passwords</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="mt-1">✓</div>
            <div>Your face data is stored securely and never shared</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="mt-1">✓</div>
            <div>You can still use email/password anytime</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={onSkip} className="btn-secondary">Skip for now</button>
        <button onClick={() => setShowCapture(true)} className="btn-primary">Setup Face Login</button>
      </div>
    </div>
  );
}
