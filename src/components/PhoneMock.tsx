export default function PhoneMock({
  className = '',
  showAssistant = true,
}: {
  className?: string;
  showAssistant?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto w-[240px] rounded-[36px] border-[6px] border-[#1a2220] bg-[#0a0e0c] p-3 shadow-[0_30px_80px_rgba(0,255,136,0.12)] ring-1 ring-white/10">
        <div className="mx-auto mb-3 h-4 w-20 rounded-full bg-[#151c1a]" />
        <p className="text-center text-[10px] font-semibold tracking-wide text-zinc-500">BTC/USDT</p>
        <p className="text-center text-xl font-bold text-tm-green">$67,432.18</p>
        <p className="text-center text-[10px] text-tm-green/80">+2.48% (24h)</p>
        <svg viewBox="0 0 200 70" className="my-2 h-16 w-full">
          <path
            d="M0 50 C20 48 30 55 45 40 C60 25 70 30 90 22 C110 14 120 28 140 18 C160 8 175 20 200 10"
            fill="none"
            stroke="#00ff88"
            strokeWidth="2"
          />
          <path
            d="M0 70 L0 50 C20 48 30 55 45 40 C60 25 70 30 90 22 C110 14 120 28 140 18 C160 8 175 20 200 10 V70 Z"
            fill="url(#phg)"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="phg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mb-2 flex justify-center gap-2 text-[9px] text-zinc-500">
          {['1D', '1W', '1M', '3M', '1Y'].map((t, i) => (
            <span key={t} className={i === 0 ? 'text-tm-green' : ''}>
              {t}
            </span>
          ))}
        </div>
        {showAssistant && (
          <div className="rounded-2xl border border-white/10 bg-[#101614] p-2.5">
            <p className="text-[10px] font-semibold text-tm-green">AI Assistant</p>
            <p className="mt-1 text-[9px] leading-snug text-zinc-400">
              The trend is bullish. Consider looking for long opportunities if the price holds above $66,800.
            </p>
            <button
              type="button"
              className="mt-2 w-full rounded-full bg-tm-green py-1.5 text-[10px] font-semibold text-[#06100c]"
            >
              Follow Signal
            </button>
          </div>
        )}
        <div className="mt-3 flex justify-around border-t border-white/5 pt-2 text-[8px] text-zinc-500">
          <span className="text-tm-green">Home</span>
          <span>Markets</span>
          <span>Learn</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}
