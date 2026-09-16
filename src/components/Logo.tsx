import { Link } from 'react-router-dom';

export default function Logo({
  className = '',
  to = '/',
}: {
  className?: string;
  to?: string;
}) {
  return (
    <Link to={to} className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1a2a22] to-[#0d1512] ring-1 ring-tm-green/40">
        <span className="absolute text-[15px] font-black tracking-tighter text-tm-green" style={{ transform: 'translate(-3px, 0)' }}>
          T
        </span>
        <span className="absolute text-[15px] font-black tracking-tighter text-tm-green/80" style={{ transform: 'translate(4px, 1px)' }}>
          T
        </span>
      </span>
      <span className="text-[17px] font-semibold tracking-tight">TradeMind</span>
    </Link>
  );
}
