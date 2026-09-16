import { ArrowRight, Check, Lock, Shield, Headphones, RefreshCw } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import { PlanId, usePricing } from '../context/PricingContext';

const plans: {
  id: PlanId;
  name: string;
  price: number;
  tagline: string;
  popular?: boolean;
  features: string[];
}[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 250,
    tagline: 'Perfect for beginners.',
    features: [
      'AI trading assistant',
      'Basic education access',
      'Email support',
      'Market alerts',
      'Practice mode',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 500,
    tagline: 'Most popular choice.',
    popular: true,
    features: [
      'Everything in Starter',
      'Personal manager',
      'Advanced AI signals',
      'Live sessions',
      'Priority support',
      'Extended courses',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1000,
    tagline: 'For serious traders.',
    features: [
      'Everything in Pro',
      'VIP onboarding',
      'Custom strategies',
      '1-on-1 coaching',
      'API integrations',
      'Exclusive webinars',
      'Dedicated account team',
    ],
  },
];

export default function PricingPage() {
  const { selectedPlan, setSelectedPlan } = usePricing();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(0,255,136,0.06)_0%,_transparent_55%)]">
      <AppHeader />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-tm-green">
          Step 1 of 3 · Choose your plan
        </span>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Your personal AI trading assistant.{' '}
          <span className="text-tm-green">Real education. Proven results.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Pick a plan that fits your goals. Complete your details after selecting a tariff.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-bold">Choose Your Plan</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-tm-green" /> Secure & Encrypted
          </span>
          <span className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4 text-tm-green" /> Flexible Plans
          </span>
          <span className="flex items-center gap-1">
            <Headphones className="h-4 w-4 text-tm-green" /> 24/7 Support
          </span>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const selected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`card relative flex flex-col p-8 ${
                  plan.popular ? 'border-tm-green shadow-glow-strong' : ''
                } ${selected ? 'ring-2 ring-tm-green' : ''}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tm-green px-3 py-0.5 text-xs font-bold text-tm-bg">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-3xl font-extrabold">
                  ${plan.price}
                  <span className="text-base font-normal text-zinc-500"> / one-time</span>
                </p>
                <p className="mt-2 text-sm text-zinc-500">{plan.tagline}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="h-5 w-5 shrink-0 text-tm-green" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={plan.popular || selected ? 'btn-primary mt-8 w-full' : 'btn-outline mt-8 w-full'}
                >
                  Select Plan
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Your details</h2>
            <p className="mt-2 text-zinc-400">
              {selectedPlan
                ? 'Complete the form to activate your plan.'
                : 'Select a plan above to unlock the registration form.'}
            </p>
            <ul className="mt-8 space-y-4 text-sm text-zinc-500">
              <li>Fast activation</li>
              <li>Personalized onboarding</li>
              <li>Full support</li>
            </ul>
          </div>

          <div className={`card p-8 transition ${!selectedPlan ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="mb-8 flex gap-4 text-xs">
              <span className="text-tm-green">1 Plan ✓</span>
              <span className="font-semibold text-white">2 Details</span>
              <span className="text-zinc-600">3 Confirmation</span>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-tm-green/40 bg-tm-green/10 p-6 text-center">
                <p className="font-semibold text-tm-green">Thank you!</p>
                <p className="mt-2 text-sm text-zinc-400">
                  We received your request for the {selectedPlan} plan. Our team will contact you shortly.
                </p>
                <Link to="/" className="btn-outline mt-6 inline-flex text-sm">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <label className="block text-sm">
                  Full name
                  <input
                    required
                    disabled={!selectedPlan}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-tm-border bg-black/40 px-4 py-3 outline-none focus:border-tm-green"
                  />
                </label>
                <label className="block text-sm">
                  Phone number
                  <input
                    required
                    type="tel"
                    disabled={!selectedPlan}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-tm-border bg-black/40 px-4 py-3 outline-none focus:border-tm-green"
                  />
                </label>
                <label className="block text-sm">
                  Email
                  <input
                    required
                    type="email"
                    disabled={!selectedPlan}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-tm-border bg-black/40 px-4 py-3 outline-none focus:border-tm-green"
                  />
                </label>
                <button type="submit" className="btn-primary w-full">
                  Continue <ArrowRight className="h-5 w-5" />
                </button>
                <p className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                  <Lock className="h-3 w-3" /> Your information is safe and protected
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-tm-border bg-gradient-to-b from-tm-green/5 to-transparent py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:px-6">
          {[
            { v: '500K+', l: 'Active users' },
            { v: '4.8/5', l: 'Average rating' },
            { v: '24/7', l: 'AI & manager support' },
            { v: '100+', l: 'Educational lessons' },
          ].map(({ v, l }) => (
            <div key={l}>
              <p className="text-2xl font-bold">{v}</p>
              <p className="text-sm text-zinc-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer tagline="Better tools. Smarter trading." />
    </div>
  );
}
