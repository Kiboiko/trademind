import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer({
  tagline = 'Learn. Trade. Grow.',
  compact = false,
}: {
  tagline?: string;
  compact?: boolean;
}) {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050807]">
      <div
        className={`mx-auto flex max-w-[1240px] flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between ${
          compact ? 'py-6' : ''
        }`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Logo />
          <span className="text-sm text-zinc-500">{tagline}</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-[13px] text-zinc-500">
          <Link to="/about" className="hover:text-zinc-300">
            About
          </Link>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <Link to="/reviews" className="hover:text-zinc-300">
            Support
          </Link>
        </div>
        <div className="flex items-center gap-3 text-zinc-500">
          {['X', 'TG', 'YT', 'IG'].map((s) => (
            <span
              key={s}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[10px]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <p className="px-6 pb-6 text-center text-[11px] text-zinc-600 md:text-right md:max-w-[1240px] md:mx-auto">
        © 2025 TradeMind. All rights reserved.
      </p>
    </footer>
  );
}
