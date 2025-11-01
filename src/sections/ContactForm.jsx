import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/dbService';

export default function ContactForm() {
  const [values, setValues] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const { user } = useAuth();

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await dbService.saveContactForm(
        user?.uid,
        user?.email,
        values
      );
      
      if (result.success) {
        setSubmitted(true);
        setValues({ name: '', email: '', message: '' });
      } else {
        setError('Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 sm:p-8 max-w-3xl"
    >
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <p className="mt-1 text-sm opacity-80">We respond within 1-2 business days.</p>
      <form onSubmit={onSubmit} className="mt-5 grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-1">
          <label className="text-sm opacity-80">Name</label>
          <input name="name" value={values.name} onChange={onChange} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400" />
        </div>
        <div className="sm:col-span-1">
          <label className="text-sm opacity-80">Email</label>
          <input type="email" name="email" value={values.email} onChange={onChange} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400" />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm opacity-80">Message</label>
          <textarea name="message" rows={5} value={values.message} onChange={onChange} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 outline-none focus:ring-2 focus:ring-brand-400" />
        </div>
        <div className="sm:col-span-2">
          {error && (
            <div className="mb-3 p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Connect with Us'}
            </button>
            {submitted && <span className="text-sm text-emerald-600 dark:text-emerald-400">Thanks! We'll get back to you soon.</span>}
          </div>
        </div>
      </form>
    </motion.div>
  );
}


