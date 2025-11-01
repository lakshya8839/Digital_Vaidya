import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: 'AI-driven Sketch Analysis', emoji: '🧠', desc: 'Understand body sketches to localize symptoms.' },
  { title: 'Natural Language Symptom Input', emoji: '💬', desc: 'Describe symptoms in plain language.' },
  { title: 'Privacy-first Data Handling', emoji: '🔒', desc: 'Your data stays secure and private.' },
  { title: 'Multi-language Support', emoji: '🌐', desc: 'Inclusive by design for global users.' },
  { title: 'Symptom Severity Estimation', emoji: '📊', desc: 'Get quick guidance and urgency level.' },
];

export default function Features() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Features</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Built for clarity, speed, and trust.</p>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 hover:translate-y-[-2px] transition"
          >
            <div className="text-3xl">{f.emoji}</div>
            <h3 className="mt-3 font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


