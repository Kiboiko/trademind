import { ArrowRight, Star, ThumbsUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';

type Category = 'All' | 'Trading' | 'Education' | 'Support' | 'App';

const reviews = [
  {
    name: 'Daniel K.',
    country: '🇺🇸',
    date: 'Mar 12, 2025',
    category: 'Trading' as Category,
    title: 'My first real profits',
    text: 'The AI assistant helped me understand entries I would have missed. Practice mode built my confidence.',
    helpful: 432,
  },
  {
    name: 'Sophie M.',
    country: '🇬🇧',
    date: 'Feb 28, 2025',
    category: 'Education' as Category,
    title: 'Courses that actually stick',
    text: 'Structured lessons and live sessions made complex topics simple. Worth every minute.',
    helpful: 318,
  },
  {
    name: 'James T.',
    country: '🇺🇸',
    date: 'Jan 15, 2025',
    category: 'Support' as Category,
    title: '24/7 when I needed it',
    text: 'Manager and AI support answered fast during volatile hours. Felt like a real team behind me.',
    helpful: 276,
  },
  {
    name: 'Luca R.',
    country: '🇪🇸',
    date: 'Apr 2, 2025',
    category: 'App' as Category,
    title: 'Clean and powerful app',
    text: 'Signals, charts, and learning in one place. The mobile experience matches the desktop.',
    helpful: 189,
  },
  {
    name: 'Thomas B.',
    country: '🇩🇪',
    date: 'Mar 8, 2025',
    category: 'Trading' as Category,
    title: 'Smarter entries',
    text: 'AI breakdowns on BTC levels changed how I plan trades. Still learning but results improved.',
    helpful: 401,
  },
  {
    name: 'Emma L.',
    country: '🇫🇷',
    date: 'Feb 1, 2025',
    category: 'Education' as Category,
    title: 'From zero to confident',
    text: 'Started with basics, now using technical analysis daily. The journey map keeps me motivated.',
    helpful: 224,
  },
];

const filters: Category[] = ['All', 'Trading', 'Education', 'Support', 'App'];

export default function ReviewsPage() {
  const [filter, setFilter] = useState<Category>('All');

  const filtered = useMemo(
    () => (filter === 'All' ? reviews : reviews.filter((r) => r.category === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen">
      <AppHeader />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <span className="rounded-full border border-tm-green/40 px-3 py-1 text-xs font-semibold text-tm-green">
            REAL PEOPLE. REAL RESULTS.
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            Thousands of traders already{' '}
            <span className="text-tm-green">trust TradeMind.</span>
          </h1>
          <p className="mt-4 text-zinc-400">
            See what learners and traders say about education, AI signals, and support.
          </p>
          <div className="mt-8 flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-xl font-bold">500K+</p>
              <p className="text-zinc-500">Active users</p>
            </div>
            <div>
              <p className="text-xl font-bold">4.8/5</p>
              <p className="text-zinc-500">Average rating</p>
            </div>
            <div>
              <p className="text-xl font-bold">24/7</p>
              <p className="text-zinc-500">Support</p>
            </div>
          </div>
        </div>
        <div className="card relative mx-auto w-full max-w-sm p-6 shadow-glow">
          <p className="text-xs text-zinc-500">BTC/USDT</p>
          <p className="text-2xl font-bold text-tm-green">$67,432.18</p>
          <div className="mt-4 h-32 rounded-lg bg-gradient-to-t from-tm-green/30 to-transparent" />
          <div className="absolute -left-4 top-12 max-w-[140px] rounded-lg border border-tm-border bg-tm-card p-2 text-xs">
            Daniel K. ★★★★★ &quot;AI signals work&quot;
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <span className="text-xs font-semibold text-tm-green">USER REVIEWS</span>
        <h2 className="mt-2 text-3xl font-bold">What our users are saying</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={
                filter === f
                  ? 'rounded-full bg-tm-green px-4 py-2 text-sm font-semibold text-tm-bg'
                  : 'rounded-full border border-tm-border px-4 py-2 text-sm text-zinc-400 hover:border-tm-green/50'
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <article key={r.name + r.date} className="card p-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">
                    {r.name} {r.country}
                  </p>
                  <p className="text-xs text-zinc-500">{r.date}</p>
                </div>
                <span className="rounded-full bg-tm-green/10 px-2 py-0.5 text-xs text-tm-green">
                  {r.category}
                </span>
              </div>
              <div className="mt-3 flex gap-0.5 text-tm-green">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <h3 className="mt-2 font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{r.text}</p>
              <button
                type="button"
                className="mt-4 flex items-center gap-2 text-sm text-tm-green hover:underline"
              >
                <ThumbsUp className="h-4 w-4" /> Helpful ({r.helpful})
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-tm-border bg-black/30 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:px-6">
          <div>
            <h2 className="text-2xl font-bold">Join a growing community</h2>
            <p className="mt-2 max-w-md text-zinc-400">
              Download the app or start in the browser — same AI, same education.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="rounded-xl border border-tm-border px-6 py-3 text-sm">App Store</span>
            <span className="rounded-xl border border-tm-border px-6 py-3 text-sm">Google Play</span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-tm-green/10 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:px-6">
          <div>
            <h2 className="text-3xl font-bold">Ready to join the community?</h2>
            <p className="mt-2 text-zinc-400">No deposit. No risk. Just learn and explore.</p>
          </div>
          <Link to="/pricing" className="btn-primary">
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
