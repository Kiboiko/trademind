import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

function buildSeries(seed: number, bullish: boolean) {
  return Array.from({ length: 40 }, (_, i) => {
    const wave = Math.sin((i + seed) / 4) * 180;
    const trend = bullish ? i * 18 : -i * 8;
    const noise = ((i * 17 + seed * 31) % 97) - 48;
    return { i, v: 67200 + wave + trend + noise };
  });
}

export default function MiniChart({
  height = 200,
  seed = 0,
  bullish = true,
}: {
  height?: number;
  seed?: number;
  bullish?: boolean;
}) {
  const data = useMemo(() => buildSeries(seed, bullish), [seed, bullish]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`greenGrad-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bullish ? '#00ff88' : '#f87171'} stopOpacity={0.4} />
            <stop offset="100%" stopColor={bullish ? '#00ff88' : '#f87171'} stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis domain={['dataMin', 'dataMax']} hide />
        <Area
          type="monotone"
          dataKey="v"
          stroke={bullish ? '#00ff88' : '#f87171'}
          strokeWidth={2}
          fill={`url(#greenGrad-${seed})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
