import {
  ArrowRight,
  BarChart3,
  BookOpen,
  LineChart,
  Play,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import LandingHeader from '../components/LandingHeader';

const stats = [
  { value: '500K+', label: 'Active users' },
  { value: '4.8/5', label: 'Average rating' },
  { value: '24/7', label: 'AI support' },
  { value: '100+', label: 'Educational lessons' },
];

const steps = [
  { n: '01', title: 'Get started', desc: 'Create your free account in seconds.', icon: Zap },
  { n: '02', title: 'Learn & practice', desc: 'Explore courses and risk-free trading.', icon: BookOpen },
  { n: '03', title: 'Trade with AI', desc: 'Use AI insights for smarter decisions.', icon: LineChart },
];

const courses = [
  { title: 'Trading Basics', level: 'Beginner', lessons: 5 },
  { title: 'Technical Analysis', level: 'Intermediate', lessons: 8 },
  { title: 'Risk Management', level: 'All levels', lessons: 6 },
];

const partners = ['BINANCE', 'TradingView', 'CoinMarketCap', 'Investing.com', 'Yahoo Finance'];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(0,255,136,0.08)_0%,_transparent_50%)]">
      <LandingHeader />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <span className="inline-block rounded-full border border-tm-green/40 bg-tm-green/10 px-4 py-1 text-xs font-semibold tracking-wider text-tm-green">
            AI POWERED TRADING & EDUCATION
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Learn. Trade.{' '}
            <span className="text-tm-green">With AI.</span>
          </h1>
          <p className="mt-6 max-w-lg text-zinc-400">
            TradeMind is your personal assistant for smart trading and real-time market insights.
            Learn at your pace and practice without risk.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/practice" className="btn-primary">
              Start Free Now <ArrowRight className="h-5 w-5" />
            </Link>
            <button type="button" className="btn-outline">
              <Play className="h-4 w-4 fill-current" /> Watch Video
            </button>
          </div>
          <ul className="mt-10 space-y-3 text-sm text-zinc-500">
            <li className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-tm-green" /> Real market data & analysis
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-tm-green" /> Personalized learning paths
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-tm-green" /> AI trading assistant 24/7
            </li>
          </ul>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="card relative w-full max-w-md p-6 shadow-glow">
            <div className="rounded-xl bg-gradient-to-b from-tm-green/20 to-transparent p-4">
              <p className="text-xs text-zinc-400">BTC/USDT</p>
              <p className="text-2xl font-bold text-tm-green">$67,432.18</p>
              <div className="mt-4 h-24 rounded-lg bg-gradient-to-r from-tm-green/30 via-tm-green/10 to-transparent" />
            </div>
            <div className="absolute -right-4 top-8 max-w-[200px] rounded-xl border border-tm-border bg-tm-card p-3 text-xs shadow-lg">
              <p className="font-semibold text-tm-green">AI Assistant</p>
              <p className="mt-1 text-zinc-400">I&apos;m your AI trading assistant. Ask me anything!</p>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-tm-green/15 text-4xl">
                🤖
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-tm-border bg-black/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-white md:text-3xl">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Your path to trading success</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map(({ n, title, desc, icon: Icon }) => (
            <div key={n} className="card p-8 text-center">
              <span className="text-sm font-semibold text-tm-green">{n}</span>
              <Icon className="mx-auto mt-4 h-10 w-10 text-tm-green" />
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold">Learn at your own pace</h2>
            <p className="mt-2 max-w-xl text-zinc-400">
              Structured courses from basics to advanced strategies.
            </p>
          </div>
          <Link to="/about" className="btn-primary text-sm">
            Explore Courses
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {courses.map((c) => (
            <article key={c.title} className="card overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-tm-green/20 to-tm-card" />
              <div className="p-6">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  {c.level} · {c.lessons} lessons
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="card flex flex-col items-center justify-between gap-8 bg-gradient-to-r from-tm-green/10 to-transparent p-10 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Smarter tools. Better decisions.</h2>
            <p className="mt-2 text-zinc-400">Start practicing with AI today — no credit card required.</p>
          </div>
          <div className="text-center">
            <Link to="/practice" className="btn-primary">
              Start for Free
            </Link>
            <p className="mt-2 text-xs text-zinc-500">No credit card required</p>
          </div>
        </div>
      </section>

      <section className="border-t border-tm-border py-12">
        <p className="text-center text-sm text-zinc-500">Trusted by traders worldwide</p>
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-8 px-4 opacity-60">
          {partners.map((p) => (
            <span key={p} className="text-sm font-semibold tracking-widest text-zinc-400">
              {p}
            </span>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
