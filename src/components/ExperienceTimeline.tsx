import { portfolioData } from '../data/portfolioData';
import Section, { Em } from './ui/Section';
import Reveal from './ui/Reveal';

export default function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      index="03"
      label="Experience"
      title={
        <>
          Where I've <Em>worked</Em>
        </>
      }
      intro="From shipping full-stack features as an intern to enterprise cloud and DevOps training — each role sharpened how I build and support software."
    >
      <ol className="border-t border-line">
        {portfolioData.experience.map((exp, i) => (
          <li key={`${exp.organization}-${exp.year}`} className="border-b border-line">
            <Reveal delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-4 py-9 sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-3">
                  <div className="font-mono text-sm text-fg">{exp.year}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {exp.roleType}
                  </div>
                </div>

                <div className="sm:col-span-9">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg sm:text-2xl">{exp.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">
                    <span className="font-medium text-fg">{exp.organization}</span>
                    <span className="mx-2 text-faint">·</span>
                    {exp.location}
                  </p>
                  <p className="mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-fg/80">{exp.description}</p>

                  {exp.keyPoints.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {exp.keyPoints.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
