import React from 'react';

const faqs = [
  {
    q: 'Is DigitalVaidya a medical device?',
    a: 'No. It provides AI-generated guidance and is not a substitute for professional medical advice.',
  },
  {
    q: 'How is my data handled?',
    a: 'We follow a privacy-first approach. Sketches and descriptions can be processed locally for demos.',
  },
  {
    q: 'Which languages are supported?',
    a: 'The interface is English-first, with planned multi-language expansion.',
  },
];

export default function FAQ() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700/50 rounded-2xl border border-white/40 dark:border-white/10 overflow-hidden">
        {faqs.map((f) => (
          <details key={f.q} className="group bg-white/50 dark:bg-slate-900/40 p-5">
            <summary className="cursor-pointer font-medium flex items-center justify-between">
              {f.q}
              <span className="ml-4 text-slate-500 group-open:rotate-180 transition">▾</span>
            </summary>
            <p className="mt-2 text-sm opacity-80">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}


