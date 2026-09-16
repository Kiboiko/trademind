import {
  ArrowRight,
  BarChart3,
  BookOpen,
  GraduationCap,
  LineChart,
  Play,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrandRow } from '../components/BrandLogos';
import LandingHeader from '../components/LandingHeader';
import { SectionLabel, Wrap } from '../components/ui';

const stats = [
  { value: '500K+', label: 'Active users' },
  { value: '4.8/5', label: 'Average rating' },
  { value: '24/7', label: 'AI support' },
  { value: '100+', label: 'Educational lessons' },
];

const steps = [
  {
    n: '01',
    title: 'Get started',
    desc: 'Create your account and get instant access to the platform.',
    icon: Zap,
  },
  {
    n: '02',
    title: 'Learn & practice',
    desc: 'Explore structured courses, video lessons and practice with a demo account.',
    icon: BookOpen,
  },
  {
    n: '03',
    title: 'Trade with AI',
    desc: 'Use AI insights, real-time signals and personalized recommendations.',
    icon: LineChart,
  },
];

const courses = [
  {
    title: 'Trading Basics',
    desc: 'Learn the fundamentals of trading and market mechanics.',
    level: 'Beginner',
    lessons: 5,
    img: '/design/course-1.png',
  },
  {
    title: 'Technical Analysis',
    desc: 'Master chart patterns, indicators and strategies.',
    level: 'Intermediate',
    lessons: 8,
    img: '/design/course-2.png',
  },
  {
    title: 'Risk Management',
    desc: 'Protect your capital and trade smarter.',
    level: 'All levels',
    lessons: 6,
    img: '/design/course-3.png',
  },
];

const partners = [
  BrandRow.Binance,
  BrandRow.TradingView,
  BrandRow.CoinMarketCap,
  BrandRow.Investing,
  BrandRow.Yahoo,
];

export default function HomePage() {
  const { hash } = useLocation();
  const [video, setVideo] = useState(false);

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="min-h-screen">
      <LandingHeader />

      <section className="relative overflow-hidden">
        <Wrap className="grid items-center gap-8 py-10 lg:grid-cols-[1fr_1.05fr] lg:py-14">
          <div className="relative z-10 max-w-xl">
            <SectionLabel>AI POWERED TRADING & EDUCATION</SectionLabel>
            <h1 className="mt-5 text-[42px] font-extrabold leading-[1.05] tracking-tight md:text-[56px]">
              Learn. Trade.
              <br />
              <span className="text-tm-green">With AI.</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400">
              TradeMind is your personal AI assistant for smarter trading and faster learning. Get
              real-time market insights, personalized education, and step-by-step guidance — all in
              one platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/practice" className="btn-primary px-7">
                Start Free Now
              </Link>
              <button type="button" onClick={() => setVideo(true)} className="btn-outline">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20">
                  <Play className="h-3 w-3 fill-current" />
                </span>
                Watch Video
              </button>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-[11px] leading-snug text-zinc-500">
              <div className="flex items-start gap-2">
                <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-tm-green" />
                Real market data
                <br />& analysis
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-tm-green" />
                Personalized
                <br />
                learning paths
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-tm-green" />
                AI trading assistant
                <br />
                24/7
              </div>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[480px]">
            <img
              src="/design/home-hero.png"
              alt="TradeMind AI assistant and trading app"
              className="relative z-10 mx-auto w-full max-w-[640px] object-contain"
            />
          </div>
        </Wrap>
      </section>

      <section className="border-y border-white/[0.06] bg-[#080c0a]">
        <Wrap className="grid grid-cols-2 divide-y divide-white/[0.06] py-8 sm:divide-y-0 md:grid-cols-4 md:divide-x md:py-10">
          {stats.map((s) => (
            <div key={s.label} className="py-4 text-center md:py-0">
              <p className="text-[28px] font-bold tracking-tight text-tm-green md:text-[32px]">{s.value}</p>
              <p className="mt-1 text-[13px] text-zinc-500">{s.label}</p>
            </div>
          ))}
        </Wrap>
      </section>

      <section id="features" className="scroll-mt-24 py-16 md:py-20">
        <Wrap className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionLabel>SIMPLE STEPS</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-[40px]">
              Your path to
              <br />
              trading success
            </h2>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-zinc-500">
              Whether you&apos;re a beginner or an experienced trader, TradeMind gives you the tools,
              knowledge and support to reach your goals.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map(({ n, title, desc, icon: Icon }, i) => (
              <div key={n} className="relative text-left">
                {i < 2 && (
                  <span className="absolute right-[-18%] top-6 hidden text-zinc-600 sm:block">→</span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-tm-green">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold text-tm-green">{n}</p>
                <h3 className="mt-1 text-[17px] font-semibold">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{desc}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section id="education" className="scroll-mt-24 pb-16 md:pb-20">
        <Wrap className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>EDUCATION</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold md:text-[36px]">Learn at your own pace</h2>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-zinc-500">
              From the basics to advanced strategies — our courses are designed to help you build
              real skills and confidence in the markets.
            </p>
            <Link to="/about" className="btn-primary mt-8">
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {courses.map((c) => (
              <article key={c.title} className="card overflow-hidden">
                <img src={c.img} alt="" className="h-[110px] w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-[15px] font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500">{c.desc}</p>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="rounded-full bg-white/5 px-2 py-0.5">{c.level}</span>
                    <span>{c.lessons} lessons</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="pb-16">
        <Wrap>
          <div className="relative overflow-hidden rounded-[24px] border border-tm-green/20 bg-gradient-to-r from-[#0c1712] via-[#0a1410] to-[#07110e] px-8 py-10 md:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,136,0.08),_transparent_60%)]" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
              <div>
                <h2 className="text-[28px] font-bold leading-tight md:text-[32px]">
                  Smarter tools.
                  <br />
                  Better decisions.
                </h2>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-zinc-400">
                  Join thousands of traders who are already using AI to learn, analyze and trade.
                </p>
              </div>
              <div className="text-center">
                <Link to="/practice" className="btn-primary px-8">
                  Start for Free <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-2 text-[11px] text-zinc-500">No credit card required</p>
              </div>
              <img src="/design/cta-chat.png" alt="" className="mx-auto w-full max-w-[280px]" />
            </div>
          </div>
        </Wrap>
      </section>

      <section className="border-t border-white/[0.05] py-10">
        <p className="text-center text-[12px] text-zinc-500">Trusted by traders worldwide</p>
        <Wrap className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
          {partners.map((Brand, i) => (
            <Brand key={i} />
          ))}
        </Wrap>
      </section>

      {video && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setVideo(false)}
        >
          <div
            className="card w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex aspect-video items-center justify-center bg-black text-zinc-500">
              <Play className="h-14 w-14 text-tm-green" />
            </div>
            <div className="flex justify-end p-4">
              <button type="button" className="btn-ghost" onClick={() => setVideo(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
