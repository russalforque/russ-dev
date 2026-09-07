import { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Copy, 
  Check, 
  FileText, 
  Clock, 
  MapPin, 
  Server, 
  Cpu, 
  Award
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { ActiveViewer } from '../utils/presence';

interface HeroProps {
  onCopyEmail: () => void;
  copied: boolean;
  onOpenResumeModal: () => void;
  onOpenTerminal: () => void;
  onlineCount: number;
  activeViewers: ActiveViewer[];
  onOpenVisitorsModal: () => void;
}

interface CapabilityMetric {
  icon: typeof Server;
  label: string;
  value: string;
  badge?: string;
}

const CAPABILITY_METRICS: CapabilityMetric[] = [
  {
    icon: Cpu,
    label: 'Primary Focus',
    value: 'Full-Stack Development',
    badge: 'C# / React',
  },
  {
    icon: Server,
    label: 'Core Backend',
    value: 'ASP.NET Core & SQL',
    badge: 'Web API / EF Core',
  },
  {
    icon: Award,
    label: 'Certifications',
    value: '4 Cloud Credentials',
    badge: 'Docker / K8s',
  },
];

export default function Hero({
  onCopyEmail,
  copied,
  onOpenResumeModal,
}: HeroProps) {
  const [cebuTime, setCebuTime] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>('/assets/profile.jpg');

  // Cebu City (Asia/Manila: UTC+8) Live Clock
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const updateTime = () => setCebuTime(formatter.format(new Date()));
    updateTime();

    const interval = setInterval(updateTime, 1000 * 30); // updates every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero-section" 
      aria-label="Developer Introduction"
      className="pt-8 pb-14 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950"
    >
      <div className="space-y-10 sm:space-y-12">
        
  {/* TOP STATUS & LOCATION BAR */}
  <header className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400 pb-4 border-b border-neutral-200 dark:border-neutral-800">
    {/* Availability Status Badge */}
    <div 
      role="status" 
      aria-label="Availability status: Open to opportunities"
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-medium"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="tracking-wide uppercase text-[10px]">OPEN FOR JUNIOR .NET / FULL-STACK ROLES</span>
    </div>
  </header>

  {/* MAIN IDENTITY ROW (2 COLUMNS: IMAGE LEFT, BIO RIGHT) */}
  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
    
    {/* Profile Portrait (Column 1: Left & Bigger) */}
    <div className="relative shrink-0 w-52 sm:w-64 md:w-72 lg:w-80 mx-auto md:mx-0">
      <div className="aspect-[4/5] w-full rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 overflow-hidden shadow-xs">
        <img
          src={imgSrc}
          alt={`${portfolioData.name}'s portrait`}
          loading="eager"
          onError={() => setImgSrc('/assets/profile-fallback.jpg')}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>

    {/* Headline & Bio (Column 2: Right) */}
    <div className="space-y-4 flex-1 text-left">
      <div className="space-y-1.5">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          {portfolioData.name}
        </h1>

        <p className="text-sm sm:text-base font-mono font-semibold text-neutral-700 dark:text-neutral-300">
          Full Stack Developer <span className="text-neutral-400 font-normal">/</span> Junior .NET Developer
        </p>
      </div>

      <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal max-w-xl">
        I’m a full-stack developer who enjoys turning real-world problems into practical solutions.
      </p>
      <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal max-w-xl">
        Right now, I’m building things that make people’s work easier. I love taking rough ideas and turning them into products people can actually use.
      </p>

      {/* Quick Action Buttons */}
      <div className="pt-2 flex flex-wrap items-center gap-2.5">
        <a
          href="/assets/Rhazel Avenido Alforque Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            soundManager.playTick(1000);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>View Resume</span>
        </a>

        <button
          type="button"
          onClick={() => {
            soundManager.playTick(900);
            onCopyEmail();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Copy Email Address"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-neutral-950 dark:text-white" />
              <span>Email Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>
    </div>

  </div>

  {/* CORE CAPABILITY METRICS */}
  <div 
    aria-label="Core Competencies" 
    className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono"
  >
    {CAPABILITY_METRICS.map((metric, idx) => {
      const Icon = metric.icon;
      return (
        <div 
          key={idx}
          className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 space-y-1"
        >
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                {metric.label}
              </span>
            </div>
            {metric.badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400">
                {metric.badge}
              </span>
            )}
          </div>
          <div className="text-neutral-950 dark:text-white font-bold text-xs sm:text-sm">
            {metric.value}
          </div>
        </div>
      );
    })}
  </div>

  {/* SOCIAL LINKS TOOLBAR */}
  <div className="pt-1 flex items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
    <a
      id="hero-link-github"
      href={portfolioData.github}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => soundManager.playTick(1000)}
      className="inline-flex items-center gap-1 hover:text-neutral-950 dark:hover:text-white underline underline-offset-2 transition-colors"
    >
      <span>GitHub</span>
      <ArrowUpRight className="h-3 w-3" />
    </a>

    <span className="text-neutral-300 dark:text-neutral-700 select-none">/</span>

    <a
      id="hero-link-linkedin"
      href={portfolioData.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => soundManager.playTick(1000)}
      className="inline-flex items-center gap-1 hover:text-neutral-950 dark:hover:text-white underline underline-offset-2 transition-colors"
    >
      <span>LinkedIn</span>
      <ArrowUpRight className="h-3 w-3" />
    </a>
  </div>

</div>
    </section>
  );
}