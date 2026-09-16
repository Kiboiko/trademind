import {
  BarChart3,
  BookOpen,
  Bot,
  Crown,
  Handshake,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  Star,
  Shield,
  Wallet,
  Zap,
} from 'lucide-react';
import { ReactNode } from 'react';
import AppHeader from '../components/AppHeader';
import { BinanceMark, BrandRow, GoogleMark, MetaMark, TradingViewMark } from '../components/BrandLogos';
import Footer from '../components/Footer';
import MiniChart from '../components/MiniChart';
import { CheckItem, SectionLabel } from '../components/ui';

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: BarChart3, label: 'Markets' },
  { icon: BookOpen, label: 'Learn' },
  { icon: LineChart, label: 'Trade' },
  { icon: Wallet, label: 'Portfolio' },
  { icon: Bot, label: 'AI Assistant' },
  { icon: HelpCircle, label: 'Support' },
  { icon: Handshake, label: 'Partners', active: true },
];

const logos = [
  BrandRow.Google,
  BrandRow.Meta,
  BrandRow.Binance,
  BrandRow.TradingView,
  BrandRow.Apple,
  BrandRow.Stripe,
  BrandRow.HubSpot,
  BrandRow.Aws,
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <AppHeader active="Dashboard" />

      <div className="mx-auto flex max-w-[1280px] gap-6 px-4 py-6 md:px-6">
        <aside className="hidden w-[200px] shrink-0 lg:block">
          <nav className="space-y-1 text-[13px]">
            {nav.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${
                  active ? 'bg-tm-green/15 font-medium text-tm-green' : 'text-zinc-500'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </div>
            ))}
          </nav>
          <div className="card mt-8 overflow-hidden p-4 text-center">
            <p className="text-[13px] font-semibold">Grow together with TradeMind</p>
            <p className="mt-2 text-[11px] text-zinc-500">
              Our partners help us build a better trading future.
            </p>
            <img src="/design/partners-hands.png" alt="" className="my-3 rounded-lg" />
            <button type="button" className="btn-ghost w-full py-2 text-[12px] text-tm-green">
              Learn more →
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <section className="grid gap-5 lg:grid-cols-[1fr_240px]">
            <div className="card relative overflow-hidden p-8">
              <img
                src="/design/partners-hands.png"
                alt=""
                className="pointer-events-none absolute right-0 top-0 hidden h-full w-[48%] object-cover object-left opacity-90 lg:block"
              />
              <div className="relative max-w-[340px]">
                <SectionLabel>PARTNERS</SectionLabel>
                <h1 className="mt-4 text-[34px] font-bold leading-tight md:text-[40px]">
                  Trusted Partners.
                  <br />
                  More <span className="text-tm-green">Opportunities.</span>
                </h1>
                <p className="mt-4 text-[13px] leading-relaxed text-zinc-400">
                  TradeMind works with industry-leading partners to give you access to the best
                  tools, platforms and services in trading, finance and technology.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3 text-[11px] text-zinc-400">
                  <div>
                    <Shield className="mb-2 h-5 w-5 text-tm-green" />
                    <p className="font-semibold text-white">Verified partners</p>
                    <p className="mt-1">We work only with trusted and proven companies.</p>
                  </div>
                  <div>
                    <Star className="mb-2 h-5 w-5 text-tm-green" />
                    <p className="font-semibold text-white">Exclusive benefits</p>
                    <p className="mt-1">Special offers, lower fees and bonus programs.</p>
                  </div>
                  <div>
                    <Zap className="mb-2 h-5 w-5 text-tm-green" />
                    <p className="font-semibold text-white">More opportunities</p>
                    <p className="mt-1">Get access to tools that help you trade smarter and faster.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card flex flex-col p-6">
              <Crown className="h-8 w-8 text-tm-green" />
              <p className="mt-4 text-[17px] font-semibold">Partner Program</p>
              <p className="mt-2 text-[12px] leading-relaxed text-zinc-500">
                We also offer opportunities for brands and affiliates to partner with TradeMind.
              </p>
              <button type="button" className="btn-ghost mt-auto w-full border-tm-green/40 py-2.5 text-[13px] text-tm-green">
                Become a Partner →
              </button>
            </div>
          </section>

          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-bold">Our Partners</h2>
              <p className="mt-1 max-w-lg text-[13px] text-zinc-500">
                We collaborate with the most reliable and innovative companies in the industry. Here
                are some of our key partners:
              </p>
            </div>
            <span className="hidden rounded-full border border-white/10 px-3 py-1 text-[11px] text-zinc-500 md:inline">
              Trusted by traders worldwide
            </span>
          </div>

          <div className="card mt-5 flex flex-wrap items-center justify-between gap-5 px-6 py-5">
            {logos.map((Brand, i) => (
              <Brand key={i} className="opacity-80" />
            ))}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <PartnerCard
              badge={<GoogleMark className="h-5 w-5" />}
              name="Google Ads"
              tag="More traffic. Better results."
              body="We work with Google Ads to give you access to powerful advertising tools, expert support and exclusive offers for our users."
              points={['Special ad credits', 'Expert setup support', 'Access to new features']}
              visual={
                <div className="rounded-2xl border border-white/10 bg-[#0a1014] p-4">
                  <p className="flex items-center gap-1.5 text-[12px] font-semibold">
                    <GoogleMark className="h-3.5 w-3.5" /> Google
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-wide text-zinc-500">Campaign performance</p>
                  <div className="mt-2 flex gap-6 text-sm">
                    <div>
                      <p className="text-zinc-500">Clicks</p>
                      <p className="font-bold">12.4K</p>
                      <p className="text-[11px] text-tm-green">+32%</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Conversions</p>
                      <p className="font-bold">542</p>
                      <p className="text-[11px] text-tm-green">+48%</p>
                    </div>
                  </div>
                  <MiniChart height={56} seed={2} />
                </div>
              }
            />
            <PartnerCard
              badge={<MetaMark className="h-4 w-5 text-sky-400" />}
              name="Meta Ads"
              tag="Reach the right audience."
              body="Get the most out of Facebook and Instagram with exclusive tools and support from Meta."
              points={['Exclusive ad credits', 'Early access to new features', 'Dedicated account manager']}
              visual={
                <div className="rounded-2xl border border-white/10 bg-[#0a1014] p-4">
                  <p className="flex items-center gap-1.5 text-[12px] font-semibold">
                    <MetaMark className="h-3 w-4" /> Meta
                  </p>
                  <div className="mt-4 flex gap-2 text-lg">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs">f</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-pink-600 text-xs">
                      Ig
                    </span>
                  </div>
                  <p className="mt-4 text-[10px] text-zinc-500">Total campaigns</p>
                  <p className="text-xl font-bold">48</p>
                  <p className="text-[11px] text-tm-green">+26%</p>
                  <MiniChart height={48} seed={4} />
                </div>
              }
            />
            <PartnerCard
              badge={<BinanceMark className="h-4 w-4 text-amber-400" />}
              name="Binance"
              tag="Trade crypto with confidence."
              body="Get access to one of the world's leading crypto exchanges with special benefits for TradeMind users."
              points={['Lower trading fees', 'Exclusive events & airdrops', 'Priority customer support']}
              visual={
                <div className="rounded-2xl border border-white/10 bg-[#0a1014] p-4">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-amber-400">BINANCE</p>
                  <p className="mt-3 text-[11px] text-zinc-500">BTC/USDT</p>
                  <p className="text-xl font-bold">$67,432.18</p>
                  <p className="text-[11px] text-tm-green">+2.48%</p>
                  <MiniChart height={64} seed={7} />
                </div>
              }
            />
            <PartnerCard
              badge={<TradingViewMark className="h-4 w-4" />}
              name="TradingView"
              tag="Analyze. Plan. Trade."
              body="Use the world's leading charting platform and take your analysis to the next level with exclusive access and features."
              points={['Advanced charting tools', 'Real-time market data', 'Special partner offers']}
              visual={
                <div className="rounded-2xl border border-white/10 bg-[#0a1014] p-3">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold">
                    <TradingViewMark className="h-3.5 w-3.5" /> TradingView
                  </p>
                  <MiniChart height={70} seed={9} />
                  <div className="mt-2 space-y-1 text-[11px] text-zinc-400">
                    <div className="flex justify-between">
                      <span>BTCUSDT</span>
                      <span>67,432.18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ETHUSDT</span>
                      <span>3,240.12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SOLUSDT</span>
                      <span>142.67</span>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </main>
      </div>

      <Footer tagline="Smarter tools. Bigger opportunities." />
    </div>
  );
}

function PartnerCard({
  badge,
  name,
  tag,
  body,
  points,
  visual,
}: {
  badge: ReactNode;
  name: string;
  tag: string;
  body: string;
  points: string[];
  visual: ReactNode;
}) {
  return (
    <article className="card grid gap-4 p-5 md:grid-cols-[1fr_0.85fr] md:p-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-sm">{badge}</span>
          <div>
            <h3 className="text-[16px] font-semibold">{name}</h3>
            <p className="text-[12px] text-zinc-500">{tag}</p>
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">{body}</p>
        <ul className="mt-3 space-y-2">
          {points.map((pt) => (
            <CheckItem key={pt}>{pt}</CheckItem>
          ))}
        </ul>
        <button type="button" className="btn-ghost mt-5 border-tm-green/30 py-2 text-[12px] text-tm-green">
          Learn more →
        </button>
      </div>
      <div className="hidden md:block">{visual}</div>
    </article>
  );
}
