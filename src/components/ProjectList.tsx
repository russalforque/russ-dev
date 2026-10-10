import { ArrowUpRight, X } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Section from './ui/Section';

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

function usesTech(project: Project, tech: string) {
  return project.technologies.some((t) => t.toLowerCase() === tech.toLowerCase());
}

/** Live and source links, shared by the featured blocks and the list rows. */
function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-flex items-center gap-1"
          aria-label={`Live demo of ${project.title}`}
        >
          Live demo
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-flex items-center gap-1"
          aria-label={`Source code of ${project.title}`}
        >
          Source code
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
      {!project.githubUrl && project.sourceNote && <span className="text-muted">{project.sourceNote}</span>}
    </>
  );
}

function FeaturedProject({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <article className="border-t border-line py-9 first:border-t-0 first:pt-0 last:pb-0">
      {project.image && (
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="mb-7 w-full rounded-[4px] border border-line"
        />
      )}

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div>
          <h3 className="text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-fg">{project.title}</h3>
          <p className="mt-2 text-pretty text-[17px] leading-snug text-fg">{project.tagline}</p>
          <p className="mt-3 text-sm text-muted">
            {project.role}
            {project.year ? `, ${project.year}` : ''}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
            <ProjectLinks project={project} />
          </div>
          <button type="button" onClick={onSelect} className="btn btn-secondary mt-5 min-h-10 px-3.5 text-sm">
            Read the case study
          </button>
        </div>

        <div>
          {project.proves && project.proves.length > 0 && (
            <>
              <h4 className="text-sm font-semibold text-fg">What it shows</h4>
              <ul className="mt-3 space-y-2.5">
                {project.proves.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-fg">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-fg" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </>
          )}

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
            {project.technologies.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ProjectRow({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <li className="grid grid-cols-1 gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_13.5rem] md:items-baseline">
      <div>
        <h3 className="text-lg font-bold leading-snug tracking-[-0.01em] text-fg">
          <button
            type="button"
            onClick={onSelect}
            className="cursor-pointer text-left underline decoration-line-strong decoration-1 underline-offset-4 hover:decoration-fg hover:decoration-2"
            aria-label={`${project.title}, read the case study`}
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-muted">{project.tagline}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted">{project.technologies.join(', ')}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm md:justify-end">
        <ProjectLinks project={project} />
      </div>
    </li>
  );
}

/** Featured work, or every project that uses the skill picked in the Skills section. */
export default function ProjectList({ projects, onSelectProject, selectedTechFilter, onClearTechFilter }: ProjectsProps) {
  const select = (project: Project) => {
    soundManager.playTick(1000);
    onSelectProject?.(project);
  };

  if (selectedTechFilter) {
    const matches = projects.filter((p) => usesTech(p, selectedTechFilter));
    return (
      <Section
        id="projects"
        title="Work"
        note={`${matches.length} ${matches.length === 1 ? 'project uses' : 'projects use'} ${selectedTechFilter}.`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-[15px] text-fg">
            Showing projects built with <mark>{selectedTechFilter}</mark>
          </p>
          <button
            type="button"
            onClick={() => {
              soundManager.playTick(900);
              onClearTechFilter?.();
            }}
            className="btn btn-secondary min-h-10 px-3 text-sm"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Show all work
          </button>
        </div>
        <ul className="divide-y divide-line">
          {matches.map((project) => (
            <ProjectRow key={project.id} project={project} onSelect={() => select(project)} />
          ))}
        </ul>
      </Section>
    );
  }

  const featured = projects.filter((p) => p.featured);

  return (
    <Section id="projects" title="Selected work" note="Business systems I built end to end.">
      {featured.map((project) => (
        <FeaturedProject key={project.id} project={project} onSelect={() => select(project)} />
      ))}
    </Section>
  );
}

/** Everything that is not featured. Hidden while a skill filter is active. */
export function ProjectArchive({ projects, onSelectProject, selectedTechFilter }: ProjectsProps) {
  const rest = projects.filter((p) => !p.featured);
  if (selectedTechFilter || rest.length === 0) return null;

  return (
    <Section id="more-projects" title="More projects" note="Smaller builds and front-end practice pieces.">
      <ul className="-mt-5 divide-y divide-line">
        {rest.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            onSelect={() => {
              soundManager.playTick(1000);
              onSelectProject?.(project);
            }}
          />
        ))}
      </ul>
    </Section>
  );
}
