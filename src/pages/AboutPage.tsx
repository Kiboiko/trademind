import { ArrowRight, Target, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/LandingHeader';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-tm-green">About us</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
          We build tools so anyone can{' '}
          <span className="text-tm-green">learn and trade smarter.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          TradeMind combines AI-assisted analysis, structured education, and risk-free practice.
          Our mission is to make professional-grade trading insights accessible — with human support
          when you need it.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: 'Our mission',
              text: 'Democratize trading education and responsible decision-making with AI.',
            },
            {
              icon: Users,
              title: 'Our team',
              text: 'Traders, educators, and engineers united by transparent, user-first products.',
            },
            {
              icon: Lightbulb,
              title: 'Our approach',
              text: 'Learn first, practice safely, then apply insights in live markets with guidance.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-8">
              <Icon className="h-10 w-10 text-tm-green" />
              <h2 className="mt-4 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="card mt-16 bg-gradient-to-r from-tm-green/10 to-transparent p-10 text-center md:text-left">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-2xl font-bold">Ready to start?</h2>
              <p className="mt-2 text-zinc-400">Try the free practice mode or choose a plan.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/practice" className="btn-primary">
                Start Free Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="btn-outline">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
