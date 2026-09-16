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
  const pad = 8;
  const cw = (w - pad * 2) / CANDLES.length;
  const y = (v: number) => ((max - v) / (max - min)) * (height - 28) + 8;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-full w-full" preserveAspectRatio="none">
      {[66500, 67000, 67432, 68000].map((lv) => (
        <g key={lv}>
          <line x1="0" y1={y(lv)} x2={w} y2={y(lv)} stroke="#1e262d" strokeDasharray="3 6" />
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
        x2={w - 70}
        y2={y(highlight)}
        stroke="#00ff88"
        strokeDasharray="4 4"
        opacity="0.7"
      />
      <rect x={w - 68} y={y(highlight) - 10} width="66" height="20" rx="4" fill="#00ff88" />
      <text x={w - 35} y={y(highlight) + 4} textAnchor="middle" fontSize="10" fill="#06100c" fontWeight="700">
        {highlight.toFixed(2)}
      </text>
    </svg>
  );
}
