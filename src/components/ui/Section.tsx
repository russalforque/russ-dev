import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  /** Short line under the heading, e.g. a count or a caveat */
  note?: ReactNode;
  /** Extra content for the heading column, e.g. a list of jump links */
  aside?: ReactNode;
  children: ReactNode;
}

/**
 * Shared section layout, set like a résumé: the heading sits in a narrow
 * left column and stays in view while its content scrolls on the right.
 */
export default function Section({ id, title, note, aside, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <div className="container-page">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 border-t border-fg py-12 sm:py-16 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div>
            <div className="lg:sticky lg:top-24">
              <h2 id={`${id}-title`} className="text-2xl font-extrabold leading-tight tracking-[-0.02em] text-fg">
                {title}
              </h2>
              {note && <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{note}</p>}
              {aside}
            </div>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
