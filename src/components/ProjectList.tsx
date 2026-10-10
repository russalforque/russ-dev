import { ArrowUpRight, Download, X } from 'lucide-react';
import type { Decision, Layer, Project } from '../data/portfolioData';
import Section from './ui/Section';

export interface ProjectsProps {
  projects: Project[];
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
}

export function usesTech(project: Project, tech: string) {
  return project.technologies.some((t) => t.toLowerCase() === tech.toLowerCase());
}

function visibleProjects(projects: Project[], filter?: string | null) {
  return filter ? projects.filter((p) => usesTech(p, filter)) : projects;
}

function ExternalLink({ href, label, children }: { href: string; label?: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1" aria-label={label}>
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}

/** Live, source and any extra links, shared by the write-ups and the list rows. */
function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.liveUrl && (
        <ExternalLink href={project.liveUrl} label={`Live demo of ${project.title}`}>
          Live demo
        </ExternalLink>
      )}
      {project.githubUrl && (
        <ExternalLink href={project.githubUrl} label={`Source code of ${project.title}`}>
          Source code
        </ExternalLink>
      )}
      {project.links?.map((link) => (
        <ExternalLink key={link.href} href={link.href}>
          {link.label}
        </ExternalLink>
      ))}
      {!project.githubUrl && project.sourceNote && <span className="text-muted">{project.sourceNote}</span>}
    </>
  );
}

/** The system drawn as a stack: user interface at the top, storage at the bottom. */
function LayerStack({ layers }: { layers: Layer[] }) {
  return (
    <ol className="rounded-[4px] border border-line-strong">
      {layers.map((layer) => (
        <li key={layer.name} className="border-t border-line-strong px-3.5 py-3 first:border-t-0">
          <span className="block text-[15px] font-semibold leading-snug text-fg">{layer.name}</span>
          <span className="mt-0.5 block text-sm leading-relaxed text-muted">{layer.detail}</span>
        </li>
      ))}
    </ol>
  );
}

