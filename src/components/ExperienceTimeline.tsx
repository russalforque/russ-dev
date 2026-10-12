import { portfolioData, type ExperienceItem } from '../data/portfolioData';
import Section, { AllLink, PageHeader } from './ui/Section';
import Reveal from './ui/Reveal';

interface ExperienceTimelineProps {
  /** "preview" lists the latest roles on the home page; "page" is the full /experience page */
  mode?: 'preview' | 'page';
}

/** Stable 7-char "commit hash" for a role, so the log reads like `git log --oneline`. */
function shortHash(exp: ExperienceItem) {
  let h = 2166136261;
  for (const c of `${exp.organization}${exp.year}${exp.title}`) {
    h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

export default function ExperienceTimeline({ mode = 'page' }: ExperienceTimelineProps) {
  const preview = mode === 'preview';
  const items = preview ? portfolioData.experience.slice(0, 2) : portfolioData.experience;

  const log = (
    <Reveal>
      <ol className="relative font-mono">
        {/* the branch line */}
        <span aria-hidden="true" className="absolute bottom-3 left-1.25 top-3 w-px bg-line-strong" />

        {items.map((exp, i) => (
          <li key={`${exp.organization}-${exp.year}`} className="relative pb-9 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1.5 h-2.75 w-2.75 rounded-full border-2 ${
                i === 0 ? 'border-accent bg-accent' : 'border-line-strong bg-bg'
              }`}
            />

            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[12px]">
              <span className="text-accent">{shortHash(exp)}</span>
              {i === 0 && (
                <span className="rounded border border-accent/40 px-1.5 text-[10px] text-accent">HEAD → main</span>
              )}
              <span className="text-faint">
                {exp.year} · {exp.roleType.toLowerCase()}
              </span>
            </div>

            <h3 className="mt-2 font-sans text-[15px] font-medium text-fg">{exp.title}</h3>
            <p className="mt-0.5 font-sans text-sm text-muted">
              {exp.organization}
              <span className="mx-1.5 text-faint">·</span>
              {exp.location}
            </p>

            {!preview && (
              <div className="font-sans">
                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">{exp.description}</p>

                {exp.keyPoints.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {exp.keyPoints.map((point) => (
                      <li key={point} className="flex gap-3 text-[13px] leading-relaxed text-muted">
                        <span className="font-mono text-accent" aria-hidden="true">
                          +
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  );

  if (preview) {
    return (
      <Section id="experience" index="03" label="experience" aside={<AllLink to="/experience">git log --all</AllLink>}>
        {log}
      </Section>
    );
  }

  return (
    <div id="experience">
      <PageHeader
        title="Experience"
        intro="From shipping full-stack features as an intern to enterprise cloud and DevOps training. Each role sharpened how I build and support software."
      />
      <div className="pb-14">{log}</div>
    </div>
  );
}
