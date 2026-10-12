import { X } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Section, { AllLink, PageHeader } from './ui/Section';
import Reveal from './ui/Reveal';

export interface ProjectsProps {
  projects: Project[];
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
  /** "preview" shows featured work on the home page; "page" is the full /projects list */
  mode?: 'preview' | 'page';
}

/** Where a project row leads: the live site, else its source, else the prototype. */
export function projectLink(project: Project): { href: string; label: string } | null {
  if (project.liveUrl) return { href: project.liveUrl, label: 'live' };
  if (project.githubUrl) return { href: project.githubUrl, label: 'github' };
  if (project.figmaUrl) return { href: project.figmaUrl, label: 'figma' };
  return null;
}

function ProjectRow({ project }: { project: Project }) {
  const link = projectLink(project);

  const body = (
    <>
      <div className="min-w-0">
        <h3 className="flex items-center gap-2 text-[15px] font-medium text-fg">
          <span className="truncate transition-colors group-hover:text-accent">{project.title}</span>
          {project.featured && (
            <span className="shrink-0 font-mono text-[11px] text-accent" title="Featured project">
              ★
            </span>
          )}
        </h3>
        <p className="mt-1 truncate text-sm text-muted">{project.tagline}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3 font-mono text-[12px] text-faint">
        {link && <span className="transition-colors group-hover:text-fg">{link.label} ↗</span>}
        <span>#{project.number}</span>
      </div>
    </>
  );

  const rowClass = 'group flex items-baseline justify-between gap-6 py-5';

  return (
    <li>
      {link ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playTick(1000)}
          aria-label={`${project.title}: open ${link.label === 'live' ? 'live site' : link.label} in a new tab`}
          className={`${rowClass} transition-colors hover:bg-accent-soft`}
        >
          {body}
        </a>
      ) : (
        <div className={rowClass}>{body}</div>
      )}
    </li>
  );
}

export default function ProjectList({
  projects,
  selectedTechFilter,
  onClearTechFilter,
  mode = 'page',
}: ProjectsProps) {
  const activeFilter = mode === 'page' ? selectedTechFilter : null;
  const filtered = activeFilter
    ? projects.filter((p) => p.technologies.some((t) => t.toLowerCase() === activeFilter.toLowerCase()))
    : projects;

  // Featured work first, then the rest in their original order.
  const ordered = [...filtered.filter((p) => p.featured), ...filtered.filter((p) => !p.featured)];
  const shown = mode === 'preview' ? ordered.slice(0, 4) : ordered;

  const clear = () => {
    soundManager.playTick(900);
    onClearTechFilter?.();
  };

  const content = (
    <>
      {activeFilter && (
        <div className="mb-6 flex items-center justify-between gap-3 font-mono text-[12px] text-muted">
          <span>
            built with <strong className="font-medium text-fg">{activeFilter}</strong>
          </span>
          <button
            type="button"
            onClick={clear}
            className="inline-flex cursor-pointer items-center gap-1 uppercase tracking-wider transition-colors hover:text-fg"
          >
            clear <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <Reveal>
        {shown.length === 0 ? (
          <div className="border-y border-line py-10 text-center">
            <p className="text-sm text-muted">No projects tagged with “{activeFilter}” yet.</p>
            <button
              type="button"
              onClick={clear}
              className="mt-3 cursor-pointer font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-fg"
            >
              view all projects →
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {shown.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </ul>
        )}
      </Reveal>
    </>
  );

  if (mode === 'preview') {
    return (
      <Section id="projects" index="01" label="projects" aside={<AllLink to="/projects">all {projects.length} projects</AllLink>}>
        {content}
      </Section>
    );
  }

  return (
    <div id="projects" className="relative">
      <PageHeader
        title="Projects"
        count={`${filtered.length} total`}
        intro="Web apps and systems I've designed and built, from offline-first retail software to public-service platforms. Each one opens the live site in a new tab."
      />
      <div className="pb-14">{content}</div>
    </div>
  );
}
