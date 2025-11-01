import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import DarkModeToggle from './common/DarkModeToggle.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Features', to: '/home#features' },
  { label: 'Demo', to: '/home#demo' },
  { label: 'Tech', to: '/home#tech' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [activeHash, setActiveHash] = React.useState('');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  React.useEffect(() => {
    const sectionIds = ['#features', '#demo', '#tech', '#team', '#contact'];
    const elements = sectionIds
      .map((id) => document.querySelector(id))
      .filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveHash(`#${visible[0].target.id}`);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/50 border-b border-white/50 dark:border-white/10">
      <nav className="container-max flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="DigitalVaidya Logo" className="h-9 w-9 rounded-xl object-cover" />
          <span className="font-semibold text-lg">DigitalVaidya</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => {
                const isSection = item.to.startsWith('/#');
                const isActiveSection = isSection && activeHash && item.to.endsWith(activeHash);
                const highlight = isActiveSection || (isActive && (item.to === '/' || item.to === location.pathname));
                return `px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition ${highlight ? 'bg-slate-100 dark:bg-slate-800' : ''}`;
              }}
            >
              {item.label}
            </NavLink>
          ))}
          <DarkModeToggle />
          {isAuthenticated ? (
            <button onClick={() => { logout(); navigate('/'); }} className="ml-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">Logout</button>
          ) : (
            <Link to="/" className="ml-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">Login</Link>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-current">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/50 dark:border-white/10">
          <div className="container-max py-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                {item.label}
              </Link>
            ))}
            <div className="px-2 py-2">
              <DarkModeToggle fullWidth />
            </div>
            {isAuthenticated ? (
              <button onClick={() => { logout(); navigate('/'); }} className="mx-2 mb-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">Logout</button>
            ) : (
              <Link to="/" className="mx-2 mb-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


