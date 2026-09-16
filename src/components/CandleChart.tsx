type Candle = { o: number; h: number; l: number; c: number };

function makeCandles(): Candle[] {
  const out: Candle[] = [];
  let p = 66100;
  for (let i = 0; i < 42; i += 1) {
    const up = i > 12 && i !== 18 && i !== 24;
    const body = 40 + ((i * 17) % 90);
    const wick = 20 + ((i * 13) % 50);
    const o = p;
    const c = up ? p + body : p - body;
    const h = Math.max(o, c) + wick;
    const l = Math.min(o, c) - wick * 0.6;
    out.push({ o, h, l, c });
    p = c + (up ? 18 : -8);
  }
  return out;
}

const CANDLES = makeCandles();
const PRICE_LEVELS = [65500, 66000, 66500, 67000, 68000];
const TIME_LABELS = ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30'];

export default function CandleChart({
  height = 260,
  highlight = 67432.18,
}: {
  height?: number;
  highlight?: number;
}) {
  const min = Math.min(...CANDLES.map((c) => c.l)) - 40;
  const max = Math.max(...CANDLES.map((c) => c.h)) + 80;
  const w = 640;
  const rightPad = 66;
  const bottomPad = 22;
  const plotW = w - rightPad;
  const plotH = height - bottomPad;
  const pad = 8;
  const cw = (plotW - pad * 2) / CANDLES.length;
  const y = (v: number) => ((max - v) / (max - min)) * (plotH - 16) + 8;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-full w-full" preserveAspectRatio="none">
      {PRICE_LEVELS.map((lv) => (
        <g key={lv}>
          <line x1="0" y1={y(lv)} x2={plotW} y2={y(lv)} stroke="#1e262d" strokeDasharray="3 6" />
          <text x={plotW + 8} y={y(lv) + 3} fontSize="10" fill="#6b7280">
            {lv.toLocaleString()}
          </text>
        </g>
      ))}
      {CANDLES.map((c, i) => {
        const up = c.c >= c.o;
        const color = up ? '#00ff88' : '#ef4444';
        const x = pad + i * cw + cw * 0.5;
        const top = y(Math.max(c.o, c.c));
        const bot = y(Math.min(c.o, c.c));
        return (
          <g key={i}>
            <line x1={x} y1={y(c.h)} x2={x} y2={y(c.l)} stroke={color} strokeWidth="1.4" />
            <rect
              x={x - cw * 0.28}
              y={top}
              width={cw * 0.56}
              height={Math.max(2, bot - top)}
              fill={color}
              rx="1"
            />
          </g>
        );
      })}
      <line
        x1="0"
        y1={y(highlight)}
        x2={plotW}
        y2={y(highlight)}
        stroke="#00ff88"
        strokeDasharray="4 4"
        opacity="0.7"
      />
      <rect x={plotW + 2} y={y(highlight) - 10} width={rightPad - 4} height="20" rx="4" fill="#00ff88" />
      <text
        x={plotW + rightPad / 2}
        y={y(highlight) + 4}
        textAnchor="middle"
        fontSize="9.5"
        fill="#06100c"
        fontWeight="700"
      >
        {highlight.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </text>
      {TIME_LABELS.map((label, i) => (
        <text
          key={label}
          x={pad + (i / (TIME_LABELS.length - 1)) * (plotW - pad * 2)}
          y={height - 4}
          textAnchor="middle"
          fontSize="10"
          fill="#6b7280"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
