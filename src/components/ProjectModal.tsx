import { useEffect } from 'react';
import { 
  X, 
  Github, 
  Cpu, 
  ShieldCheck, 
  BarChart2,
  ArrowUpRight
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playTick(800);
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
      onClick={() => {
        soundManager.playTick(800);
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Modal Main Frame with Hero Pixel Borders & Shadow */}
      <div
        id="project-modal-card"
        className="relative w-full max-w-3xl rounded-none border-2 sm:border-4 border-neutral-950 dark:border-neutral-100 bg-white dark:bg-neutral-950 p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(16,185,129,1)] sm:shadow-[8px_8px_0px_0px_rgba(16,185,129,1)] transition-all my-6 max-h-[90vh] overflow-y-auto text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pixel Accent Corners (Matching Hero Avatar) */}
        <span className="absolute -top-2 -left-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 z-30 pointer-events-none" />
        <span className="absolute -top-2 -right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 z-30 pointer-events-none" />
        <span className="absolute -bottom-2 -left-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 z-30 pointer-events-none" />
        <span className="absolute -bottom-2 -right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 z-30 pointer-events-none" />

        {/* Top Close Button (Chunky Retro Style) */}
        <button
          id="project-modal-close-btn"
          type="button"
          onClick={() => {
            soundManager.playTick(800);
            onClose();
          }}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 border-2 border-neutral-900 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer z-10"
          aria-label="Close project modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header & Telemetry */}
        <div className="space-y-2 pb-5 border-b border-neutral-200 dark:border-neutral-800 pr-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {/* Telemetry Status Beacon */}
            <div className="inline-flex items-center gap-1.5 border border-emerald-500/50 bg-emerald-500/10 dark:bg-emerald-950/40 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-400 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.3)] select-none">
              <span className="h-1.5 w-1.5 bg-emerald-500" />
              <span className="font-semibold tracking-wider uppercase text-[10px]">
                SYS_ID: {project.number || project.id}
              </span>
            </div>

            <span className="text-neutral-400 dark:text-neutral-600 select-none">/</span>

            <span className="text-neutral-600 dark:text-neutral-400 uppercase tracking-wider text-[11px]">
              {project.category}
            </span>
          </div>

          <h2 id="project-modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white wrap-break-word">
            {project.title}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400">
            {project.tagline}
          </p>
        </div>

        {/* Modal Body Content */}
        <div className="space-y-6 pt-5">
          {/* Tech Stack Terminal Banner */}
          <div className="border-2 border-neutral-900 dark:border-neutral-800 bg-neutral-950 p-4 text-white space-y-3 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.5)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500" />
                <span className="text-xs font-mono text-neutral-400">
                  terminal://{project.id}.manifest
                </span>
              </div>
              {project.highlights && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 uppercase tracking-wider">
                  {project.highlights}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-xs font-mono px-2 py-0.5 bg-neutral-900 text-neutral-200 border border-neutral-700">
                  {tech}
                </span>
              ))}
            </div>

            <div className="text-xs font-mono text-neutral-400 pt-1">
              <span className="text-neutral-500">// Engineering Role: </span>
              <span className="text-emerald-400 font-medium">{project.role}</span>
            </div>
          </div>

          {/* Overview Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              // System Summary
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider">
                <Cpu className="h-3.5 w-3.5 text-neutral-400" />
                <span>The Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-mono">
                {project.problem}
              </p>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-mono">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Performance & Operational Metrics (if available) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                <BarChart2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>// Performance &amp; Operational Metrics</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="group relative p-4 border border-neutral-200/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/40 backdrop-blur-xs hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xs transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                        {m.label}
                      </span>
                    </div>
                    <div className="text-lg font-mono font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      {m.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              // Core Specifications
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 bg-emerald-500 shrink-0 mt-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Links Bar (Neo-Brutalist Pixel Buttons) */}
        <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800">
          {project.liveUrl && (
            <a
              id={`modal-live-link-${project.id}`}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTick(1100)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium border-2 border-neutral-900 dark:border-neutral-100 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-[3px_3px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(16,185,129,1)] transition-all"
            >
              <span>Live Demonstration</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              id={`modal-github-link-${project.id}`}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTick(1000)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:border-neutral-900 dark:hover:border-neutral-300 hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Source Repository</span>
            </a>
          )}

          {project.figmaUrl && (
            <a
              id={`modal-figma-link-${project.id}`}
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTick(1000)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 text-neutral-700 dark:text-neutral-300 hover:border-emerald-500 transition-colors"
            >
              <span>Prototype</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {/* Close Esc Link */}
          <button
            id="modal-close-bottom-btn"
            type="button"
            onClick={() => {
              soundManager.playTick(800);
              onClose();
            }}
            className="ml-auto text-xs font-mono text-neutral-400 hover:text-neutral-950 dark:hover:text-white px-2 py-1.5 transition-colors cursor-pointer"
          >
            [ESC to Close]
          </button>
        </div>

      </div>
    </div>
  );
}