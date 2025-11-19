import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import LanguageSelect from './LanguageSelect.jsx';
import LoginOptions from './LoginOptions.jsx';
import EmailLogin from './EmailLogin.jsx';
import AadhaarUpload from './AadhaarUpload.jsx';
import FaceLogin from './FaceLogin.jsx';
import FaceRegister from './FaceRegister.jsx';
import WelcomeScreen from './WelcomeScreen.jsx';

const steps = [
  { key: 'language', label: 'Language' },
  { key: 'method', label: 'Method' },
  { key: 'email', label: 'Email' },
  { key: 'aadhaar', label: 'Aadhaar' },
  { key: 'face', label: 'Face' },
  { key: 'face-register', label: 'Face Register' },
  { key: 'welcome', label: 'Welcome' },
];

export default function LoginContainer({ onComplete }) {
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = React.useState(0); // index in steps
  const [method, setMethod] = React.useState(null); // 'email' | 'aadhaar' | 'face'
  const [language, setLanguage] = React.useState('en');
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [isNewAccount, setIsNewAccount] = React.useState(false);
  const [allowAutoComplete, setAllowAutoComplete] = React.useState(true);
  const [hasFaceRegistered, setHasFaceRegistered] = React.useState(false);
  const [checkingFace, setCheckingFace] = React.useState(true);

  // Check if face is registered on component mount
  React.useEffect(() => {
    const checkFaceRegistration = async () => {
      try {
        // First check localStorage
        const faceRegistered = localStorage.getItem('faceRegistered') === 'true';
        
        if (faceRegistered) {
          // Also verify with backend
          const response = await fetch('/api/face/check-registered');
          const data = await response.json();
          
          if (data.hasRegisteredFaces) {
            setHasFaceRegistered(true);
            // Skip directly to face login
            setMethod('face');
            setStep(4); // Go to face login step
          } else {
            // Clear localStorage if backend says no faces registered
            localStorage.removeItem('faceRegistered');
            localStorage.removeItem('faceRegisteredEmail');
          }
        }
      } catch (error) {
        console.error('Error checking face registration:', error);
      } finally {
        setCheckingFace(false);
      }
    };
    
    checkFaceRegistration();
  }, []);

  React.useEffect(() => {
    if (isAuthenticated && user && onComplete && allowAutoComplete) {
      onComplete();
    }
  }, [isAuthenticated, user, onComplete, allowAutoComplete]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  // Determine which step to show after method selection
  const goToMethod = (m) => {
    setMethod(m);
    if (m === 'email') setStep(2);
    if (m === 'aadhaar') setStep(3);
    if (m === 'face') setStep(4);
  };

  const variants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  };

  const handleEmailDone = (name, email) => {
    setUserName(name || 'User');
    setUserEmail(email || '');
    // Always offer face registration option for all users
    setAllowAutoComplete(false);
    setIsNewAccount(true);
    setStep(5);
  };

  const handleFaceRegisterDone = () => {
    // Re-enable auto-complete after face registration
    setAllowAutoComplete(true);
    setHasFaceRegistered(true);
    setStep(6);
  };
  
  const handleFaceLoginDone = (name) => {
    setUserName(name || 'Returning User');
    setAllowAutoComplete(true);
    setStep(6);
  };

  const handleFaceRegisterSkip = () => {
    // Re-enable auto-complete if user skips
    setAllowAutoComplete(true);
    setStep(6);
  };

  const Stepper = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.slice(0, 6).map((s, i) => (
        <div key={s.key} className={`h-2 rounded-full transition-all ${i <= step ? 'bg-gradient-to-r from-brand-500 to-sky-600 w-10' : 'bg-slate-300 dark:bg-slate-700 w-6'}`} />
      ))}
    </div>
  );

  return (
    <div className="container-max py-12 sm:py-16">
      <div className="max-w-2xl mx-auto glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <img src="/logo.jpg" alt="DigitalVaidya Logo" className="h-10 w-10 rounded-xl object-cover" />
          <h1 className="text-2xl font-bold">DigitalVaidya</h1>
        </div>
        <p className="opacity-80 text-sm mb-4">AI Symptom Sketcher — secure, quick sign-in.</p>

        {!checkingFace && <Stepper />}

        {checkingFace && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mb-2"></div>
              <p className="text-sm opacity-70">Checking face registration...</p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!checkingFace && (
            <>
          {step === 0 && (
            <motion.div key="language" variants={variants} initial="initial" animate="animate" exit="exit">
              <LanguageSelect value={language} onChange={setLanguage} onContinue={next} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="options" variants={variants} initial="initial" animate="animate" exit="exit">
              <LoginOptions onSelect={goToMethod} onBack={back} />
            </motion.div>
          )}
          {step === 2 && method === 'email' && (
            <motion.div key="email" variants={variants} initial="initial" animate="animate" exit="exit">
              <EmailLogin onBack={() => setStep(1)} onDone={handleEmailDone} />
            </motion.div>
          )}
          {step === 3 && method === 'aadhaar' && (
            <motion.div key="aadhaar" variants={variants} initial="initial" animate="animate" exit="exit">
              <AadhaarUpload onBack={() => setStep(1)} onDone={(name) => { setUserName(name || 'Aadhaar User'); setStep(6); }} />
            </motion.div>
          )}
          {step === 4 && method === 'face' && (
            <motion.div key="face" variants={variants} initial="initial" animate="animate" exit="exit">
              <FaceLogin 
                onBack={hasFaceRegistered ? () => { setStep(1); setMethod(null); } : () => setStep(1)} 
                onDone={handleFaceLoginDone} 
              />
            </motion.div>
          )}
          {step === 5 && isNewAccount && (
            <motion.div key="face-register" variants={variants} initial="initial" animate="animate" exit="exit">
              <FaceRegister 
                userName={userName} 
                mobile={userEmail} 
                onBack={() => setStep(2)} 
                onDone={handleFaceRegisterDone} 
                onSkip={handleFaceRegisterSkip} 
              />
            </motion.div>
          )}
          {step === 6 && (
            <motion.div key="welcome" variants={variants} initial="initial" animate="animate" exit="exit">
              <WelcomeScreen name={userName || 'User'} onContinue={onComplete} />
            </motion.div>
          )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


