import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { auth } from '../config/firebase';
import { dbService } from '../services/dbService';
import BodyMapper3D from '../components/BodyMapper3D';

export default function Demo() {
  const [description, setDescription] = React.useState('');
  const [healthParams, setHealthParams] = React.useState({
    temperature: '',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    oxygenLevel: ''
  });
  const [spots, setSpots] = React.useState([]);
  const [result, setResult] = React.useState(null);
  const [listening, setListening] = React.useState(false);
  const [supported, setSupported] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const recognitionRef = React.useRef(null);
  const { user } = useAuth();

  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    let finalTranscript = '';
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      const combined = (description + ' ' + finalTranscript + ' ' + interim).trim();
      setDescription(combined);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (!listening) {
      try {
        rec.start();
        setListening(true);
      } catch {}
    } else {
      rec.stop();
      setListening(false);
    }
  };

  const handleAddSpot = (regionName, clickX, clickY) => {
    const existingSpot = spots.find(s => s.bodyRegion === regionName);
    if (existingSpot) {
      setSpots(spots.filter(s => s.bodyRegion !== regionName));
    } else {
      setSpots([...spots, {
        bodyRegion: regionName,
        clickX: clickX,
        clickY: clickY,
        timestamp: new Date().toISOString()
      }]);
    }
  };

  const analyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = user ? await auth.currentUser?.getIdToken() : null;
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          description,
          healthParams,
          spots: spots.map(s => s.bodyRegion)
        })
      });
      
      const data = await response.json();
      
      if (data.ok && data.result) {
        setResult(data.result);
        
        if (user) {
          await dbService.saveAnalysis(
            user.uid,
            user.email,
            description,
            healthParams,
            data.result,
            spots
          );
        }
      } else {
        setResult({
          condition: 'Unable to analyze',
          urgency: 'Please try again',
        });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setResult({
        condition: 'Error during analysis',
        urgency: 'Please try again',
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadRecord = () => {
    const record = {
      timestamp: new Date().toISOString(),
      patient: user ? { email: user.email, uid: user.uid } : 'Anonymous',
      markedSpots: spots,
      symptoms: description,
      healthParameters: healthParams,
      analysis: result
    };
    
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateAndDownloadSummary = async () => {
    if (!description && spots.length === 0) {
      alert('Please describe your symptoms or mark affected areas before generating a summary.');
      return;
    }

    setLoading(true);
    
    try {
      const token = user ? await auth.currentUser?.getIdToken() : null;
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          description,
          affectedRegions: spots.map(s => s.bodyRegion),
          healthParams
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Check if response is actually a PDF
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/pdf')) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DigitalVaidya-Health-Report-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Health summary PDF report downloaded successfully!');
      } else {
        // Response might be JSON error
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Invalid response format');
      }
    } catch (error) {
      console.error('Summary generation error:', error);
      let errorMessage = 'Error generating summary. ';
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage += 'The backend server may not be running. Please check that the backend is started on http://localhost:8000';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateHealthParam = (key, value) => {
    setHealthParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Live Demo</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Enter your symptoms and health parameters for AI analysis.</p>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-4 sm:p-6"
        >
          <h3 className="font-semibold mb-3">Mark Affected Body Areas</h3>
          <div className="rounded-xl overflow-hidden">
            <BodyMapper3D spots={spots} onAddSpot={handleAddSpot} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-4 sm:p-6"
        >
          <h3 className="font-semibold mb-3">Health Parameters</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs opacity-80">Temperature (°C)</label>
              <input 
                type="number" 
                step="0.1"
                placeholder="37.0"
                value={healthParams.temperature}
                onChange={(e) => updateHealthParam('temperature', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs opacity-80">Heart Rate (bpm)</label>
              <input 
                type="number"
                placeholder="75"
                value={healthParams.heartRate}
                onChange={(e) => updateHealthParam('heartRate', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs opacity-80">BP Systolic</label>
              <input 
                type="number"
                placeholder="120"
                value={healthParams.systolicBP}
                onChange={(e) => updateHealthParam('systolicBP', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
            
            <div>
              <label className="text-xs opacity-80">BP Diastolic</label>
              <input 
                type="number"
                placeholder="80"
                value={healthParams.diastolicBP}
                onChange={(e) => updateHealthParam('diastolicBP', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
            
            <div className="col-span-2">
              <label className="text-xs opacity-80">Oxygen Saturation (%)</label>
              <input 
                type="number"
                placeholder="98"
                value={healthParams.oxygenLevel}
                onChange={(e) => updateHealthParam('oxygenLevel', e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-2 text-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.form
        onSubmit={analyze}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 glass rounded-2xl p-4 sm:p-6"
      >
        <h3 className="font-semibold">Describe Your Symptoms</h3>
        <textarea
          className="mt-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400 min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
          <button type="button" onClick={toggleListening} className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base ${listening ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white'} shadow-lg hover:opacity-95 transition`}>
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-5 sm:w-5">
              <path d="M12 14a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v3a4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M19 11a7 7 0 0 1-14 0m7 7v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="hidden sm:inline">{listening ? 'Listening… Click to stop' : 'Speak Symptoms'}</span>
            <span className="sm:hidden">{listening ? 'Stop' : 'Speak'}</span>
          </button>
          {!supported && <span className="text-xs sm:text-sm opacity-70 text-center sm:text-left">Voice input not supported in this browser.</span>}
          <button type="submit" className="btn-primary flex-1 sm:flex-initial text-sm sm:text-base px-4 py-2 sm:py-3" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
          <button 
            type="button" 
            onClick={generateAndDownloadSummary} 
            className="inline-flex items-center justify-center gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-purple-600 text-white shadow-lg hover:opacity-95 transition"
            disabled={loading}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">{loading ? 'Generating...' : 'Generate Summary Report'}</span>
            <span className="sm:hidden">{loading ? 'Generating...' : 'Generate Report'}</span>
          </button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 glass rounded-2xl p-4 sm:p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Analysis Results</h3>
          {result && (
            <button
              onClick={downloadRecord}
              className="inline-flex items-center gap-2 text-sm btn-secondary"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Record
            </button>
          )}
        </div>
        {result ? (
          <div className="mt-3 space-y-4">
            {spots.length > 0 && result.affectedRegions && (
              <div className="rounded-xl border border-purple-300/40 dark:border-purple-700/40 bg-purple-50/60 dark:bg-purple-900/20 p-4">
                <div className="text-sm opacity-70 mb-2">Affected Body Regions</div>
                <div className="flex flex-wrap gap-2">
                  {result.affectedRegions.map((region, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-sm">
                      ●  {region}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-300/40 dark:border-emerald-700/40 bg-emerald-50/60 dark:bg-emerald-900/20 p-4">
                <div className="text-sm opacity-70">Predicted Condition</div>
                <div className="mt-1 font-semibold">{result.condition}</div>
              </div>
              <div className="rounded-xl border border-amber-300/40 dark:border-amber-700/40 bg-amber-50/60 dark:bg-amber-900/20 p-4">
                <div className="text-sm opacity-70">Urgency Level</div>
                <div className="mt-1 font-semibold">{result.urgency}</div>
              </div>
            </div>
            {result.symptomExplanations && result.symptomExplanations.length > 0 && (
              <div className="rounded-xl border border-blue-300/40 dark:border-blue-700/40 bg-blue-50/60 dark:bg-blue-900/20 p-4">
                <div className="text-sm opacity-70 mb-2">What Your Symptoms May Indicate</div>
                <div className="space-y-1">
                  {result.symptomExplanations.map((explanation, idx) => (
                    <div key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.possibleSolutions && result.possibleSolutions.length > 0 && (
              <div className="rounded-xl border border-green-300/40 dark:border-green-700/40 bg-green-50/60 dark:bg-green-900/20 p-4">
                <div className="text-sm opacity-70 mb-2">Possible Solutions & Recommendations</div>
                <div className="space-y-1">
                  {result.possibleSolutions.map((solution, idx) => (
                    <div key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.relatedSymptoms && result.relatedSymptoms.length > 0 && (
              <div className="rounded-xl border border-yellow-300/40 dark:border-yellow-700/40 bg-yellow-50/60 dark:bg-yellow-900/20 p-4">
                <div className="text-sm opacity-70 mb-2">Related Symptoms to Watch For</div>
                <div className="space-y-1">
                  {result.relatedSymptoms.map((symptom, idx) => (
                    <div key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">⚡</span>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.doctorRecommendation && (
              <div className="rounded-xl border border-rose-300/40 dark:border-rose-700/40 bg-rose-50/60 dark:bg-rose-900/20 p-4">
                <div className="text-sm opacity-70 mb-2 font-semibold">When to See a Doctor</div>
                <div className="space-y-3">
                  {result.doctorRecommendation.urgencyReason && (
                    <div className="text-sm">
                      <span className="font-semibold">Why: </span>
                      {result.doctorRecommendation.urgencyReason}
                    </div>
                  )}
                  {result.doctorRecommendation.shouldSeeDoctorFor && result.doctorRecommendation.shouldSeeDoctorFor.length > 0 && (
                    <div>
                      <div className="text-xs opacity-70 mb-1">You should see a doctor for:</div>
                      <div className="space-y-1">
                        {result.doctorRecommendation.shouldSeeDoctorFor.map((reason, idx) => (
                          <div key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-rose-500 mt-0.5">▸</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {result.doctorRecommendation.redFlags && result.doctorRecommendation.redFlags.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-rose-200 dark:border-rose-800">
                      <div className="text-xs opacity-70 mb-1 font-semibold text-rose-700 dark:text-rose-400">⚠️ Warning Signs:</div>
                      <div className="space-y-1">
                        {result.doctorRecommendation.redFlags.map((flag, idx) => (
                          <div key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-rose-600 mt-0.5">⚠</span>
                            <span className="font-medium">{flag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {result.summary && (
              <div className="rounded-xl border border-slate-300/40 dark:border-slate-700/40 bg-slate-50/60 dark:bg-slate-900/20 p-4">
                <div className="text-sm opacity-70 mb-2">AI Analysis Summary</div>
                <div className="text-sm">{result.summary}</div>
              </div>
            )}
            {result.user && (
              <div className="rounded-xl border border-blue-300/40 dark:border-blue-700/40 bg-blue-50/60 dark:bg-blue-900/20 p-4">
                <div className="text-sm opacity-70">Analyzed for user</div>
                <div className="mt-1 font-semibold">{result.user.email}</div>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm opacity-70">Run an analysis to see results.</p>
        )}
      </motion.div>
    </div>
  );
}
