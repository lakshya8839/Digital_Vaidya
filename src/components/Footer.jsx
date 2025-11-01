import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/40 dark:border-white/10">
      <div className="container-max py-10 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-sky-600" />
          <span className="font-medium">DigitalVaidya – AI Symptom Sketcher</span>
        </div>
        <div className="opacity-80">© 2025 DigitalVaidya | Built by Team HackSkills</div>
      </div>
    </footer>
  );
}


