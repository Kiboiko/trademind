import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  ChevronDown,
  CheckCircle2,
  Circle,
  Gamepad2,
  Gift,
  Lightbulb,
  Loader2,
  Lock,
  Send,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  BookOpen,
  Maximize2,
} from 'lucide-react';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CandleChart from '../components/CandleChart';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import MiniChart from '../components/MiniChart';
import { useAuth } from '../context/AuthContext';
import { TradeSide, useGame } from '../context/GameContext';

const amounts = [50, 100, 250];
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const money = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const nav = [
  { label: 'Practice', icon: Gamepad2, active: true },
  { label: 'Learning', icon: BookOpen },
  { label: 'Markets', icon: BarChart3 },
  { label: 'Portfolio', icon: Briefcase },
  { label: 'AI Assistant', icon: Bot },
  { label: 'Achievements', icon: Trophy },
];

const tips = [
  {
    title: 'Follow the trend',
    text: 'Trade in the direction of the main trend for higher success rates.',
  },
  {
    title: 'Use proper risk management',
    text: 'Never risk more than 1-2% per trade.',
  },
  {
    title: 'Be patient',
    text: 'Wait for the right setup. Not every move is a good trade.',
  },
];

type Phase = 'idle' | 'opening' | 'settling' | 'result';

export default function GamePage() {
  const { name } = useAuth();
  const {
    balance,
    xp,
    missionProgress,
    hasProfitableTrade,
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
  const [assistantNote, setAssistantNote] = useState(
    'Looks good! The market is trending up. If you open a Long position now, you could catch another move higher.',
  );
  const [extraMessages, setExtraMessages] = useState<{ from: 'system' | 'result'; text: string }[]>([]);
  const [question, setQuestion] = useState('');

  const potentialProfit = side === 'buy' ? amount * 0.86 : amount * 0.2;
  const potentialPercent = amount > 0 ? Math.round((potentialProfit / amount) * 100) : 0;
  const busy = phase !== 'idle';

  const runTrade = async (tradeSide: TradeSide, tradeAmount: number) => {
    if (busy) return;
    if (tradeAmount < 10) {
      setExtraMessages((m) => [...m, { from: 'system', text: 'Minimum practice size is $10.' }]);
      return;
    }
    if (tradeAmount > balance) {
      setExtraMessages((m) => [
        ...m,
        { from: 'system', text: 'Not enough virtual balance for this size. Lower the amount.' },
      ]);
      return;
    }

    setSide(tradeSide);
    setAmount(tradeAmount);
    setLastProfit(null);
    setPhase('opening');

    await delay(900);
    setPhase('settling');
    setChartSeed((s) => s + 1);

    await delay(1100);
    const profit = executeTrade(tradeAmount, tradeSide);
    const won = profit >= 0;

    setLastProfit(profit);
    setChartBullish(won);
    setChartSeed((s) => s + 1);
    setDisplayPrice((p) => p + (won ? 186 : -94));
    setBalanceFlash(won ? 'up' : 'down');
    setPhase('result');

    setAssistantNote(
      won
        ? `Nice entry — that Long added +$${profit.toFixed(2)} to your practice balance. Ready for the next signal?`
        : `That one went against us. AI signal is still BUY — try following it on the next trade.`,
    );
    setExtraMessages((m) => [
      ...m,
      {
        from: 'result',
        text: won
          ? `✓ Profitable trade: +$${profit.toFixed(2)} added to your practice balance.`
          : `✗ Loss: $${Math.abs(profit).toFixed(2)}. AI suggested BUY — try following the signal.`,
      },
    ]);

    await delay(1800);
    setPhase('idle');
    setBalanceFlash(null);
  };

  const followAiLong = () => {
    setSide('buy');
    setAmount(100);
    void runTrade('buy', 100);
  };

  const askQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setExtraMessages((m) => [...m, { from: 'system', text: question.trim() }]);
    setQuestion('');
    window.setTimeout(() => {
      setExtraMessages((m) => [
        ...m,
        { from: 'result', text: 'Stick to the plan: follow the trend and size positions sensibly.' },
      ]);
    }, 600);
  };

  useEffect(() => {
    if (balanceFlash === null) return;
    const t = setTimeout(() => setBalanceFlash(null), 1200);
    return () => clearTimeout(t);
  }, [balanceFlash]);

  const missionDone = hasProfitableTrade ? 1 : 0;

  return (
    <div className="min-h-screen bg-tm-bg">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-tm-border bg-tm-bg/90 px-5 py-3 backdrop-blur-xl">
        <Logo />
        <div className="hidden text-center sm:block">
          <span className="text-[11px] text-zinc-500">Level 1</span>
          <div className="mt-1 h-1.5 w-40 overflow-hidden rounded-full bg-tm-border">
            <div
              className="h-full bg-tm-green transition-all duration-500"
              style={{ width: `${Math.min(100, (xp / 500) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-600">{xp} / 500 XP</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-zinc-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </span>
          <span className="text-[13px]">{name}</span>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
        </button>
      </header>

      <div className="flex min-h-[calc(100vh-57px)] flex-col lg:flex-row">
        <aside className="hidden w-[200px] shrink-0 border-r border-tm-border p-4 lg:flex lg:flex-col">
          <nav className="space-y-1 text-sm">
            {nav.map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className={
                  active
                    ? 'flex items-center gap-2.5 rounded-lg bg-tm-green/15 px-3 py-2 font-medium text-tm-green'
                    : 'flex items-center gap-2.5 rounded-lg px-3 py-2 text-zinc-500'
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </div>
            ))}
          </nav>
          <div className="card mt-8 p-4 text-center">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-tm-green/15 text-tm-green">
              <Bot className="h-5 w-5" />
            </span>
            <p className="mt-3 text-[13px] font-semibold">Your AI assistant is always with you</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500">
              Get real-time guidance, market insights and personalized tips.
            </p>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <main className="flex-1 p-4 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Trading Practice</h1>
                <p className="mt-1 text-sm text-zinc-500">
                  Learn by doing. Follow the AI assistant, analyze the market
                  <br className="hidden md:block" /> and make your first trades — risk free!
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="card flex items-center gap-3 px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tm-green/15 text-tm-green">
                    <Target className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[11px] text-zinc-500">Mission 1 / 5</p>
                    <p className="text-[13px] font-medium">Make your first profitable trade</p>
                    <div className="mt-1.5 h-1.5 w-40 overflow-hidden rounded-full bg-tm-border">
                      <div
                        className="h-full bg-tm-green transition-all duration-700"
                        style={{ width: `${missionProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="card flex items-center gap-3 px-4 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-tm-green/40 text-[12px] font-bold text-tm-green">
                    2
                  </span>
                  <div>
                    <p className="text-[11px] text-zinc-500">Practice Account</p>
                    <p
                      className={`text-[17px] font-bold transition-all duration-300 ${
                        balanceFlash === 'up'
                          ? 'scale-110 text-tm-green'
                          : balanceFlash === 'down'
                            ? 'text-red-400'
                            : 'text-tm-green'
                      }`}
                    >
                      ${money(balance)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_280px_300px]">
              <div className="card relative overflow-hidden p-4">
                {busy && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-[1px]">
                    <div className="flex items-center gap-2 text-sm text-tm-green">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {phase === 'opening' ? 'Opening position…' : 'Closing trade…'}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-black">
                        ₿
                      </span>
                      BTC/USDT
                      <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                    </span>
                    <span className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[12px] text-zinc-400">
                      1m <ChevronDown className="h-3 w-3" />
                    </span>
                    <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-600" />
                    <BarChart3 className="h-3.5 w-3.5 text-zinc-600" />
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-tm-green" /> Live market
                    </span>
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="relative mt-3 h-[300px]">
                  <div className="absolute left-0 top-0 z-10 w-[230px] rounded-xl border border-tm-green/30 bg-[#070c0a]/95 p-3 text-[12px] shadow-lg backdrop-blur">
                    <p className="flex items-center gap-1.5 font-semibold text-tm-green">
                      <Sparkles className="h-3.5 w-3.5" /> AI Agent
                    </p>
                    <p className="mt-1.5 leading-relaxed text-zinc-300">
                      The market is showing a bullish momentum. The price is forming higher highs and
                      higher lows.
                    </p>
                    <p className="mt-1.5 font-medium text-tm-green">
                      Consider opening a LONG position if the price breaks above $67,200. ↗
                    </p>
                  </div>
                  <CandleChart height={300} highlight={displayPrice} />
                </div>
              </div>

              <div className="card flex flex-col p-5">
                <label className="text-[12px] text-zinc-500">Amount</label>
                <input
                  type="number"
                  min={10}
                  disabled={busy}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-1.5 rounded-xl border border-tm-border bg-black/40 px-4 py-2.5 text-lg font-bold outline-none focus:border-tm-green disabled:opacity-50"
                />
                <div className="mt-2.5 flex gap-2">
                  {amounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      disabled={busy}
                      onClick={() => setAmount(a)}
                      className={`flex-1 rounded-lg border py-1.5 text-[13px] disabled:opacity-50 ${
                        amount === a ? 'border-tm-green bg-tm-green/10 text-tm-green' : 'border-tm-border text-zinc-400'
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>

                <p className="mt-5 text-[12px] text-zinc-500">Trade direction</p>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setSide('buy')}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-3 text-[13px] font-bold disabled:opacity-50 ${
                      side === 'buy' ? 'bg-tm-green text-tm-bg' : 'border border-tm-border text-zinc-300'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" /> BUY
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setSide('sell')}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-3 text-[13px] font-bold disabled:opacity-50 ${
                      side === 'sell' ? 'bg-red-500 text-white' : 'border border-tm-border text-zinc-300'
                    }`}
                  >
                    <TrendingDown className="h-4 w-4" /> SELL
                  </button>
                </div>

                <p className="mt-5 text-[12px] text-zinc-500">Potential profit</p>
                <p
                  className={`text-[20px] font-bold ${side === 'buy' ? 'text-tm-green' : 'text-zinc-300'}`}
                >
                  + ${potentialProfit.toFixed(2)}{' '}
                  <span className="text-[13px] font-semibold">(+{potentialPercent}%)</span>
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
                <p className="mt-3 text-center text-[11px] text-zinc-600">
                  Virtual money only · follow AI BUY for best odds
                </p>
                {missionProgress >= 100 && (
                  <Link to="/pricing" className="btn-outline mt-3 w-full text-center text-sm">
                    Choose plan &amp; register
                  </Link>
                )}
              </div>

              <div className="card flex max-h-[560px] flex-col p-4">
                <p className="flex items-center gap-2 text-[14px] font-semibold">
                  <Sparkles className="h-4 w-4 text-tm-green" /> AI Assistant
                  <span className="ml-auto flex items-center gap-1.5 text-[11px] font-normal text-tm-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-tm-green" /> Online
                  </span>
                </p>

                <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1 text-[13px]">
                  <ChatBubble>{assistantNote}</ChatBubble>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-200">
                      <BarChart3 className="h-3.5 w-3.5 text-tm-green" /> Market Analysis
                    </p>
                    <div className="mt-2 space-y-1.5 text-[12px] text-zinc-400">
                      <div className="flex items-center justify-between">
                        <span>Trend</span>
                        <span className={`flex items-center gap-1 ${chartBullish ? 'text-tm-green' : 'text-red-400'}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {chartBullish ? 'Bullish' : 'Bearish'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>RSI</span>
                        <span className="text-zinc-300">62 (Neutral)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Key level</span>
                        <span className="text-zinc-300">$67,200</span>
                      </div>
                    </div>
                  </div>

                  <ChatBubble>Should we open a trade?</ChatBubble>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={followAiLong}
                      className="flex-1 rounded-full border border-tm-green/50 py-2 text-[12px] font-semibold text-tm-green disabled:opacity-50"
                    >
                      Yes, open Long
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        setExtraMessages((m) => [
                          ...m,
                          { from: 'system', text: 'No problem — watch for the next signal.' },
                        ])
                      }
                      className="flex-1 rounded-full border border-white/15 py-2 text-[12px] text-zinc-300 disabled:opacity-50"
                    >
                      Not now
                    </button>
                  </div>

                  {extraMessages.map((msg, i) =>
                    msg.from === 'result' ? (
                      <div
                        key={i}
                        className={`rounded-lg p-2.5 text-[12px] ${
                          msg.text.startsWith('✓')
                            ? 'border border-tm-green/30 bg-tm-green/10 text-tm-green'
                            : 'border border-red-500/30 bg-red-500/10 text-red-200'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ) : (
                      <p key={i} className="rounded-lg bg-white/[0.04] p-2.5 text-[12px] text-zinc-300">
                        {msg.text}
                      </p>
                    ),
                  )}
                </div>

                <form onSubmit={askQuestion} className="mt-3 flex items-center gap-2">
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask me anything…"
                    className="field mt-0 flex-1 py-2 text-[12px]"
                  />
                  <button
                    type="submit"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tm-green text-[#06100c]"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            {lastProfit !== null && phase === 'result' && (
              <div
                className={`mt-5 rounded-xl border px-4 py-3 text-center font-semibold ${
                  lastProfit >= 0
                    ? 'border-tm-green/50 bg-tm-green/15 text-tm-green'
                    : 'border-red-500/40 bg-red-500/10 text-red-300'
                }`}
              >
                {lastProfit >= 0 ? '+' : ''}${lastProfit.toFixed(2)} {lastProfit >= 0 ? 'profit' : 'loss'}
              </div>
            )}

            <div className="card mt-5 flex flex-wrap items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
                  <Trophy className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-tm-green">Current Mission</p>
                  <p className="text-[13px]">Make your first profitable trade</p>
                </div>
              </div>
              <div className="min-w-[200px] flex-1">
                <div className="h-1.5 overflow-hidden rounded-full bg-tm-border">
                  <div
                    className="h-full bg-tm-green transition-all duration-700"
                    style={{ width: `${missionProgress}%` }}
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>{missionDone}/1</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-300">
                  <Gift className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] text-zinc-500">Reward</p>
                  <p className="text-[13px] font-semibold text-tm-green">+50 XP</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div className="card p-5">
                <p className="font-semibold">Your Trading Journey</p>
                <ul className="relative mt-4 space-y-5">
                  <JourneyStep n={1} done title="Learn the basics" status="Completed" statusIcon={<CheckCircle2 className="h-3 w-3" />}>
                    Understand how the market works and how to read charts.
                  </JourneyStep>
                  <JourneyStep
                    n={2}
                    active={!hasProfitableTrade}
                    done={hasProfitableTrade}
                    title="Make your first trade"
                    status={hasProfitableTrade ? 'Completed' : 'In progress'}
                    statusIcon={
                      hasProfitableTrade ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />
                    }
                  >
                    Follow the AI assistant and open your first position.
                  </JourneyStep>
                  <JourneyStep n={3} title="Build your strategy" status="Locked" statusIcon={<Lock className="h-3 w-3" />} last>
                    Practice, improve and unlock advanced tools.
                  </JourneyStep>
                </ul>
              </div>

              <div className="card p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Market Overview</p>
                  <span className="flex items-center gap-1.5 text-[11px] text-tm-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-tm-green" /> Live
                  </span>
                </div>
                <div className="mt-3 flex gap-2 text-[12px]">
                  <span className="rounded-full bg-tm-green px-3 py-1 font-semibold text-tm-bg">BTC/USDT</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-zinc-400">ETH/USDT</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-zinc-400">SOL/USDT</span>
                </div>
                <p className="mt-4 text-2xl font-bold">${money(displayPrice)}</p>
                <p className="flex items-center gap-1 text-[12px] text-tm-green">
                  <TrendingUp className="h-3.5 w-3.5" /> +2.45% (24h)
                </p>
                <MiniChart height={110} seed={chartSeed} bullish={chartBullish} />
                <div className="mt-2 flex gap-1.5 text-[11px]">
                  {['1D', '1W', '1M', '3M', '1Y'].map((t, i) => (
                    <span
                      key={t}
                      className={`rounded-full px-2.5 py-1 ${
                        i === 0 ? 'bg-tm-green font-semibold text-tm-bg' : 'border border-white/10 text-zinc-400'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card p-5 text-[13px] text-zinc-400">
                <p className="flex items-center gap-2 font-semibold text-white">
                  <Lightbulb className="h-4 w-4 text-amber-400" /> Quick Tips
                </p>
                <ol className="mt-4 space-y-3">
                  {tips.map((tip, i) => (
                    <li key={tip.title} className="flex gap-2.5">
                      <span className="shrink-0 font-semibold text-zinc-500">{i + 1}.</span>
                      <span>
                        <span className="block font-semibold text-white">{tip.title}</span>
                        {tip.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ children }: { children: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tm-green/15 text-tm-green">
        <Bot className="h-3.5 w-3.5" />
      </span>
      <p className="rounded-xl rounded-tl-sm bg-white/[0.04] px-3 py-2 leading-relaxed text-zinc-300">{children}</p>
    </div>
  );
}

function JourneyStep({
  n,
  title,
  status,
  statusIcon,
  children,
  done,
  active,
  last,
}: {
  n: number;
  title: string;
  status: string;
  statusIcon: ReactNode;
  children: string;
  done?: boolean;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <li className="relative flex gap-3 pl-0">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
            done
              ? 'bg-tm-green text-tm-bg'
              : active
                ? 'border-2 border-tm-green text-tm-green'
                : 'bg-white/10 text-zinc-500'
          }`}
        >
          {n}
        </span>
        {!last && <span className="mt-1 h-full w-px flex-1 bg-white/10" />}
      </div>
      <div className="flex-1 pb-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13px] font-semibold">{title}</p>
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] ${
              done
                ? 'bg-tm-green/15 text-tm-green'
                : active
                  ? 'border border-blue-400/40 text-blue-300'
                  : 'bg-white/5 text-zinc-500'
            }`}
          >
            {statusIcon} {status}
          </span>
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-zinc-500">{children}</p>
      </div>
    </li>
  );
}
