import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Copy, Check, FileText, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { RESUME_URL } from '../utils/resume';
import { ActiveViewer } from '../utils/presence';

interface HeroProps {
  onCopyEmail: () => void;
  copied: boolean;
  onOpenTerminal: () => void;
  onlineCount: number;
  activeViewers: ActiveViewer[];
  onOpenVisitorsModal: () => void;
}

/** Live HH:MM clock for Cebu (Asia/Manila, UTC+8) */
function useCebuTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = setInterval(update, 1000 * 15);
    return () => clearInterval(interval);
  }, []);
  return time;
}

const firstYear = Math.min(...portfolioData.experience.map((e) => Number(e.year)).filter(Boolean));

const STATS = [
  { value: String(portfolioData.projects.length).padStart(2, '0'), label: 'Projects shipped' },
  { value: String(portfolioData.certifications.length).padStart(2, '0'), label: 'Cloud & DevOps certs' },
  { value: `${firstYear}`, label: 'Building since' },
  { value: '.NET + React', label: 'Core stack' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Hero({ onCopyEmail, copied }: HeroProps) {
  const cebuTime = useCebuTime();
  const [imgSrc, setImgSrc] = useState('/assets/profile.jpg');

  return (
    <section id="hero-section" aria-label="Introduction" className="relative isolate overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true" />

      <motion.div
        className="container-page pb-16 pt-12 sm:pb-24 sm:pt-20"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
      >
        {/* Status row */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <span
            role="status"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-fg shadow-[0_1px_0_rgba(0,0,0,0.03)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to Junior .NET &amp; Full-Stack roles
          </span>
          <span className="font-mono text-xs text-muted">
            {portfolioData.location} · {cebuTime || '--:--'} UTC+8
          </span>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 items-end gap-12 lg:mt-16 lg:grid-cols-12">
          {/* Statement */}
          <div className="lg:col-span-8">
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-sm text-muted"
            >
              Rhazel Alforque <span className="text-faint">—</span> Full Stack Developer
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-balance text-[clamp(2.5rem,6.6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg"
            >
              I turn rough ideas into{' '}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">software</span>{' '}
              people actually use.
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              Full-stack developer working across C#, ASP.NET Core, React and SQL — building clean,
              practical applications for real business problems, from booking systems to offline-first
              point of sale.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTick(1000)}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                <FileText className="h-4 w-4" />
                View résumé
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSuccess();
                  onCopyEmail();
                }}
                className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-sm font-medium text-fg transition-colors hover:border-fg"
                aria-live="polite"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-muted" />}
                {copied ? 'Email copied' : 'Copy email'}
              </button>

              <div className="ml-1 flex items-center gap-1">
                <a
                  href={portfolioData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playTick(1000)}
                  aria-label="GitHub profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  <Github className="h-4.5 w-4.5" />
                </a>
                <a
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playTick(1000)}
                  aria-label="LinkedIn profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.figure
            variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-60 sm:max-w-75 lg:col-span-4 lg:mx-0 lg:ml-auto"
          >
            <div className="relative rotate-[1.5deg] rounded-[22px] border border-line bg-surface p-2.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:rotate-0">
              <div className="aspect-4/5 overflow-hidden rounded-[14px] bg-surface-2">
                <img
                  src={imgSrc}
                  alt="Portrait of Rhazel Alforque"
                  loading="eager"
                  onError={() => setImgSrc('/assets/profile-fallback.jpg')}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between px-1.5 pb-0.5 pt-2.5 font-mono text-[11px] text-muted">
                <span>Rhazel A.</span>
                <span>BSIT · Cebu, PH</span>
              </figcaption>
            </div>
          </motion.figure>
        </div>

        {/* Stats strip */}
        <motion.dl
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 lg:grid-cols-4"
          style={{ gap: '1px' }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex min-w-0 flex-col gap-1 bg-bg/95 p-4 sm:p-6">
              <dt className="eyebrow order-2">{stat.label}</dt>
              <dd className="order-1 text-xl font-semibold tracking-[-0.03em] text-fg min-[400px]:text-2xl sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
