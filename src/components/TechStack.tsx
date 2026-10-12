import { portfolioData, Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { PageHeader } from './ui/Section';
import { navigate } from '../utils/router';
import Reveal from './ui/Reveal';

interface TechStackProps {
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  projects: Project[];
}

export default function TechStack({ selectedTech, onSelectTech, projects }: TechStackProps) {
  const countFor = (tech: string) =>
    projects.filter((p) => p.technologies.some((t) => t.toLowerCase() === tech.toLowerCase())).length;

  return (
    <div id="stack" className="pb-14">
      <PageHeader
        title="Stack"
        intro="The frameworks and platforms I work with across the front end, back end, data and cloud operations. Tap a highlighted tool to see the projects built with it."
      />
      <Reveal>
        <div className="divide-y divide-line border-y border-line">
          {portfolioData.technologies.map((group) => (
            <div key={group.category} className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <h3 className="eyebrow pt-1">{group.category}</h3>

              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((tech) => {
                  const count = countFor(tech);
                  const isSelected = selectedTech === tech;
                  const base = 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px]';

                  // Only technologies tagged on projects act as filters.
                  if (count === 0) {
                    return (
                      <li key={tech} className={`${base} border-line text-muted`}>
                        {tech}
                      </li>
                    );
                  }

                  return (
                    <li key={tech}>
                      <button
                        id={`tech-badge-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          soundManager.playTick(1100);
                          if (isSelected) {
                            onSelectTech(null);
                          } else {
                            onSelectTech(tech);
                            navigate('/projects');
                          }
                        }}
                        className={`${base} cursor-pointer transition-colors ${
                          isSelected ? 'border-fg bg-fg text-bg' : 'border-line-strong text-fg hover:border-fg'
                        }`}
                        title={`Show ${count} project${count === 1 ? '' : 's'} built with ${tech}`}
                      >
                        {tech}
                        <span className="opacity-50">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
