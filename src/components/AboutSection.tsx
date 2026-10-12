import { RESUME_URL } from '../utils/resume';
import { soundManager } from '../utils/sound';
import Section from './ui/Section';
import Reveal from './ui/Reveal';

const FACTS = [
  { k: 'based in', v: 'Cebu City, Philippines' },
  { k: 'education', v: 'BS Information Technology, Asian College of Technology' },
  { k: 'core tools', v: 'C#, ASP.NET Core, React, SQL Server' },
  { k: 'looking for', v: 'Junior .NET / full-stack roles' },
];

export default function AboutSection() {
  return (
    <Section
      id="about"
      index="05"
      label="about"
      aside={
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playTick(1000)}
          className="transition-colors hover:text-fg"
        >
          full résumé →
        </a>
      }
    >
      <Reveal className="space-y-5 text-pretty text-[15px] leading-relaxed text-muted">
        <p>
          I graduated with a Bachelor of Science in Information Technology from Asian College of Technology in Cebu.
          Through my studies, internship and work, I found that I enjoy both sides of development: designing
          interfaces that are simple to use, and building the logic and databases that make applications reliable.
        </p>
        <p>
          I recently completed cloud support training at Accenture, where I got hands-on with Docker and Kubernetes.
          Now I'm looking for a supportive team to grow with as a <span className="text-fg">junior .NET developer</span>{' '}
          or <span className="text-fg">full-stack developer</span>.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {FACTS.map((f) => (
            <div key={f.k} className="grid grid-cols-[7rem_1fr] gap-4 py-3.5">
              <dt className="eyebrow pt-0.5">{f.k}</dt>
              <dd className="text-sm text-fg">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
