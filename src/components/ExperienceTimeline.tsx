import { portfolioData } from '../data/portfolioData';
import Section from './ui/Section';

function Entry({
  period,
  title,
  place,
  points,
}: {
  period: string;
  title: string;
  place: string;
  points: string[];
}) {
  return (
    <li className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-line py-7 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[11rem_minmax(0,1fr)]">
      <p className="pt-1 text-sm tabular-nums text-muted">{period}</p>
      <div>
        <h3 className="text-xl font-extrabold leading-snug tracking-[-0.015em] text-fg">{title}</h3>
        <p className="mt-1 text-[15px] text-fg">{place}</p>
        {points.length > 0 && (
          <ul className="mt-4 max-w-2xl space-y-2">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function ExperienceTimeline() {
  return (
    <Section id="experience" title="Experience">
      <ol>
        {portfolioData.experience.map((exp) => (
          <Entry
            key={`${exp.organization}-${exp.period}`}
            period={exp.period}
            title={exp.title}
            place={`${exp.organization}, ${exp.location}`}
            points={exp.keyPoints}
          />
        ))}
      </ol>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" title="Education">
      <ol>
        {portfolioData.education.map((edu) => (
          <Entry
            key={edu.degree}
            period={edu.period}
            title={edu.degree}
            place={`${edu.school}, ${edu.location}`}
            points={edu.notes}
          />
        ))}
      </ol>
    </Section>
  );
}
