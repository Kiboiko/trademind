import { Check } from 'lucide-react';
import { ReactNode } from 'react';

export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="label-pill">{children}</span>;
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[13px] leading-snug text-zinc-300">
      <span className="check-dot mt-0.5">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

export function PageShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`min-h-screen bg-tm-bg ${className}`}>{children}</div>;
}

export function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-page px-5 md:px-8 ${className}`}>{children}</div>;
}
