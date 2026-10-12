import type { ReactNode } from 'react';
import Reveal from './Reveal';
import { Link } from '../../utils/router';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  /** Optional element on the right of the heading (counts, "all →" links) */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Shared section layout: a code-comment heading ("// 01 projects") over the content. */
export default function Section({ id, index, label, aside, className = '', children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-14 ${className}`}>
      <Reveal>
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 id={`${id}-title`} className="font-mono text-[13px] text-faint">
            <span className="text-accent">//</span> {index} <span className="text-muted">{label}</span>
          </h2>
          {aside && <div className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">{aside}</div>}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

/** Heading for a standalone page (/projects, /stack, ...) */
export function PageHeader({ title, intro, count }: { title: string; intro: string; count?: string }) {
  return (
    <header className="pb-10 pt-16 sm:pt-24">
      <Reveal>
        <Link
          to="/"
          className="font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-fg"
        >
          ← home
        </Link>
        <div className="mt-8 flex items-baseline justify-between gap-4">
          <h1 className="font-serif text-5xl italic leading-none tracking-[-0.01em] text-fg sm:text-6xl">{title}</h1>
          {count && <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-faint">{count}</span>}
        </div>
        <p className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-muted">{intro}</p>
      </Reveal>
    </header>
  );
}

/** "all projects →" style link used in a Section's aside */
export function AllLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="transition-colors hover:text-fg">
      {children} →
    </Link>
  );
}
