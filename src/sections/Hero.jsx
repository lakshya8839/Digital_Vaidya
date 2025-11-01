import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-max pt-14 sm:pt-20 pb-10 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              DigitalVaidya – AI Symptom Sketcher
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-2xl"
            >
              AI-powered symptom sketching for faster, smarter health insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#demo" className="btn-primary">Try the App</a>
              <Link to="/about" className="btn-secondary">Learn More</Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="aspect-[4/3] rounded-xl border border-white/40 dark:border-white/10 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
                <svg viewBox="0 0 300 300" className="w-full h-full max-w-lg text-brand-600/80">
                  <rect x="0" y="0" width="300" height="300" fill="none" />
                  <g fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M150 40c-18 0-32 14-32 32s14 32 32 32 32-14 32-32-14-32-32-32Z" />
                    <path d="M120 108c-18 22-36 66-36 118h132c0-52-18-96-36-118" />
                    <path d="M150 172c-18 0-40 16-40 38v18h80v-18c0-22-22-38-40-38Z" />
                    <path d="M90 150h40M170 150h40" />
                  </g>
                  <g stroke="currentColor" strokeDasharray="4 6" opacity="0.5">
                    <line x1="60" y1="20" x2="60" y2="280" />
                    <line x1="240" y1="20" x2="240" y2="280" />
                    <line x1="20" y1="60" x2="280" y2="60" />
                    <line x1="20" y1="240" x2="280" y2="240" />
                  </g>
                </svg>
              </div>
              <p className="mt-3 text-center text-sm opacity-70">Illustration placeholder: human body with sketch overlay</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


