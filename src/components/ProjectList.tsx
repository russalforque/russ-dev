import { ArrowUpRight, ArrowRight, Filter, X } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Section, { Em } from './ui/Section';
import Reveal from './ui/Reveal';

export interface ProjectsProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
}

export function hostname(url?: string) {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function LiveLink({ project }: { project: Project }) {
  if (!project.liveUrl) return null;
  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.stopPropagation();
        soundManager.playTick(1000);
      }}
      className="relative z-10 inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
      aria-label={`Open live site for ${project.title}`}
    >
      Live
      <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}

function FeaturedCard({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.35)]">
      {/* Visual header: oversized index + domain, no screenshots needed */}
      <div className="relative h-40 overflow-hidden border-b border-line bg-surface-2 sm:h-48">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="absolute -bottom-8 -right-2 font-serif text-[9rem] italic leading-none text-fg/[0.07] transition-colors duration-500 group-hover:text-accent/25 sm:text-[11rem]"
        >
          {project.number}
        </span>
        <div className="absolute left-5 right-5 top-5 flex items-center gap-2 font-mono text-[11px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="truncate">{project.systemType}</span>
        </div>
        {project.liveUrl && (
          <div className="absolute bottom-5 left-5 font-mono text-[11px] text-faint">{hostname(project.liveUrl)}</div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg sm:text-2xl">
          <button
            type="button"
            onClick={onSelect}
            className="cursor-pointer text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-fg">
            Case study
            <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
          </span>
          <LiveLink project={project} />
        </div>
      </div>
    </article>
  );
}

function IndexRow({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <li className="group relative">
      <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 transition-colors sm:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] sm:gap-x-6">
        <span className="font-mono text-xs text-faint transition-colors group-hover:text-accent">
          {project.number}
        </span>
        <h3 className="text-base font-semibold tracking-[-0.01em] text-fg sm:text-lg">
          <button
            type="button"
            onClick={onSelect}
            className="cursor-pointer text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
              {project.title}
            </span>
          </button>
        </h3>
        <p className="col-start-2 text-sm leading-relaxed text-muted sm:col-start-auto">{project.tagline}</p>
        <div className="col-start-3 row-start-1 flex justify-end sm:col-start-auto sm:row-start-auto">
          {project.liveUrl ? (
            <LiveLink project={project} />
          ) : (
            <ArrowRight className="h-4 w-4 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-fg" />
          )}
        </div>
      </div>
    </li>
  );
}

export default function ProjectList({
  projects,
  onSelectProject,
  selectedTechFilter,
  onClearTechFilter,
}: ProjectsProps) {
  const filtered = selectedTechFilter
    ? projects.filter((p) => p.technologies.some((t) => t.toLowerCase() === selectedTechFilter.toLowerCase()))
    : projects;

  // When filtering, show a flat list; otherwise split featured from the archive.
  const featured = selectedTechFilter ? [] : filtered.filter((p) => p.featured);
  const rest = selectedTechFilter ? filtered : filtered.filter((p) => !p.featured);

  const select = (project: Project) => {
    soundManager.playTick(1000);
    onSelectProject?.(project);
  };

  const clear = () => {
    soundManager.playTick(900);
    onClearTechFilter?.();
  };

  return (
    <Section
      id="projects"
      index="01"
      label="Work"
      title={
        <>
          Selected <Em>work</Em>
        </>
      }
      intro="Web applications and systems I've designed and built — from offline-first retail software to public-service platforms. Open any project for the full case study."
      aside={<span className="font-mono text-xs text-muted">{filtered.length} projects</span>}
    >
      {selectedTechFilter && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm">
          <span className="flex items-center gap-2 text-muted">
            <Filter className="h-4 w-4 text-accent" />
            Built with <strong className="font-mono font-medium text-fg">{selectedTechFilter}</strong>
          </span>
          <button
            type="button"
            onClick={clear}
            className="inline-flex cursor-pointer items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-fg"
          >
            Clear <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
          <p className="text-sm text-muted">No projects tagged with “{selectedTechFilter}” yet.</p>
          <button
            type="button"
            onClick={clear}
            className="mt-4 inline-flex h-10 cursor-pointer items-center rounded-full bg-fg px-4 text-sm font-medium text-bg"
          >
            View all projects
          </button>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {featured.map((project, i) => (
                <Reveal key={project.id} delay={(i % 2) * 0.08} className="h-full">
                  <FeaturedCard project={project} onSelect={() => select(project)} />
                </Reveal>
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <Reveal className={featured.length > 0 ? 'mt-16' : ''}>
              {featured.length > 0 && (
                <div className="mb-2 flex items-center justify-between">
                  <span className="eyebrow">Archive</span>
                  <span className="font-mono text-[11px] text-faint">{rest.length} more</span>
                </div>
              )}
              <ul className="divide-y divide-line border-y border-line">
                {rest.map((project) => (
                  <IndexRow key={project.id} project={project} onSelect={() => select(project)} />
                ))}
              </ul>
            </Reveal>
          )}
        </>
      )}
    </Section>
  );
}
