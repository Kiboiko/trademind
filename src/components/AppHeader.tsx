import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function AppHeader({ active = '' }: { active?: string }) {
  const { name, avatar } = useAuth();
  const items = [
    { to: '/pricing', label: 'Dashboard' },
    { to: '/partners', label: 'Markets' },
    { to: '/about', label: 'Learn' },
    { to: '/practice', label: 'Trade' },
    { to: '/reviews', label: 'Support' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070b09]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((l) => {
            const isActive = active === l.label;
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`relative text-[13px] ${
                  isActive ? 'font-medium text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-tm-green" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 md:flex"
            aria-label="Notifications"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3">
            {avatar ? (
              <img src={avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </span>
            )}
            <span className="text-[13px]">{name}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-zinc-500">
              <path d="M6 9l6 6 6-6" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
