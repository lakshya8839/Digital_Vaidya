import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from && location.state.from.pathname) || '/home';

  const [step, setStep] = React.useState(1);
  const [language, setLanguage] = React.useState('en');
  const [mobile, setMobile] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [aadhaarConsent, setAadhaarConsent] = React.useState(null);
  const [aadhaar, setAadhaar] = React.useState('');
  const [faceConsent, setFaceConsent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [userName, setUserName] = React.useState('');

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(1, s - 1));

  const verifyMobile = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); next(); }, 600);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (!/^\d{4,6}$/.test(otp)) return;
    next();
  };

  const handleAadhaarConsent = (consent) => {
    setAadhaarConsent(consent);
    if (consent) {
      setStep(4);
    } else {
      setStep(6); // skip to face consent
    }
  };

  const verifyAadhaar = (e) => {
    e.preventDefault();
    if (!/^\d{12}$/.test(aadhaar)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock name fetched from Aadhaar
      setUserName('Arjun Kumar');
      next();
    }, 800);
  };

  const handleFaceConsent = (consent) => {
    setFaceConsent(consent);
    if (consent) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        completeLogin();
      }, 900);
    } else {
      completeLogin();
    }
  };

  const completeLogin = () => {
    const name = userName || 'Guest';
    login({ name, mobile, language });
    navigate(from, { replace: true, state: { welcomeName: name } });
  };

  return (
    <div className="container-max py-16 sm:py-24">
      <div className="max-w-lg mx-auto glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="DigitalVaidya Logo" className="h-10 w-10 rounded-xl object-cover" />
          <h1 className="text-2xl font-bold">Welcome to DigitalVaidya</h1>
        </div>
        <p className="mt-2 text-sm opacity-80">Quick, guided sign-in to get you to the symptom sketcher.</p>

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); next(); }} className="mt-6 grid gap-4">
            <div>
              <label className="text-sm opacity-80">Select Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="bn">বাংলা</option>
                <option value="te">తెలుగు</option>
                <option value="mr">मराठी</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button className="btn-primary">Continue</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyMobile} className="mt-6 grid gap-4">
            <div>
              <label className="text-sm opacity-80">Mobile Number</label>
              <input inputMode="numeric" maxLength={10} placeholder="10-digit number" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3" />
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={back} className="btn-secondary">Back</button>
              <button className="btn-primary" disabled={loading}>{loading ? 'Sending OTP…' : 'Send OTP'}</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={verifyOtp} className="mt-6 grid gap-4">
            <div>
              <label className="text-sm opacity-80">Enter OTP</label>
              <input inputMode="numeric" maxLength={6} placeholder="4-6 digit code" value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 tracking-widest" />
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={back} className="btn-secondary">Back</button>
              <button className="btn-primary">Verify</button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white/60 dark:bg-slate-900/50">
              Would you like to quickly fill in your details using Aadhaar?
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => handleAadhaarConsent(false)} className="btn-secondary">Skip</button>
              <button onClick={() => setStep(5)} className="btn-primary">Use Aadhaar</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <form onSubmit={verifyAadhaar} className="mt-6 grid gap-4">
            <div>
              <label className="text-sm opacity-80">Aadhaar Number</label>
              <input inputMode="numeric" maxLength={12} placeholder="12-digit Aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value.replace(/[^0-9]/g, ''))} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3" />
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={back} className="btn-secondary">Back</button>
              <button className="btn-primary" disabled={loading}>{loading ? 'Verifying…' : 'Verify'}</button>
            </div>
          </form>
        )}

        {step === 6 && (
          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 bg-white/60 dark:bg-slate-900/50">
              Would you like to quickly login using face scan?
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => handleFaceConsent(false)} className="btn-secondary">Not now</button>
              <button onClick={() => handleFaceConsent(true)} className="btn-primary" disabled={loading}>{loading ? 'Scanning…' : 'Use Face Scan'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


