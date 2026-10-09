import { ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { RESUME_URL } from '../utils/resume';
import Section, { Em } from './ui/Section';
import Reveal from './ui/Reveal';

const FACTS = [
  { k: 'Based in', v: 'Cebu City, Philippines' },
  { k: 'Education', v: 'BS Information Technology — Asian College of Technology' },
  { k: 'Core tools', v: 'C#, ASP.NET Core, React, SQL Server' },
  { k: 'Looking for', v: 'Junior .NET / Full-Stack roles' },
];

export default function AboutSection() {
  return (
    <Section
      id="about"
      index="06"
      label="About"
      title={
        <>
          I like working on <Em>both sides</Em> of the stack.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-9">
        <Reveal className="space-y-5 text-pretty text-base leading-relaxed text-fg/80 sm:text-lg lg:col-span-5">
          <p>
            I graduated with a Bachelor of Science in Information Technology from Asian College of Technology in Cebu.
            Through my studies, internship, and work experience, I found that I enjoy both sides of development:
            designing interfaces that are simple to use, and building the logic and databases that make applications
            reliable.
          </p>
          <p>
            I recently completed cloud support training at Accenture, where I gained hands-on knowledge of Docker and
            Kubernetes. Now I'm looking for a supportive team to grow with as a{' '}
            <strong className="font-semibold text-fg">Junior .NET Developer</strong> or{' '}
            <strong className="font-semibold text-fg">Full Stack Developer</strong>.
          </p>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playTick(1000)}
            className="group inline-flex items-center gap-2 pt-2 text-sm font-medium text-fg"
          >
            <span className="border-b border-accent pb-0.5">Read the full résumé</span>
            <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4">
          <dl className="divide-y divide-line border-y border-line">
            {FACTS.map((f) => (
              <div key={f.k} className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="eyebrow pt-0.5">{f.k}</dt>
                <dd className="text-sm text-fg">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
