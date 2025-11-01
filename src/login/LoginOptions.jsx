import React from 'react';
import { useAuth } from '../context/AuthContext';

const OptionCard = ({ icon, title, onClick }) => (
  <button onClick={onClick} className="group rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/60 transition shadow-soft hover:shadow-xl text-left">
    <div className="text-3xl mb-3">{icon}</div>
    <div className="font-semibold">{title}</div>
    <div className="mt-1 text-sm opacity-70">Continue</div>
  </button>
);

export default function LoginOptions({ onSelect, onBack }) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      onSelect && onSelect(user.displayName || 'User');
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}
      <button 
        onClick={handleGoogleSignIn} 
        className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-cyan-500 transition-all shadow-soft hover:shadow-xl font-semibold"
        disabled={loading}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
      <div className="grid sm:grid-cols-2 gap-4">
        <OptionCard icon="📧" title="Login / Create Account using Email" onClick={() => onSelect && onSelect('email')} />
        <OptionCard icon="👤" title="Face Login (Existing Users)" onClick={() => onSelect && onSelect('face')} />
      </div>
      <div className="flex justify-end">
        <button onClick={onBack} className="btn-secondary" disabled={loading}>Back</button>
      </div>
    </div>
  );
}


