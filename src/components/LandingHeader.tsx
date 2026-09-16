import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

const landing = [
  { to: '/', label: 'Home', hash: '' },
  { to: '/#features', label: 'Features' },
  { to: '/#education', label: 'Education' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
];

export default function LandingHeader() {
  const { pathname, hash } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#070b09]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex">
          {landing.map((l) => {
            const active =
              l.label === 'Home'
                ? pathname === '/' && !hash
                : l.to.startsWith('/#')
                  ? hash === l.to.slice(1)
                  : pathname === l.to;
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`relative text-[13px] ${active ? 'font-medium text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-tm-green" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-5">
          <Link to="/pricing" className="hidden text-[13px] text-zinc-400 hover:text-white sm:inline">
            Log in
          </Link>
          <Link
            to="/pricing"
            className="rounded-full bg-tm-green px-5 py-2 text-[13px] font-semibold text-[#06100c] shadow-[0_0_24px_rgba(0,255,136,0.35)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export function AppHeader({ active = 'Dashboard' }: { active?: string }) {
  const items = [
    { to: '/pricing', label: 'Dashboard' },
    { to: '/partners', label: 'Markets' },
    { to: '/about', label: 'Learn' },
    { to: '/practice', label: 'Trade' },
    { to: '/reviews', label: 'Support' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070b09]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3.5">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={`relative text-[13px] ${
                active === l.label ? 'font-medium text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {l.label}
              {active === l.label && (
                <span className="absolute -bottom-2 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-tm-green" />
              )}
            </NavLink>
          ))}
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
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-zinc-500 to-zinc-800 text-xs font-semibold">
              A
            </span>
            <span className="text-[13px]">Alex</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-zinc-500">
              <path d="M6 9l6 6 6-6" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
