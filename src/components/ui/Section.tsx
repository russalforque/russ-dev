import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Optional element aligned to the right of the title (counts, links) */
  aside?: ReactNode;
  children: ReactNode;
}

/**
 * Shared section layout: a sticky numbered label on the left (desktop)
 * and the heading + content on the right. Keeps every section on the
 * same 12-column rhythm.
 */
export default function Section({ id, index, label, title, intro, aside, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className="container-page grid grid-cols-1 gap-6 py-16 sm:gap-8 sm:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="eyebrow flex items-center gap-3 lg:sticky lg:top-28">
            <span className="text-accent">{index}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span>{label}</span>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-9">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id={`${id}-title`}
                className="max-w-2xl text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-5xl"
              >
                {title}
              </h2>
              {aside && <div className="shrink-0">{aside}</div>}
            </div>
            {intro && (
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {intro}
              </p>
            )}
          </Reveal>

          <div className="mt-10 sm:mt-14">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Italic serif accent used inside headings */
export function Em({ children }: { children: ReactNode }) {
  return <em className="font-serif font-normal italic tracking-[-0.01em]">{children}</em>;
}
