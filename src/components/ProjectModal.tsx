import { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Github, ArrowUpRight } from 'lucide-react';
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
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
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
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
              <span className="text-sm font-semibold text-muted">Case study</span>
              <button
                ref={closeRef}
                id="project-modal-close-btn"
                type="button"
                onClick={close}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] border border-line text-muted transition-colors hover:border-fg hover:text-fg"
                aria-label="Close case study"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-8 sm:px-8 sm:pt-10">
              <p className="text-sm text-muted">
                {project.category} project
                {project.year ? `, ${project.year}` : ''}
              </p>
              <h2
                id="project-modal-title"
                className="mt-2 text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl"
              >
                {project.title}
              </h2>
              <p className="mt-3 text-pretty text-lg leading-snug text-fg">{project.tagline}</p>

              {(project.liveUrl || project.githubUrl || project.sourceNote) && (
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  {project.liveUrl && (
                    <a
                      id={`modal-live-link-${project.id}`}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playTick(1100)}
                      className="btn btn-primary min-h-10 px-3.5 text-sm"
                    >
                      Open {hostname(project.liveUrl)}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      id={`modal-github-link-${project.id}`}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundManager.playTick(1000)}
                      className="btn btn-secondary min-h-10 px-3.5 text-sm"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      Source code
                    </a>
                  )}
                  {!project.githubUrl && project.sourceNote && (
                    <span className="text-sm text-muted">{project.sourceNote}</span>
                  )}
                </div>
              )}

              <dl className="mt-8 grid grid-cols-1 border-y border-line sm:grid-cols-2">
                <div className="py-4 sm:pr-6">
                  <dt className="text-sm text-muted">My role</dt>
                  <dd className="mt-1 text-[15px] font-semibold text-fg">{project.role}</dd>
                </div>
                <div className="border-t border-line py-4 sm:border-l sm:border-t-0 sm:pl-6">
                  <dt className="text-sm text-muted">Built with</dt>
                  <dd className="mt-1 text-[15px] font-semibold leading-snug text-fg">{project.technologies.join(', ')}</dd>
                </div>
              </dl>

              <Block title="Overview">
                <p>{project.description}</p>
              </Block>

              <Block title="The problem">
                <p>{project.problem}</p>
              </Block>

              <Block title="What I built">
                <p>{project.solution}</p>
              </Block>

              {project.proves && project.proves.length > 0 && (
                <Block title="What it shows">
                  <List items={project.proves} />
                </Block>
              )}

              <Block title="Features">
                <List items={project.features} />
              </Block>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h3 className="text-lg font-extrabold tracking-[-0.01em] text-fg">{title}</h3>
      <div className="mt-2.5 text-pretty text-[15px] leading-[1.65] text-fg">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.75em] h-px w-3 shrink-0 bg-fg" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
