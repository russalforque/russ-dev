import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { apps } from '../data/apps';
import { soundManager } from '../utils/sound';
import { RESUME_URL } from '../utils/resume';
import Reveal from './ui/Reveal';

interface HeroProps {
  onCopyEmail: () => void;
  copied: boolean;
}

/** Live clock for Cebu (Asia/Manila, UTC+8) */
function useCebuTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Manila',
      hour: 'numeric',
      minute: '2-digit',
    });
    const update = () => setTime(formatter.format(new Date()).toLowerCase());
    update();
    const interval = setInterval(update, 1000 * 15);
    return () => clearInterval(interval);
  }, []);
  return time;
}

const latestApp = apps[0];

/** What I'm up to right now, printed like terminal output */
const NOW = [
  latestApp && `shipping ${latestApp.name} v${latestApp.version} for Android`,
  'learning Docker, Kubernetes & GCP',
  'open to junior .NET / full-stack roles',
].filter(Boolean) as string[];

const LINKS = [
  { label: 'github', href: portfolioData.github },
  { label: 'linkedin', href: portfolioData.linkedin },
  { label: 'instagram', href: portfolioData.instagram },
  { label: 'résumé', href: RESUME_URL },
];

export default function Hero({ onCopyEmail, copied }: HeroProps) {
  const cebuTime = useCebuTime();

  return (
    <section id="top" aria-label="Introduction" className="relative pb-14 pt-16 sm:pt-24">
      <div className="grid gap-10 sm:grid-cols-[13rem_1fr] sm:items-start sm:gap-12">
        {/* Polaroid */}
        <Reveal className="mx-auto w-52 sm:mx-0">
          <figure className="-rotate-2 rounded-sm border border-line bg-surface p-2.5 pb-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:rotate-0">
            <img
              src="/assets/profile.jpg"
              alt="Portrait of Rhazel Alforque"
              width={400}
              height={480}
              loading="eager"
              fetchPriority="high"
              draggable={false}
              className="block aspect-5/6 h-auto w-full select-none object-cover"
            />
            <figcaption className="mt-2.5 flex items-baseline justify-between px-0.5">
              <span className="font-serif text-lg italic leading-none text-fg">cebu, ph</span>
              <span className="font-mono text-[10px] text-faint">{cebuTime || '—'}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal delay={0.05}>
            <p className="font-mono text-[12px] text-muted">
              <span className="text-accent">●</span> full stack developer
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.01em] text-fg sm:text-[3.6rem]">
              Rhazel <span className="italic text-accent">Alforque</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              I build clean, practical software with C#, ASP.NET Core, React and SQL, for real problems like
              booking, retail and public service. I love turning rough ideas into things people actually use.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12px] text-muted">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playTick(1000)}
                  className="underline decoration-transparent underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
                >
                  {l.label} ↗
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  soundManager.playSuccess();
                  onCopyEmail();
                }}
                aria-live="polite"
                className="inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-fg"
              >
                {copied ? (
                  <>
                    email copied <Check className="h-3 w-3 text-accent" />
                  </>
                ) : (
                  'copy email'
                )}
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* "now" block */}
      <Reveal delay={0.2}>
        <div className="mt-12 rounded-xl border border-line bg-surface/70 font-mono text-[12.5px] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[11px] text-faint">
            <span>rhazel@cebu: ~</span>
            <span>now.sh</span>
          </div>
          <div className="space-y-1.5 px-4 py-4 leading-relaxed">
            <p className="text-fg">
              <span className="text-accent">$</span> now
            </p>
            {NOW.map((line) => (
              <p key={line} className="text-muted">
                <span className="text-faint">→</span> {line}
              </p>
            ))}
            <p className="pt-1 text-fg">
              <span className="text-accent">$</span> <span className="caret" aria-hidden="true" />
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
