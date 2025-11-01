import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function WelcomeScreen({ name = 'User', onContinue }) {
  const { login } = useAuth();

  const proceed = () => {
    login({ name });
    if (onContinue) onContinue();
  };

  return (
    <div className="text-center">
      <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-500 to-sky-600" />
      <h2 className="mt-6 text-3xl font-bold">Welcome to DigitalVaidya</h2>
      <p className="mt-2 text-lg">Welcome {name}!</p>
      <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
        <button onClick={proceed} className="btn-primary">Continue to App</button>
        <Link to="/home#demo" className="btn-secondary">Skip</Link>
      </div>
      <p className="mt-3 text-sm opacity-70">You can update preferences later in settings.</p>
    </div>
  );
}


