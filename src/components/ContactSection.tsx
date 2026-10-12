import { useState } from 'react';
import { Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Reveal from './ui/Reveal';

interface ContactSectionProps {
  onCopyEmail: () => void;
  copied: boolean;
  /** Section number, shown only on the home page */
  index?: string;
}

const SOCIALS = [
  { label: 'github', href: portfolioData.github },
  { label: 'linkedin', href: portfolioData.linkedin },
  { label: 'facebook', href: portfolioData.facebook },
  { label: 'instagram', href: portfolioData.instagram },
];

export default function ContactSection({ onCopyEmail, copied, index }: ContactSectionProps) {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <>
      <section id="contact" aria-labelledby="contact-title" className="relative py-14">
        <Reveal>
          <h2 id="contact-title" className="font-mono text-[13px] text-faint">
            <span className="text-accent">//</span> {index && `${index} `}<span className="text-muted">say hello</span>
          </h2>
          <p className="mt-8 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
            Hiring for a junior .NET or full-stack role, or have a project in mind? My inbox is open. I usually reply
            within a day.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={`mailto:${portfolioData.email}`}
              onClick={() => soundManager.playTick(1000)}
              className="font-serif text-3xl italic text-fg underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-4xl"
            >
              {portfolioData.email}
            </a>
            <button
              type="button"
              onClick={() => {
                onCopyEmail();
                soundManager.playSuccess();
              }}
              aria-live="polite"
              className="inline-flex cursor-pointer items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-fg"
            >
              {copied ? (
                <>
                  copied <Check className="h-3 w-3" />
                </>
              ) : (
                'copy'
              )}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[12px] text-muted">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTick(1000)}
                className="transition-colors hover:text-fg"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="flex items-center justify-between border-t border-line py-8 font-mono text-[11px] text-faint">
        <span className="font-serif text-lg italic text-fg">Rhazel</span>
        <span>© {year} · made in cebu with ☕ & c#</span>
      </footer>
    </>
  );
}
