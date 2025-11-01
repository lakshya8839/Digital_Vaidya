import React from 'react';

export default function DarkModeToggle({ fullWidth = false }) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const persisted = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enableDark = persisted === 'dark' || (!persisted && prefersDark);
    document.documentElement.classList.toggle('dark', enableDark);
    setIsDark(enableDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${fullWidth ? 'w-full justify-center' : ''}`}
    >
      <span className="inline-block h-4 w-4">
        {isDark ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41m0-14.14-1.41 1.41M6.34 17.66 4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        )}
      </span>
      <span className="text-sm">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}


