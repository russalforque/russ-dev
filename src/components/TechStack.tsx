import { portfolioData, Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Section from './ui/Section';

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
      title="Skills"
      note="A number is how many projects on this page use that skill. Select one to see them."
    >
      <dl>
        {portfolioData.technologies.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_minmax(0,1fr)]"
          >
            <dt className="pt-1 text-[15px] font-bold text-fg">{group.category}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((tech) => {
                  const count = countFor(tech);
                  const isSelected = selectedTech === tech;

                  // Only skills that appear on a project act as filters.
                  if (count === 0) {
                    return (
                      <li key={tech} className="tag min-h-10 px-3 text-sm sm:min-h-9">
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
                        className={`inline-flex min-h-10 cursor-pointer sm:min-h-9 items-center gap-2 rounded-[3px] border px-3 text-sm font-semibold leading-none transition-colors ${
                          isSelected
                            ? 'border-fg bg-fg text-bg'
                            : 'border-line-strong text-fg hover:border-accent hover:text-accent'
                        }`}
                        title={`Show ${count} project${count === 1 ? '' : 's'} built with ${tech}`}
                      >
                        {tech}
                        <span className="font-normal tabular-nums opacity-70" aria-hidden="true">
                          {count}
                        </span>
                        <span className="sr-only">
                          , used in {count} project{count === 1 ? '' : 's'}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ))}

        <div className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-line pt-5 sm:grid-cols-[11rem_minmax(0,1fr)]">
          <dt className="text-[15px] font-bold text-fg">Familiar with</dt>
          <dd className="text-[15px] leading-relaxed text-muted">
            {portfolioData.familiar.join(', ')}. Covered in training and coursework, not yet used on a shipped project.
          </dd>
        </div>
      </dl>
    </Section>
  );
}
