import { ArrowRight, Lightbulb, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import LandingHeader from '../components/LandingHeader';
import { SectionLabel, Wrap } from '../components/ui';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <Wrap className="py-16 md:py-20">
        <SectionLabel>About us</SectionLabel>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          We build tools so anyone can <span className="text-tm-green">learn and trade smarter.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-zinc-400">
          TradeMind combines AI-assisted analysis, structured education, and risk-free practice. Our
          mission is to make professional-grade trading insights accessible — with human support when
          you need it.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
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
              <Icon className="h-9 w-9 text-tm-green" />
              <h2 className="mt-4 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
        <div className="card mt-14 bg-gradient-to-r from-tm-green/10 to-transparent p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
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
      </Wrap>
      <Footer />
    </div>
  );
}
