import { ArrowRight, Shield, Star, ThumbsUp, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import { SectionLabel, Wrap } from '../components/ui';

type Category = 'All' | 'Trading' | 'Education' | 'Support' | 'App';

const reviews = [
  {
    name: 'Mark S.',
    flag: '🇺🇸',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Aug 28, 2025',
    category: 'Trading' as Category,
    title: 'My first real profits',
    text: "I've been trading for a few months and this platform made it so much easier. The AI assistant gives solid signals and the education section is really helpful. Already in profit!",
    helpful: 432,
  },
  {
    name: 'Emily R.',
    flag: '🇬🇧',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Aug 24, 2025',
    category: 'Education' as Category,
    title: 'Perfect for beginners',
    text: 'I had no experience before, but the step-by-step learning and the AI assistant really guide you. The interface is simple and clean. I finally feel confident trading.',
    helpful: 318,
  },
  {
    name: 'Carlos M.',
    flag: '🇪🇸',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: 'Aug 20, 2025',
    category: 'App' as Category,
    title: 'Great support and fast answers',
    text: 'I had a question about my account and the support team replied in minutes. The platform runs super smooth and signals are accurate. 10/10!',
    helpful: 267,
  },
  {
    name: 'Anna L.',
    flag: '🇩🇪',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    date: 'Aug 17, 2025',
    category: 'Trading' as Category,
    title: 'Changed my mindset',
    text: 'I used to lose money randomly, but here everything is structured. The analytics and AI assistant helped me understand the market better. Now I make decisions with confidence.',
    helpful: 201,
  },
  {
    name: 'Kevin D.',
    flag: '🇨🇭',
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
    date: 'Aug 12, 2025',
    category: 'Education' as Category,
    title: "Best trading platform I've tried",
    text: "The combination of AI, education and real-time market data is unbeatable. It's not just a platform, it's a full trading experience.",
    helpful: 176,
  },
  {
    name: 'Isabella P.',
    flag: '🇮🇹',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    date: 'Aug 8, 2025',
    category: 'Support' as Category,
    title: 'Amazing experience',
    text: 'I love how easy it is to use and how supportive the team is. The AI assistant feels like having a personal coach. Highly recommend!',
    helpful: 154,
  },
];

const filters: Category[] = ['All', 'Trading', 'Education', 'Support', 'App'];

function Stars() {
  return (
    <span className="flex gap-0.5 text-tm-green">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const [filter, setFilter] = useState<Category>('All');
  const filtered = useMemo(
    () => (filter === 'All' ? reviews : reviews.filter((r) => r.category === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen">
      <AppHeader />

      <section className="relative overflow-hidden">
        <Wrap className="grid items-center gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
          <div>
            <SectionLabel>REAL PEOPLE. REAL RESULTS.</SectionLabel>
            <h1 className="mt-5 text-[36px] font-bold leading-[1.15] md:text-[44px]">
              Thousands of traders
              <br />
              already <span className="text-tm-green">trust TradeMind.</span>
            </h1>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-zinc-400">
              See what our users say about their experience, how AI helped them grow, and why they
              keep coming back.
            </p>
            <div className="mt-8 flex flex-wrap gap-8 text-[13px]">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-tm-green" />
                <div>
                  <p className="font-semibold">500K+</p>
                  <p className="text-zinc-500">Active users</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-tm-green" />
                <div>
                  <p className="font-semibold">4.8/5</p>
                  <p className="text-zinc-500">Average rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-tm-green" />
                <div>
                  <p className="font-semibold">24/7</p>
                  <p className="text-zinc-500">Support</p>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/design/reviews-hero.png"
            alt="User reviews around the TradeMind app"
            className="mx-auto w-full max-w-[640px] object-contain"
          />
        </Wrap>
      </section>

      <section className="pb-16 pt-4">
        <Wrap>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>USER REVIEWS</SectionLabel>
              <h2 className="mt-3 text-[28px] font-bold md:text-[32px]">What our users are saying</h2>
              <p className="mt-2 max-w-lg text-[13px] text-zinc-500">
                Real feedback from real traders who are growing their skills, profits and confidence
                with TradeMind.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={
                    filter === f
                      ? 'rounded-full bg-tm-green px-4 py-1.5 text-[13px] font-semibold text-[#06100c]'
                      : 'rounded-full border border-white/10 px-4 py-1.5 text-[13px] text-zinc-400 hover:border-tm-green/40'
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <article key={r.name + r.date} className="card p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img src={r.photo} alt="" className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <p className="text-[14px] font-semibold">
                        {r.name} {r.flag}
                      </p>
                      <Stars />
                      <p className="text-[11px] text-zinc-500">{r.date}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-400">
                    {r.category}
                  </span>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold">{r.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">&ldquo;{r.text}&rdquo;</p>
                <button type="button" className="mt-4 flex items-center gap-1.5 text-[12px] text-tm-green">
                  <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({r.helpful})
                </button>
              </article>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="border-y border-white/[0.05] py-12">
        <Wrap className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr_0.9fr]">
          <div>
            <h2 className="text-[24px] font-bold">Join a growing community</h2>
            <p className="mt-2 text-[13px] text-zinc-500">
              TradeMind is available on iOS and Android.
              <br />
              Start your journey today.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs">
                <span className="text-lg"></span>
                <span>
                  <span className="block text-[9px] text-zinc-400">Download on the</span>
                  App Store
                </span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs">
                <span className="text-lg text-tm-green">▶</span>
                <span>
                  <span className="block text-[9px] text-zinc-400">GET IT ON</span>
                  Google Play
                </span>
              </span>
            </div>
          </div>
          <article className="card p-5">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt=""
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">
                  Thomas B. 🇺🇸
                </p>
                <Stars />
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
              &ldquo;I&apos;ve tried many platforms, but TradeMind is on another level. The AI assistant is
              incredibly useful, and the education really helps you grow as a trader. I&apos;m
              impressed!&rdquo;
            </p>
            <p className="mt-2 text-[11px] text-zinc-600">1 week ago</p>
          </article>
          <div className="relative">
            <img src="/design/reviews-phone.png" alt="Real people. Real results." className="mx-auto w-full max-w-[340px]" />
          </div>
        </Wrap>
      </section>

      <section className="py-10">
        <Wrap>
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/10 bg-cover bg-center px-8 py-10 md:px-12"
            style={{ backgroundImage: "url('/design/reviews-cta.png')" }}
          >
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-[26px] font-bold">Ready to join the community?</h2>
                <p className="mt-2 max-w-md text-[13px] text-zinc-300">
                  See why thousands of traders have already chosen TradeMind.
                  <br />
                  Your journey starts here.
                </p>
              </div>
              <div className="text-center">
                <Link to="/pricing" className="btn-primary">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-2 text-[11px] text-zinc-400">No deposit. No risk. Just learn and explore.</p>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <Footer />
    </div>
  );
}
