function BinanceMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l2.6 2.6L12 7.2 9.4 4.6 12 2zm-6 6l2.6 2.6L6 13.2 3.4 10.6 6 8zm12 0l2.6 2.6L18 13.2l-2.6-2.6L18 8zM12 8.8l2.6 2.6L12 14 9.4 11.4 12 8.8zM6 14.8l2.6 2.6L6 20 3.4 17.4 6 14.8zm12 0l2.6 2.6L18 20l-2.6-2.6L18 14.8zM12 16.8l2.6 2.6L12 22l-2.6-2.6L12 16.8z" />
    </svg>
  );
}

function TradingViewMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M3 18h4V9H3v9zm14-9-5 5v4h9v-9h-4z" fill="currentColor" />
      <circle cx="17.5" cy="8" r="2.5" fill="currentColor" />
    </svg>
  );
}

function CoinMarketCapMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="9.5" />
      <path
        d="M7 14.2V9.8c0-.7.8-1 1.3-.5L11 12l2.7-2.7c.5-.5 1.3-.2 1.3.5v4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h11.8c-.5 2.7-2.1 5-4.4 6.6v5.4h7.1c4.2-3.8 6.6-9.5 6.6-16.5z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.4c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.6C8.1 41 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.4c-.4-1.3-.7-2.7-.7-4.1s.2-2.8.7-4.1v-5.6H4.5C3 17.5 2.2 20.7 2.2 24s.8 6.5 2.3 9.3z" />
      <path fill="#EA4335" d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.3 29.9 2 24 2 15.4 2 8.1 7 4.5 14.7l7.3 5.6c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

function MetaMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden>
      <path
        d="M6.7 2C3.4 2 1 6.3 1 11.4 1 16.1 3.1 19 5.9 19c2 0 3.4-1 6-4.7 0 0 1.4-2 2.4-3.5l1.7-2.6c2-3 3.7-4.4 5.5-4.4 3 0 5.4 2.7 5.4 7.8 0 5.5-2.5 7.7-5.3 7.7-1.5 0-2.9-.7-4.4-2.1"
        fill="none"
        stroke="url(#meta-grad)"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="meta-grad" x1="0" y1="0" x2="40" y2="0">
          <stop offset="0" stopColor="#0064E1" />
          <stop offset="0.5" stopColor="#0082FB" />
          <stop offset="1" stopColor="#00B2FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AppleMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 1.5c.1 1.2-.4 2.4-1.1 3.3-.7.9-1.9 1.6-3 1.5-.1-1.2.4-2.5 1.1-3.3.8-.9 2-1.5 3-1.5zM20.8 17c-.6 1.3-.9 1.9-1.6 3-1 1.5-2.5 3.4-4.3 3.4-1.6 0-2-1-4.1-1s-2.6 1-4.2 1.1c-1.7.1-3-1.6-4-3.1-2.8-4.1-3.1-9-1.4-11.5 1.2-1.8 3.2-2.9 5-2.9 1.9 0 3.1 1.1 4.6 1.1 1.5 0 2.4-1.1 4.6-1.1 1.6 0 3.3.9 4.5 2.4-4 2.2-3.3 7.9.9 8.6z" />
    </svg>
  );
}

function StripeMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.5 8.1c0-.9-.7-1.2-1.9-1.2-1.5 0-3.3.5-4.7 1.2V4.6C8.4 3.9 10.1 3.5 11.9 3.5c3.9 0 6.5 1.9 6.5 5.2 0 5-6.7 4.2-6.7 6.3 0 1 .9 1.3 2.2 1.3 1.6 0 3.6-.6 5.2-1.5v3.5c-1.7.7-3.4 1-5.2 1-4 0-6.8-2-6.8-5.3 0-5.4 6.4-4.4 6.4-6.9z" />
    </svg>
  );
}

function HubSpotMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="17" cy="16.5" r="3.2" />
      <path d="M17 13.3V8.5M17 8.5a2.6 2.6 0 1 0-2.6-2.6" strokeLinecap="round" />
      <circle cx="14.4" cy="5.9" r="1.6" fill="currentColor" stroke="none" />
      <path d="M9.8 10.6 6 13" strokeLinecap="round" />
      <circle cx="5.2" cy="14" r="2.6" />
    </svg>
  );
}

function AwsMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 16.5c5 3 13 3 18 0" strokeLinecap="round" />
      <path d="M17.5 16.2l2.2.4-.3 2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const BrandRow = {
  Binance: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-2 text-amber-400 ${className}`}>
      <BinanceMark className="h-4 w-4" />
      <span className="text-[15px] font-bold tracking-[0.14em]">BINANCE</span>
    </span>
  ),
  TradingView: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <TradingViewMark className="h-4 w-4" />
      <span className="text-[15px] font-semibold">TradingView</span>
    </span>
  ),
  CoinMarketCap: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <CoinMarketCapMark className="h-4 w-4" />
      <span className="text-[15px] font-medium">CoinMarketCap</span>
    </span>
  ),
  Investing: ({ className = '' }: { className?: string }) => (
    <span className={`text-[15px] text-zinc-300 ${className}`}>
      <span className="font-bold">Investing</span>
      <span className="font-normal text-zinc-400">.com</span>
    </span>
  ),
  Yahoo: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex flex-col leading-[0.95] text-zinc-300 ${className}`}>
      <span className="text-[16px] font-extrabold">yahoo!</span>
      <span className="text-[11px] font-medium text-zinc-400">finance</span>
    </span>
  ),
  Google: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <GoogleMark className="h-4 w-4" />
      <span className="text-[15px] font-medium">Google</span>
    </span>
  ),
  Meta: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <MetaMark className="h-3.5 w-5" />
      <span className="text-[15px] font-medium">Meta</span>
    </span>
  ),
  Apple: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <AppleMark className="h-4 w-4" />
      <span className="text-[15px] font-medium">Apple</span>
    </span>
  ),
  Stripe: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <StripeMark className="h-4 w-4" />
      <span className="text-[15px] font-semibold">Stripe</span>
    </span>
  ),
  HubSpot: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <HubSpotMark className="h-4 w-4" />
      <span className="text-[15px] font-semibold">HubSpot</span>
    </span>
  ),
  Aws: ({ className = '' }: { className?: string }) => (
    <span className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <AwsMark className="h-4 w-4" />
      <span className="text-[15px] font-semibold">aws</span>
    </span>
  ),
};

export { BinanceMark, TradingViewMark, CoinMarketCapMark, GoogleMark, MetaMark, AppleMark, StripeMark, HubSpotMark, AwsMark };
