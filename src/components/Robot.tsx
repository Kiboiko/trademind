export default function Robot({ className = 'w-56 h-56' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} fill="none" aria-hidden>
      <defs>
        <radialGradient id="rbG" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2a3a34" />
          <stop offset="100%" stopColor="#12181a" />
        </radialGradient>
        <filter id="rbGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="100" cy="208" rx="48" ry="8" fill="#00ff88" opacity="0.18" />
      <rect x="78" y="28" width="44" height="18" rx="6" fill="url(#rbG)" stroke="#00ff88" strokeWidth="2" />
      <circle cx="100" cy="22" r="7" fill="#0e1614" stroke="#00ff88" strokeWidth="2" filter="url(#rbGlow)" />
      <circle cx="100" cy="22" r="3" fill="#00ff88" />
      <rect x="42" y="46" width="116" height="108" rx="48" fill="url(#rbG)" stroke="#1e3a2e" strokeWidth="2" />
      <rect x="58" y="70" width="84" height="42" rx="21" fill="#0a1010" />
      <ellipse cx="82" cy="91" rx="16" ry="14" fill="#06100c" />
      <ellipse cx="118" cy="91" rx="16" ry="14" fill="#06100c" />
      <ellipse cx="82" cy="91" rx="8" ry="9" fill="#00ff88" filter="url(#rbGlow)" />
      <ellipse cx="118" cy="91" rx="8" ry="9" fill="#00ff88" filter="url(#rbGlow)" />
      <circle cx="84" cy="88" r="2.5" fill="#e8ffe8" />
      <circle cx="120" cy="88" r="2.5" fill="#e8ffe8" />
      <path d="M86 118c8 10 20 10 28 0" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" />
      <rect x="86" y="154" width="28" height="22" rx="8" fill="url(#rbG)" stroke="#1e3a2e" />
      <rect x="90" y="160" width="20" height="14" rx="4" fill="#00ff88" opacity="0.9" />
      <text x="100" y="171" textAnchor="middle" fill="#06100c" fontSize="8" fontWeight="800">
        TT
      </text>
      <ellipse cx="38" cy="108" rx="12" ry="16" fill="url(#rbG)" stroke="#1e3a2e" />
      <ellipse cx="162" cy="108" rx="12" ry="16" fill="url(#rbG)" stroke="#1e3a2e" />
    </svg>
  );
}