function DecisionList({ decisions }: { decisions: Decision[] }) {
  return (
    <ul className="space-y-5">
      {decisions.map((decision) => (
        <li key={decision.title}>
          <p className="text-base font-bold leading-snug text-fg">{decision.title}</p>
          <p className="mt-1 text-pretty text-[15px] leading-relaxed text-fg">{decision.detail}</p>
          {decision.codeHref && decision.codeLabel && (
            <a
              href={decision.codeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-1.5 inline-flex max-w-full items-center gap-1 font-mono text-[13px]"
              aria-label={`${decision.title}: open ${decision.codeLabel} on GitHub`}
            >
              <span className="truncate">{decision.codeLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
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

function WriteUp({ project }: { project: Project }) {
  const hasBackground = project.description || project.problem || project.solution || project.features?.length;

  return (
    <article id={project.id} className="scroll-mt-24 border-t border-line py-10 first:border-t-0 first:pt-0 last:pb-0">
      {project.image && (
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="mb-7 w-full rounded-[4px] border border-line"
        />
      )}

      <h3 className="text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-fg sm:text-[2rem]">
        {project.title}
      </h3>
      <p className="mt-2 max-w-2xl text-pretty text-[17px] leading-snug text-fg">{project.tagline}</p>
      <p className="mt-2 text-sm text-muted">
        {project.role}
        {project.year ? `, ${project.year}` : ''}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-[15px]">
        {project.download && (
          <a href={project.download.href} className="btn btn-primary min-h-10 px-3.5 text-sm">
            <Download className="h-4 w-4" aria-hidden="true" />
            {project.download.label}
          </a>
        )}
        <ProjectLinks project={project} />
      </div>
      {project.download && <p className="mt-2 text-sm text-muted">{project.download.meta}</p>}
      {project.caveat && (
        <p className="mt-4 max-w-2xl border-l-2 border-fg pl-3 text-sm leading-relaxed text-fg">{project.caveat}</p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        {project.architecture && project.architecture.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-semibold text-fg">How it is built</h4>
            <LayerStack layers={project.architecture} />
          </div>
        )}
        {project.decisions && project.decisions.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-semibold text-fg">Decisions</h4>
            <DecisionList decisions={project.decisions} />
          </div>
        )}
      </div>

      <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Built with">
        {project.technologies.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>

      {hasBackground && (
        <details className="group mt-6 border-t border-line pt-4">
          <summary className="cursor-pointer text-[15px] font-semibold text-fg underline decoration-line-strong decoration-1 underline-offset-4 hover:decoration-fg">
            Problem, approach and features
          </summary>
          <div className="mt-5 max-w-2xl space-y-6 text-pretty text-[15px] leading-[1.65] text-fg">
            {project.description && <p>{project.description}</p>}
            {project.problem && (
              <div>
                <h4 className="font-bold">The problem</h4>
                <p className="mt-1.5">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <h4 className="font-bold">What I built</h4>
                <p className="mt-1.5">{project.solution}</p>
              </div>
            )}
            {project.features && project.features.length > 0 && (
              <div>
                <h4 className="mb-2 font-bold">Features</h4>
                <BulletList items={project.features} />
              </div>
            )}
          </div>
        </details>
      )}
    </article>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <li
      id={project.id}
      className="grid scroll-mt-24 grid-cols-1 gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_13.5rem] md:items-baseline"
    >
      <div>
        <h3 className="text-lg font-bold leading-snug tracking-[-0.01em] text-fg">{project.title}</h3>
        <p className="mt-1 text-[15px] leading-relaxed text-muted">{project.tagline}</p>
      </div>
      <p className="text-sm leading-relaxed text-muted">{project.technologies.join(', ')}</p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm md:justify-end">
        <ProjectLinks project={project} />
      </div>
    </li>
  );
}

/** Engineering write-ups for the featured projects. A skill filter narrows them in place. */
export default function ProjectList({ projects, selectedTechFilter, onClearTechFilter }: ProjectsProps) {
  const featured = visibleProjects(projects, selectedTechFilter).filter((p) => p.featured);

  return (
    <Section
      id="projects"
      title="Selected work"
      note="How each system is put together, and where to read the code."
      aside={
        featured.length > 1 && (
          <nav aria-label="Selected work" className="mt-4">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm lg:block lg:space-y-1.5 lg:border-l lg:border-line lg:pl-3">
              {featured.map((project) => (
                <li key={project.id}>
                  <a href={`#${project.id}`} className="text-muted underline decoration-line-strong underline-offset-4 hover:text-fg lg:no-underline lg:hover:underline">
                    {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )
      }
    >
      {selectedTechFilter && (
        <div
          role="status"
          className="mb-9 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5"
        >
          <p className="text-[15px] text-fg">
            Showing projects built with <mark>{selectedTechFilter}</mark>
          </p>
          <button type="button" onClick={onClearTechFilter} className="btn btn-secondary min-h-10 px-3 text-sm">
            <X className="h-4 w-4" aria-hidden="true" />
            Show all work
          </button>
        </div>
      )}

      {featured.length === 0 ? (
        <p className="text-[15px] text-muted">
          No featured project uses {selectedTechFilter}. The matching builds are listed under{' '}
          <a href="#more-projects" className="link">
            More projects
          </a>
          .
        </p>
      ) : (
        // Wrapped so the first write-up is a first child and drops its top rule, with or without the filter banner.
        <div>
          {featured.map((project) => (
            <WriteUp key={project.id} project={project} />
          ))}
        </div>
      )}
    </Section>
  );
}

/** Everything that is not featured, as a compact list. */
export function ProjectArchive({ projects, selectedTechFilter }: ProjectsProps) {
  const rest = visibleProjects(projects, selectedTechFilter).filter((p) => !p.featured);
  if (rest.length === 0) return null;

  return (
    <Section id="more-projects" title="More projects" note="Smaller builds and front-end practice pieces.">
      <ul className="-mt-5 divide-y divide-line">
        {rest.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ul>
    </Section>
  );
}
