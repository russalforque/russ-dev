import { ArrowUpRight, Filter, X, Github } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

export interface ProjectsProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
}

export default function ProjectList({
  projects,
  selectedTechFilter,
  onClearTechFilter,
}: ProjectsProps) {
  // Filter projects by selected technology if active
  const displayedProjects = selectedTechFilter
    ? projects.filter((p) =>
        p.technologies.some((t) => t.toLowerCase() === selectedTechFilter.toLowerCase())
      )
    : projects;

  return (
    <section 
      id="projects" 
      aria-label="Featured Projects"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full border-t border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950"
    >
      <div className="space-y-10 sm:space-y-12">
        
        {/* HEADER */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 dark:text-white font-mono lowercase">
              projects
            </h2>
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
              {displayedProjects.length} {displayedProjects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-2xl">
            A selection of web applications and software systems I have designed and built — focusing on intuitive interfaces and dependable backends.
          </p>
        </div>

        {/* ACTIVE FILTER BANNER */}
        {selectedTechFilter && (
          <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <Filter className="h-3.5 w-3.5 text-neutral-950 dark:text-white" />
              <span>Filtered by tool:</span>
              <strong className="px-2 py-0.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white font-mono">
                {selectedTechFilter}
              </strong>
            </div>

            {onClearTechFilter && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTick(900);
                  onClearTechFilter();
                }}
                className="inline-flex items-center gap-1 font-mono text-neutral-500 hover:text-neutral-950 dark:hover:text-white cursor-pointer transition-colors"
              >
                <span>Clear filter</span>
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )}

        {/* EMPTY STATE */}
        {displayedProjects.length === 0 ? (
          <div className="p-8 sm:p-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 text-center space-y-3 bg-neutral-50/50 dark:bg-neutral-950">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              No projects found matching &ldquo;{selectedTechFilter}&rdquo;.
            </p>
            {onClearTechFilter && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTick(900);
                  onClearTechFilter();
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                View All Projects
              </button>
            )}
          </div>
        ) : (
          /* EDITORIAL LIST */
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
            {displayedProjects.map((project) => {
              const destinationUrl = project.liveUrl || project.githubUrl || '#';

              return (
                <article
                  key={project.id}
                  id={`project-row-${project.id}`}
                  className="group relative p-4 sm:py-6 sm:px-5 -mx-4 sm:-mx-5 rounded-xl transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50 select-none"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start">
                    
                    {/* Left Column: Project Title (Direct Anchor Tag) */}
                    <div className="sm:col-span-4">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white tracking-tight group-hover:underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600">
                        <a
                          href={destinationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundManager.playTick(1000)}
                          className="focus:outline-none"
                        >
                          {/* Stretches the link to cover the entire card */}
                          <span className="absolute inset-0 rounded-xl" aria-hidden="true" />
                          {project.title}
                        </a>
                      </h3>
                    </div>

                    {/* Center Column: Category & Description */}
                    <div className="sm:col-span-7 space-y-1.5">
                      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 font-semibold">
                        {project.category || 'APPLICATION'}
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                        {project.description}
                      </p>

                      {/* Subtle Tech Stack Footnote */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                          {project.technologies.map((tech, tIdx) => (
                            <span key={tech} className="inline-flex items-center">
                              <span>{tech}</span>
                              {tIdx < project.technologies.length - 1 && (
                                <span className="text-neutral-300 dark:text-neutral-700 mx-1.5">·</span>
                              )}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Column: Arrow Link Indicator */}
                    <div className="hidden sm:flex sm:col-span-1 justify-end pt-0.5">
                      <ArrowUpRight className="h-4 w-4 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-950 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                  </div>

                 
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}