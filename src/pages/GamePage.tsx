import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Circle,
  Loader2,
  Lock,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MiniChart from '../components/MiniChart';
import Footer from '../components/Footer';
import { TradeSide, useGame } from '../context/GameContext';

const amounts = [50, 100, 250];
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Phase = 'idle' | 'opening' | 'settling' | 'result';

export default function GamePage() {
  const {
    balance,
    xp,
    missionProgress,
    tradesCount,
    hasProfitableTrade,
    history,
    executeTrade,
  } = useGame();

  const [amount, setAmount] = useState(100);
  const [side, setSide] = useState<TradeSide>('buy');
  const [phase, setPhase] = useState<Phase>('idle');
  const [chartSeed, setChartSeed] = useState(0);
  const [chartBullish, setChartBullish] = useState(true);
  const [displayPrice, setDisplayPrice] = useState(67432.18);
  const [balanceFlash, setBalanceFlash] = useState<'up' | 'down' | null>(null);
  const [lastProfit, setLastProfit] = useState<number | null>(null);
  const [chat, setChat] = useState<
    { from: 'ai' | 'system' | 'result'; text: string }[]
  >([
    {
      from: 'ai',
      text: 'Market Analysis — Trend: Bullish · RSI: 62 · Key level: $67,200.',
    },
    {
      from: 'ai',
      text: 'Recommendation: open a LONG (BUY). I expect a breakout above $67,200.',
    },
  ]);

  const pushChat = (from: 'ai' | 'system' | 'result', text: string) => {
    setChat((c) => [...c, { from, text }]);
  };

  const potentialProfit = side === 'buy' ? amount * 0.86 : amount * 0.2;
  const busy = phase !== 'idle';

  const runTrade = async (tradeSide: TradeSide, tradeAmount: number) => {
    if (busy) return;
    if (tradeAmount < 10) {
      pushChat('system', 'Minimum practice size is $10.');
      return;
    }
    if (tradeAmount > balance) {
      pushChat('system', 'Not enough virtual balance for this size. Lower the amount.');
      return;
    }

    setSide(tradeSide);
    setAmount(tradeAmount);
    setLastProfit(null);
    setPhase('opening');
    pushChat(
      'system',
      `Opening ${tradeSide === 'buy' ? 'LONG (BUY)' : 'SHORT (SELL)'} for $${tradeAmount.toFixed(0)}…`,
    );

    await delay(900);
    setPhase('settling');
    setChartSeed((s) => s + 1);
    pushChat('system', 'Position is live — watching BTC/USDT 1m chart…');

    await delay(1100);
    const profit = executeTrade(tradeAmount, tradeSide);
    const won = profit >= 0;

    setLastProfit(profit);
    setChartBullish(won);
    setChartSeed((s) => s + 1);
    setDisplayPrice((p) => p + (won ? 186 : -94));
    setBalanceFlash(won ? 'up' : 'down');
    setPhase('result');

    pushChat(
      'result',
      won
        ? `✓ Profitable trade: +$${profit.toFixed(2)} added to your practice balance.`
        : `✗ Loss: $${profit.toFixed(2)}. AI suggested BUY — try following the signal.`,
    );
    if (won) {
      pushChat('ai', 'Nice work! Mission progress updated. Ready for another trade?');
    } else {
      pushChat('ai', 'Tap “Yes, open Long” to follow my recommendation.');
    }

    await delay(1800);
    setPhase('idle');
    setBalanceFlash(null);
  };

  const followAiLong = () => {
    setSide('buy');
    setAmount(100);
    pushChat('ai', 'Great — executing LONG $100 as recommended.');
    void runTrade('buy', 100);
  };

  useEffect(() => {
    if (balanceFlash === null) return;
    const t = setTimeout(() => setBalanceFlash(null), 1200);
    return () => clearTimeout(t);
  }, [balanceFlash]);

  return (
    <div className="min-h-screen bg-tm-bg">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="hidden w-56 shrink-0 border-r border-tm-border bg-black/30 p-4 lg:block">
          <p className="text-lg font-bold">
            <span className="text-tm-green">T</span> TradeMind
          </p>
          <nav className="mt-8 space-y-1 text-sm">
            {[
              { label: 'Practice', active: true },
              { label: 'Learning' },
              { label: 'Markets' },
              { label: 'Portfolio' },
              { label: 'AI Assistant' },
              { label: 'Achievements' },
            ].map(({ label, active }) => (
              <div
                key={label}
                className={
                  active
                    ? 'rounded-lg bg-tm-green/10 px-3 py-2 text-tm-green'
                    : 'px-3 py-2 text-zinc-500'
                }
              >
                {label}
              </div>
            ))}
          </nav>
          <div className="card mt-auto p-4 text-xs text-zinc-500">
            <Bot className="mb-2 h-8 w-8 text-tm-green" />
            Your AI assistant is always with you
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-tm-border px-4 py-3">
            <div className="text-sm">
              <span className="text-zinc-500">Level 1</span>
              <div className="mt-1 h-2 w-40 overflow-hidden rounded-full bg-tm-border">
                <div
                  className="h-full bg-tm-green transition-all duration-500"
                  style={{ width: `${Math.min(100, (xp / 500) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-zinc-600">{xp} / 500 XP</span>
            </div>
            <span className="rounded-full border border-tm-border px-3 py-1 text-sm">
              Trades: {tradesCount}
            </span>
          </header>

          <main className="flex-1 p-4 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Trading Practice</h1>
                <p className="text-sm text-zinc-500">
                  Choose amount → BUY/SELL → <strong className="text-white">Open Trade</strong>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">Mission 1 / 5</p>
                <p className="text-sm">Make your first profitable trade</p>
                <p
                  className={`mt-2 text-2xl font-bold transition-all duration-300 ${
                    balanceFlash === 'up'
                      ? 'scale-110 text-tm-green'
                      : balanceFlash === 'down'
                        ? 'scale-105 text-red-400'
                        : 'text-tm-green'
                  }`}
                >
                  ${balance.toFixed(2)}
                </p>
                <p className="text-xs text-zinc-500">Practice Account</p>
              </div>
            </div>

            {lastProfit !== null && phase === 'result' && (
              <div
                className={`mt-4 rounded-xl border px-4 py-3 text-center font-semibold ${
                  lastProfit >= 0
                    ? 'border-tm-green/50 bg-tm-green/15 text-tm-green'
                    : 'border-red-500/40 bg-red-500/10 text-red-300'
                }`}
              >
                {lastProfit >= 0 ? '+' : ''}${lastProfit.toFixed(2)}{' '}
                {lastProfit >= 0 ? 'profit' : 'loss'}
              </div>
            )}

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_280px_300px]">
              <div className="card relative p-4">
                {busy && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-[1px]">
                    <div className="flex items-center gap-2 text-sm text-tm-green">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {phase === 'opening' ? 'Opening position…' : 'Closing trade…'}
                    </div>
                  </div>
                )}
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="font-semibold">BTC/USDT · 1m</span>
                  <span className={chartBullish ? 'text-tm-green' : 'text-red-400'}>
                    ${displayPrice.toFixed(2)}
                  </span>
                </div>
                <MiniChart height={220} seed={chartSeed} bullish={chartBullish} />
                <div className="mt-4 rounded-xl border border-tm-green/30 bg-tm-green/5 p-3 text-sm">
                  <p className="font-semibold text-tm-green">AI Agent</p>
                  <p className="mt-1 text-zinc-400">
                    {side === 'buy'
                      ? 'Signal aligned: BUY matches my bullish forecast.'
                      : 'Warning: trend is bullish — SELL is against my signal.'}
                  </p>
                </div>
              </div>

              <div className="card flex flex-col p-6">
                <label className="text-sm text-zinc-500">Amount</label>
                <input
                  type="number"
                  min={10}
                  disabled={busy}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-2 rounded-xl border border-tm-border bg-black/40 px-4 py-3 text-xl font-bold outline-none focus:border-tm-green disabled:opacity-50"
                />
                <div className="mt-3 flex gap-2">
                  {amounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      disabled={busy}
                      onClick={() => setAmount(a)}
                      className={`flex-1 rounded-lg border py-2 text-sm disabled:opacity-50 ${
                        amount === a ? 'border-tm-green bg-tm-green/10' : 'border-tm-border'
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setSide('buy')}
                    className={`rounded-xl py-4 font-bold disabled:opacity-50 ${
                      side === 'buy' ? 'bg-tm-green text-tm-bg' : 'border border-tm-border'
                    }`}
                  >
                    BUY
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setSide('sell')}
                    className={`rounded-xl py-4 font-bold disabled:opacity-50 ${
                      side === 'sell' ? 'bg-red-500 text-white' : 'border border-tm-border'
                    }`}
                  >
                    SELL
                  </button>
                </div>
                <p className="mt-4 text-center text-sm text-zinc-500">Potential profit</p>
                <p
                  className={`text-center text-xl font-bold ${
                    side === 'buy' ? 'text-tm-green' : 'text-zinc-400'
                  }`}
                >
                  + ${potentialProfit.toFixed(2)}
                </p>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void runTrade(side, amount)}
                  className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Processing…
                    </>
                  ) : (
                    <>
                      Open Trade <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
                {missionProgress >= 100 && (
                  <Link
                    to="/pricing"
                    className="btn-outline mt-3 w-full text-center text-sm"
                  >
                    Choose plan & register
                  </Link>
                )}
                <p className="mt-3 text-center text-xs text-zinc-600">
                  Virtual money only · follow AI BUY for best odds
                </p>
              </div>

              <div className="card flex max-h-[520px] flex-col p-4">
                <p className="text-sm font-semibold">
                  AI Assistant <span className="text-tm-green">Online</span>
                </p>
                <div className="mt-4 min-h-[200px] flex-1 space-y-3 overflow-y-auto text-sm">
                  {chat.map((msg, i) => (
                    <div
                      key={i}
                      className={`rounded-lg p-3 ${
                        msg.from === 'result'
                          ? msg.text.startsWith('✓')
                            ? 'border border-tm-green/30 bg-tm-green/10 text-tm-green'
                            : 'border border-red-500/30 bg-red-500/10 text-red-200'
                          : msg.from === 'ai'
                            ? 'bg-tm-green/5 text-zinc-300'
                            : 'bg-black/40 text-zinc-400'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={followAiLong}
                    className="btn-primary flex-1 py-2 text-xs disabled:opacity-50"
                  >
                    Yes, open Long
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => pushChat('ai', 'No problem — watch for the next signal.')}
                    className="btn-outline flex-1 py-2 text-xs disabled:opacity-50"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>

            <div className="card mt-6 p-4">
              <div className="flex items-center justify-between text-sm">
                <span>Current Mission — Make your first profitable trade</span>
                <span className="text-tm-green">+50 XP per win</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-tm-border">
                <div
                  className="h-full bg-tm-green transition-all duration-700"
                  style={{ width: `${missionProgress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500">{missionProgress}% complete</p>
            </div>

            {history.length > 0 && (
              <div className="card mt-4 overflow-x-auto p-4">
                <p className="mb-3 font-semibold">Recent trades</p>
                <table className="w-full min-w-[320px] text-left text-sm">
                  <thead className="text-zinc-500">
                    <tr>
                      <th className="pb-2">Side</th>
                      <th className="pb-2">Size</th>
                      <th className="pb-2">P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 5).map((t) => (
                      <tr key={t.id} className="border-t border-tm-border">
                        <td className="py-2 uppercase">{t.side}</td>
                        <td className="py-2">${t.amount}</td>
                        <td
                          className={`py-2 font-semibold ${
                            t.profit >= 0 ? 'text-tm-green' : 'text-red-400'
                          }`}
                        >
                          {t.profit >= 0 ? '+' : ''}${t.profit.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="card p-4">
                <p className="font-semibold">Your Trading Journey</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-tm-green">
                    <CheckCircle2 className="h-4 w-4" /> Learn the basics
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      hasProfitableTrade ? 'text-tm-green' : ''
                    }`}
                  >
                    {hasProfitableTrade ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4 text-blue-400" />
                    )}{' '}
                    Make your first trade
                  </li>
                  <li className="flex items-center gap-2 text-zinc-600">
                    <Lock className="h-4 w-4" /> Build your strategy
                  </li>
                </ul>
              </div>
              <div className="card p-4">
                <p className="font-semibold">Market Overview</p>
                <p className="mt-2 flex items-center gap-2 text-tm-green">
                  {chartBullish ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}{' '}
                  BTC/USDT ${displayPrice.toFixed(2)}
                </p>
                <MiniChart height={80} seed={chartSeed + 99} bullish={chartBullish} />
              </div>
              <div className="card p-4 text-sm text-zinc-500">
                <p className="font-semibold text-white">Quick Tips</p>
                <ul className="mt-3 list-disc space-y-2 pl-4">
                  <li>Press Open Trade to run the simulation</li>
                  <li>Use “Yes, open Long” to follow the AI</li>
                  <li>After the mission — go to pricing</li>
                </ul>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
