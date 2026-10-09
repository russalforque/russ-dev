import { useEffect, useState } from 'react';
import { Copy, Check, ArrowUpRight, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Reveal from './ui/Reveal';

interface ContactSectionProps {
  onCopyEmail: () => void;
  copied: boolean;
}

const SOCIALS = [
  { label: 'GitHub', href: portfolioData.github },
  { label: 'LinkedIn', href: portfolioData.linkedin },
  { label: 'Facebook', href: portfolioData.facebook },
  { label: 'Instagram', href: portfolioData.instagram },
];

export default function ContactSection({ onCopyEmail, copied }: ContactSectionProps) {
  const [year] = useState(() => new Date().getFullYear());
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit' });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 rotate-180 opacity-60" aria-hidden="true" />

      <div className="container-page pb-10 pt-24 sm:pt-32">
        <Reveal>
          <div className="eyebrow flex items-center gap-3">
            <span className="text-accent">08</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span>Contact</span>
          </div>

          <h2
            id="contact-title"
            className="mt-8 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg"
          >
            Let's build something{' '}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">useful</span>.
          </h2>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Hiring for a junior .NET or full-stack role, or have a project in mind? My inbox is open — I usually reply
            within a day.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${portfolioData.email}`}
              onClick={() => soundManager.playTick(1000)}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-on-accent transition-transform hover:-translate-y-0.5 sm:text-base"
            >
              {portfolioData.email}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => {
                onCopyEmail();
                soundManager.playSuccess();
              }}
              className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-sm font-medium text-fg transition-colors hover:border-fg"
              aria-live="polite"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-muted" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-20 grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {SOCIALS.map((s) => (
              <li key={s.label} className="border-b border-line sm:border-b-0 odd:border-r sm:border-r sm:last:border-r-0">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playTick(1000)}
                  className="group flex items-center justify-between px-1 py-5 text-sm font-medium text-fg transition-colors hover:text-accent sm:px-4"
                >
                  {s.label}
                  <ArrowUpRight className="h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className="mt-16 flex flex-col gap-4 border-t border-line pt-8 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Rhazel Alforque · Built with React, Tailwind & Motion</span>
          <div className="flex items-center gap-5">
            <span>Cebu · {time}</span>
            <button
              type="button"
              onClick={() => {
                soundManager.playTick(1200);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-fg"
            >
              Back to top <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
