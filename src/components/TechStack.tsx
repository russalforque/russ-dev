import { portfolioData, Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Section, { Em } from './ui/Section';
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
    <Section
      id="stack"
      index="03"
      label="Stack"
      title={
        <>
          Tools I <Em>reach for</Em>
        </>
      }
      intro="The frameworks and platforms I work with across the front end, back end, data, and cloud operations."
    >
      <Reveal>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {portfolioData.technologies.map((group, gi) => (
            <div key={group.category} className="bg-surface p-6 sm:p-7">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-fg">{group.category}</h3>
                <span className="font-mono text-[11px] text-faint">
                  {String(gi + 1).padStart(2, '0')} / {String(group.items.length).padStart(2, '0')}
                </span>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((tech) => {
                  const count = countFor(tech);
                  const isSelected = selectedTech === tech;
                  const base = 'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs';

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
                          onSelectTech(tech);
                          if (!isSelected) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`${base} cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-fg bg-fg text-bg'
                            : 'border-line-strong text-fg hover:border-accent hover:text-accent'
                        }`}
                        title={`Show ${count} project${count === 1 ? '' : 's'} built with ${tech}`}
                      >
                        {tech}
                        <span className="opacity-60">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
