import { ArrowRight, Check, Crown, Globe, Shield, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import MiniChart from '../components/MiniChart';

const logoRow = ['Google', 'Meta', 'Binance', 'TradingView', 'Apple', 'Stripe', 'HubSpot', 'AWS'];

const partnerCards = [
  {
    name: 'Google Ads',
    desc: 'Reach traders with precision campaigns.',
    points: ['Performance tracking', 'Conversion optimization', 'Audience insights'],
  },
  {
    name: 'Meta Ads',
    desc: 'Social campaigns that scale with your funnel.',
    points: ['Multi-channel ads', 'Retargeting', 'Creative testing'],
  },
  {
    name: 'Binance',
    desc: 'Liquidity and market data integration.',
    points: ['Live BTC/USDT feeds', 'Secure connectivity', 'Global exchange access'],
  },
  {
    name: 'TradingView',
    desc: 'Professional charts and indicators.',
    points: ['Advanced charting', 'Community ideas', 'Alert sync'],
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-6">
        <aside className="hidden w-52 shrink-0 lg:block">
          <nav className="space-y-1 text-sm text-zinc-500">
            {['Dashboard', 'Markets', 'Learn', 'Trade', 'Portfolio', 'AI Assistant', 'Support'].map(
              (item) => (
                <div key={item} className="rounded-lg px-3 py-2 hover:bg-white/5">
                  {item}
                </div>
              ),
            )}
            <div className="rounded-lg bg-tm-green/10 px-3 py-2 font-medium text-tm-green">
              Partners
            </div>
          </nav>
          <div className="card mt-8 p-4 text-sm">
            <p className="font-semibold">Grow together with TradeMind</p>
            <button type="button" className="btn-outline mt-4 w-full py-2 text-xs">
              Learn more
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <section className="grid gap-10 lg:grid-cols-[1fr_240px]">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">
                Trusted Partners. More{' '}
                <span className="text-tm-green">Opportunities.</span>
              </h1>
              <p className="mt-4 max-w-xl text-zinc-400">
                Industry leaders in trading, finance, and technology help us deliver smarter tools
                and exclusive benefits to our community.
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-tm-green" /> Verified partners
                </li>
                <li className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-tm-green" /> Exclusive benefits
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-tm-green" /> More opportunities
                </li>
              </ul>
            </div>
            <div className="card flex flex-col items-center p-6 text-center shadow-glow">
              <Crown className="h-10 w-10 text-tm-green" />
              <p className="mt-4 font-semibold">Partner Program</p>
              <p className="mt-2 text-xs text-zinc-500">Apply to collaborate with TradeMind</p>
              <button type="button" className="btn-primary mt-6 w-full text-sm">
                Become a Partner <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-6">
            <p className="font-semibold">Our Partners</p>
            <span className="flex items-center gap-2 text-xs text-zinc-500">
              <Globe className="h-4 w-4 text-tm-green" /> Trusted by traders worldwide
            </span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-6 opacity-70">
            {logoRow.map((name) => (
              <span key={name} className="text-sm font-semibold text-zinc-400">
                {name}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {partnerCards.map((p) => (
              <article key={p.name} className="card overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <Check className="h-4 w-4 shrink-0 text-tm-green" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="mt-6 text-sm font-semibold text-tm-green hover:underline">
                    Learn more →
                  </button>
                </div>
                <div className="border-t border-tm-border bg-black/40 p-4">
                  {p.name.includes('Binance') || p.name.includes('TradingView') ? (
                    <MiniChart height={100} />
                  ) : (
                    <div className="flex h-[100px] items-end justify-around gap-2 px-4">
                      {[40, 65, 45, 80, 55].map((h, i) => (
                        <div
                          key={i}
                          className="w-8 rounded-t bg-tm-green/40"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/pricing" className="btn-primary">
              Get Started with TradeMind
            </Link>
          </div>
        </main>
      </div>

      <Footer tagline="Smarter tools. Bigger opportunities." />
    </div>
  );
}
