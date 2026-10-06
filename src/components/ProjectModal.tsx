import { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Github, ArrowUpRight, Figma } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { hostname } from './ProjectList';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playTick(800);
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  const close = () => {
    soundManager.playTick(800);
    onClose();
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <motion.div
            id="project-modal-backdrop"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />

          <motion.aside
            id="project-modal-card"
            className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col border-l border-line bg-bg shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
          >
            {/* Sheet header */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
              <span className="eyebrow">
                <span className="text-accent">{project.number}</span> / Case study
              </span>
              <button
                ref={closeRef}
                id="project-modal-close-btn"
                type="button"
                onClick={close}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                aria-label="Close case study"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-8 sm:px-8 sm:pt-10">
              <p className="font-mono text-xs text-muted">{project.systemType}</p>
              <h2
                id="project-modal-title"
                className="mt-3 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-fg sm:text-4xl"
              >
                {project.title}
              </h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-muted">{project.tagline}</p>

              {/* Links */}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {project.liveUrl && (
                  <a
                    id={`modal-live-link-${project.id}`}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playTick(1100)}
                    className="group inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-medium text-bg"
                  >
                    Visit {hostname(project.liveUrl)}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    id={`modal-github-link-${project.id}`}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playTick(1000)}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:border-fg"
                  >
                    <Github className="h-4 w-4" />
                    Source
                  </a>
                )}
                {project.figmaUrl && (
                  <a
                    id={`modal-figma-link-${project.id}`}
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playTick(1000)}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:border-fg"
                  >
                    <Figma className="h-4 w-4" />
                    Prototype
                  </a>
                )}
              </div>

              {/* Meta */}
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {[
                  { k: 'Role', v: project.role },
                  { k: 'Category', v: project.category },
                ].map((m) => (
                  <div key={m.k} className="bg-surface p-4">
                    <dt className="eyebrow">{m.k}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-fg">{m.v}</dd>
                  </div>
                ))}
              </dl>

              <Block title="Overview">
                <p>{project.description}</p>
              </Block>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-line p-5">
                  <h3 className="eyebrow">The problem</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{project.problem}</p>
                </div>
                <div className="rounded-xl border border-accent/30 bg-accent-soft p-5">
                  <h3 className="eyebrow text-accent">The solution</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg/80">{project.solution}</p>
                </div>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <Block title="At a glance">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-line bg-surface p-4">
                        <div className="text-base font-semibold tracking-tight text-fg">{m.value}</div>
                        <div className="mt-1 font-mono text-[11px] text-muted">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </Block>
              )}

              <Block title="What it does">
                <ul className="divide-y divide-line border-y border-line">
                  {project.features.map((feature, idx) => (
                    <li key={feature} className="flex gap-4 py-3 text-sm leading-relaxed text-fg/85">
                      <span className="w-6 shrink-0 font-mono text-[11px] leading-6 text-faint">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Block>

              {project.technologies.length > 0 && (
                <Block title="Built with">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </Block>
              )}

              {project.highlights && (
                <blockquote className="mt-12 border-l-2 border-accent pl-5 font-serif text-xl italic leading-snug text-fg sm:text-2xl">
                  {project.highlights}
                </blockquote>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h3 className="eyebrow mb-4">{title}</h3>
      <div className="text-pretty text-[15px] leading-relaxed text-fg/85">{children}</div>
    </section>
  );
}
