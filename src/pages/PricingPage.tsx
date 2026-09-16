import {
  ArrowRight,
  BookOpen,
  Headphones,
  Lock,
  RefreshCw,
  Shield,
  UserRound,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import { CheckItem, SectionLabel, Wrap } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { PlanId, usePricing } from '../context/PricingContext';

const plans: {
  id: PlanId;
  name: string;
  price: string;
  tagline: string;
  popular?: boolean;
  features: string[];
}[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '250',
    tagline: 'Perfect for beginners',
    features: [
      'Access to AI trading assistant',
      'Basic market education (courses)',
      'Trading signals (3–5 per day)',
      'Demo account with real market data',
      'Personal manager support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '500',
    tagline: 'For active traders',
    popular: true,
    features: [
      'All Starter features',
      'Advanced trading courses',
      'More trading signals (5–10 per day)',
      'Personalized strategy plans',
      'Priority support from your manager',
      'Access to premium tools',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '1,000',
    tagline: 'For serious traders',
    features: [
      'All Pro features',
      'Exclusive trading strategies',
      'VIP market analysis (daily)',
      'One-on-one sessions with your manager',
      'Access to advanced AI tools',
      'Increased signals (10–20 per day)',
    ],
  },
];

export default function PricingPage() {
  const { selectedPlan, setSelectedPlan } = usePricing();
  const { register } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    register(form.name);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <AppHeader />

      <section className="relative overflow-hidden">
        <Wrap className="grid items-center gap-6 py-10 lg:grid-cols-[1fr_1.05fr] lg:py-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <SectionLabel>STEP 1 OF 3</SectionLabel>
              <span className="text-[13px] text-zinc-500">Choose your plan</span>
            </div>
            <h1 className="mt-5 max-w-xl text-[34px] font-bold leading-[1.12] md:text-[44px]">
              Your personal AI trading assistant.{' '}
              <span className="text-tm-green">Real education. Proven results.</span>
            </h1>
            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-zinc-400">
              Select a plan that fits your goals. Get access to an AI assistant, expert support and
              a complete learning ecosystem — all in one place.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 text-[12px] text-zinc-400">
              <div className="flex items-start gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-tm-green/30 text-tm-green">
                  <Shield className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-medium text-white">AI Trading Assistant</span>
                  24/7 support and analysis
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-tm-green/30 text-tm-green">
                  <UserRound className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-medium text-white">Personal Manager</span>
                  Get guidance from a real expert
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-tm-green/30 text-tm-green">
                  <BookOpen className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-medium text-white">Trading Education</span>
                  Courses, strategies and live sessions
                </span>
              </div>
            </div>
          </div>
          <img
            src="/design/pricing-hero.png"
            alt="TradeMind AI assistant"
            className="mx-auto w-full max-w-[560px] object-contain"
          />
        </Wrap>
      </section>

      <section className="pb-8 pt-4">
        <Wrap>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-[28px] font-bold">Choose Your Plan</h2>
              <p className="mt-2 max-w-md text-[13px] text-zinc-500">
                Each plan includes an AI assistant and a personal manager.
                <br />
                The higher the plan, the more tools and support you get.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 rounded-full border border-white/10 px-4 py-2 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-tm-green" /> Secure & Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-tm-green" /> Flexible Plans
              </span>
              <span className="flex items-center gap-1.5">
                <Headphones className="h-3.5 w-3.5 text-tm-green" /> 24/7 Support
              </span>
            </div>
          </div>

          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {plans.map((plan) => {
              const selected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-[22px] border p-7 ${
                    plan.popular
                      ? 'border-tm-green bg-[#0b1612] shadow-glow-strong'
                      : 'border-white/10 bg-[#0c1210]'
                  } ${selected ? 'ring-2 ring-tm-green/80' : ''}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tm-green px-3 py-0.5 text-[10px] font-bold tracking-wide text-[#06100c]">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="text-[22px] font-bold">{plan.name}</h3>
                  <p className="mt-1 text-[13px] text-zinc-500">{plan.tagline}</p>
                  <p className="mt-5 text-[40px] font-extrabold leading-none">
                    ${plan.price}{' '}
                    <span className="text-[13px] font-normal text-zinc-500">one-time deposit</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <CheckItem key={f}>{f}</CheckItem>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={
                      plan.popular || selected
                        ? 'btn-primary mt-8 w-full'
                        : 'btn-ghost mt-8 w-full border-white/15 py-3'
                    }
                  >
                    Select Plan →
                  </button>
                </div>
              );
            })}
          </div>
        </Wrap>
      </section>

      <section className="py-12">
        <Wrap>
          <div className="card relative grid gap-10 p-8 md:grid-cols-2 md:p-10">
            <div>
              <h2 className="text-[28px] font-bold">Your details</h2>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-zinc-400">
                After selecting a plan, fill in your information. Our team will contact you shortly
                to activate your account and set up your AI assistant and manager.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-3 text-center text-[12px] text-zinc-400">
                {[
                  { icon: Shield, t: 'Fast activation', s: '(less than 24h)' },
                  { icon: UserRound, t: 'Personalized', s: 'onboarding' },
                  { icon: Headphones, t: 'Full support', s: 'from our team' },
                ].map(({ icon: Icon, t, s }) => (
                  <div key={t}>
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-tm-green/30 text-tm-green">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-2 font-medium text-white">{t}</p>
                    <p>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="mb-6 flex items-center justify-center gap-3 text-[12px]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tm-green text-[11px] font-bold text-[#06100c]">
                  1
                </span>
                <span className="text-tm-green">Plan</span>
                <span className="h-px w-10 bg-tm-green/40" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-zinc-400">
                  2
                </span>
                <span className="text-zinc-400">Details</span>
                <span className="h-px w-10 bg-white/10" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-zinc-500">
                  3
                </span>
                <span className="text-zinc-500">Confirmation</span>
              </div>

              {!selectedPlan && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-[#070b09]/70 backdrop-blur-[2px]">
                  <Lock className="h-6 w-6 text-tm-green" />
                  <p className="mt-2 text-sm text-zinc-300">Select a plan to unlock the form</p>
                </div>
              )}

              {submitted ? (
                <div className="rounded-xl border border-tm-green/40 bg-tm-green/10 p-6 text-center">
                  <p className="font-semibold text-tm-green">Thank you!</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    We received your request for the {selectedPlan} plan. Our team will contact you
                    shortly.
                  </p>
                  <Link to="/" className="btn-outline mt-6 inline-flex text-sm">
                    Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <label className="block text-[13px] text-zinc-400">
                    Full name <span className="text-red-400">*</span>
                    <input
                      required
                      disabled={!selectedPlan}
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="field"
                    />
                  </label>
                  <label className="block text-[13px] text-zinc-400">
                    Phone number <span className="text-red-400">*</span>
                    <div className="mt-1.5 flex gap-2">
                      <span className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/30 px-3 text-sm">
                        🇺🇸 +1
                      </span>
                      <input
                        required
                        type="tel"
                        disabled={!selectedPlan}
                        placeholder="(555) 123-4567"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="field mt-0 flex-1"
                      />
                    </div>
                  </label>
                  <label className="block text-[13px] text-zinc-400">
                    Email <span className="text-red-400">*</span>
                    <input
                      required
                      type="email"
                      disabled={!selectedPlan}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="field"
                    />
                  </label>
                  <button type="submit" disabled={!selectedPlan} className="btn-primary w-full py-3.5">
                    Continue <ArrowRight className="h-5 w-5" />
                  </button>
                  <p className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                    <Lock className="h-3 w-3" /> Your information is safe and protected
                  </p>
                </form>
              )}
            </div>
          </div>
        </Wrap>
      </section>

      <section className="mt-4 border-t border-white/[0.05] py-10">
        <Wrap>
          <img
            src="/design/pricing-bottom.png"
            alt="More than a platform. It's your advantage. Trusted by 500K+ active users, 4.8/5 average rating, 24/7 AI & manager support, 100+ educational lessons."
            className="w-full rounded-2xl"
          />
        </Wrap>
      </section>

      <Footer tagline="Better tools. Smarter trading." />
    </div>
  );
}
