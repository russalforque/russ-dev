import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface TechStackProps {
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  projects: Project[];
}

export default function TechStack({ selectedTech, onSelectTech, projects }: TechStackProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Find which projects use the hovered or selected technology
  const activeTech = hoveredTech || selectedTech;
  const matchingProjects = activeTech
    ? projects.filter((p) => p.technologies.some((t) => t.toLowerCase() === activeTech.toLowerCase()))
    : [];

  return (
    <section 
      id="stack" 
      aria-label="Technologies and Tools"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full border-t border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950"
    >
      <div className="space-y-10 sm:space-y-12">
        
        {/* HEADER (Directly matching screenshot) */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 dark:text-white font-mono lowercase">
            tech stack
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-2xl">
            The tools, frameworks, and platforms I reach for — across the front end, back end, databases, and cloud operations.
          </p>
        </div>

        {/* OPEN CATEGORY STACK (Matches image layout) */}
        <div className="space-y-8 sm:space-y-10">
          {portfolioData.technologies.map((group) => (
            <div key={group.category} className="space-y-3">
              {/* Category Subheader */}
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 font-semibold">
                {group.category}
              </div>

              {/* Pill Badges Grid */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {group.items.map((tech) => {
                  const isSelected = selectedTech === tech;
                  const isHovered = hoveredTech === tech;
                  const projectCount = projects.filter((p) =>
                    p.technologies.some((t) => t.toLowerCase() === tech.toLowerCase())
                  ).length;

                  return (
                    <button
                      key={tech}
                      id={`tech-badge-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      type="button"
                      onClick={() => {
                        soundManager.playTick(1100);
                        onSelectTech(isSelected ? null : tech);
                      }}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono rounded-md border transition-colors cursor-pointer select-none ${
                        isSelected
                          ? 'border-neutral-950 dark:border-white bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold'
                          : isHovered
                          ? 'border-neutral-400 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 text-neutral-950 dark:text-white'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span>{tech}</span>
                      {projectCount > 0 && (
                        <span
                          className={`text-[10px] px-1 rounded-sm border font-mono ${
                            isSelected
                              ? 'border-neutral-700 bg-neutral-800 text-neutral-200 dark:border-neutral-300 dark:bg-neutral-200 dark:text-neutral-900'
                              : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-400 dark:text-neutral-500'
                          }`}
                        >
                          {projectCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ACTIVE TOOL FILTER PANEL */}
        {activeTech && (
          <div className="p-4 sm:p-5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 space-y-3 animate-in fade-in duration-150">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
              <div className="text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <span>Projects built with </span>
                <strong className="font-bold text-neutral-950 dark:text-white underline underline-offset-4 decoration-neutral-400">
                  {activeTech}
                </strong>
                :
              </div>

              {selectedTech && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTick(900);
                    onSelectTech(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-neutral-950 dark:hover:text-white cursor-pointer transition-colors"
                >
                  <span>Clear filter</span>
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {matchingProjects.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {matchingProjects.map((proj) => (
                  <a
                    key={proj.id}
                    href={`#project-row-${proj.id}`}
                    onClick={() => soundManager.playTick(1000)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:border-neutral-950 dark:hover:border-white transition-colors"
                  >
                    <span className="font-bold text-neutral-400 dark:text-neutral-500">
                      #{proj.number}
                    </span>
                    <span>{proj.title}</span>
                    <ArrowUpRight className="h-3 w-3 text-neutral-400" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed">
                Applied during college coursework, web developer internship projects, or enterprise cloud training at Accenture.
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
}