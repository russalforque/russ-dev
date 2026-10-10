import { useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { RESUME_URL } from '../utils/resume';
import Section from './ui/Section';

interface ContactSectionProps {
  onCopyEmail: () => void;
  copied: boolean;
}

const LINKS = [
  { label: 'LinkedIn', href: portfolioData.linkedin },
  { label: 'GitHub', href: portfolioData.github },
  { label: 'Résumé (PDF)', href: RESUME_URL },
];

export default function ContactSection({ onCopyEmail, copied }: ContactSectionProps) {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <>
      <Section id="contact" title="Contact">
        <p className="max-w-[36rem] text-pretty text-[17px] leading-[1.6] text-fg">
          Hiring for a junior .NET or full-stack role? Email is the fastest way to reach me. I usually reply within a
          day.
        </p>

        <a
          href={`mailto:${portfolioData.email}`}
          onClick={() => soundManager.playTick(1000)}
          className="mt-6 inline-block break-all text-[clamp(1.6rem,5.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-fg underline decoration-accent decoration-[3px] underline-offset-[0.14em] hover:text-accent"
        >
          {portfolioData.email}
        </a>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onCopyEmail();
              soundManager.playSuccess();
            }}
            className="btn btn-secondary"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            <span aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</span>
          </button>
        </div>

        <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-6 text-[17px]">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTick(1000)}
                className="link inline-flex items-center gap-1 font-semibold"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[15px] text-muted">
          {portfolioData.location} ({portfolioData.timezone}). {portfolioData.workSetup} roles.
        </p>
      </Section>

      <footer className="container-page">
        <div className="flex flex-col gap-3 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {portfolioData.name}. Built with React and Tailwind CSS.{' '}
            <a href={`${portfolioData.github}/russ-dev`} target="_blank" rel="noopener noreferrer" className="link">
              View this site's source
            </a>
          </p>
          <button
            type="button"
            onClick={() => {
              soundManager.playTick(1200);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="no-print inline-flex cursor-pointer items-center gap-1 self-start text-fg underline underline-offset-4 sm:self-auto"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </>
  );
}
