import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#070b09]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex">
          {landing.map((l) => {
            const active =
              l.label === 'Home'
                ? pathname === '/' && !hash
                : l.to.startsWith('/#')
                  ? pathname === '/' && hash === l.to.slice(1)
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
        <div className="flex items-center gap-4">
          <Link to="/pricing" className="hidden text-[13px] text-zinc-400 hover:text-white sm:inline">
            Log in
          </Link>
          <Link
            to="/pricing"
            className="rounded-full bg-tm-green px-5 py-2 text-[13px] font-semibold text-[#06100c] shadow-[0_0_24px_rgba(0,255,136,0.35)]"
          >
            Get Started
          </Link>
          <button
            type="button"
            className="md:hidden text-zinc-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 px-5 py-4 md:hidden">
          {landing.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-zinc-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
