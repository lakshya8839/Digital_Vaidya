import React from 'react';

export default function LanguageSelect({ value, onChange, onContinue }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onContinue && onContinue(); }} className="grid gap-4">
      <div>
        <label className="text-sm opacity-80">Select Language</label>
        <select value={value} onChange={(e) => onChange && onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3">
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
  );
}


