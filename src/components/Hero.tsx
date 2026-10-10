import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { RESUME_URL } from '../utils/resume';

/**
 * What a recruiter needs in the first screen: who this is, what role they
 * want, what they build with, and how to get the résumé or get in touch.
 * The yellow marks sit on the keywords a screener would highlight.
 */
const FACTS = [
  {
    label: 'Looking for',
    value: <mark>{portfolioData.lookingFor}</mark>,
    detail: portfolioData.workSetup,
  },
  {
    label: 'Based in',
    value: portfolioData.location,
    detail: portfolioData.timezone,
  },
  {
    label: 'Education',
    value: 'BS Information Technology',
    detail: `${portfolioData.education[0].school}, ${portfolioData.education[0].period}`,
  },
  {
    label: 'Experience',
    value: 'Accenture, 2026',
    detail: 'Web developer internship, 2024',
  },
];

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="container-page pt-8 sm:pt-14">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="min-w-0">
            <h1 className="text-[clamp(3rem,10vw,6.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-fg">
              Rhazel
              <br />
              Alforque
            </h1>
            <p className="mt-5 text-lg font-semibold text-fg sm:text-xl">
              {portfolioData.role} in {portfolioData.location}
            </p>

            <p className="mt-5 max-w-[40rem] text-pretty text-lg leading-[1.55] text-muted sm:text-xl">
              I build business software for small shops and teams: a point of sale, a laundry system, online booking
              and a timesheet tracker. Back ends in <mark className="sm:whitespace-nowrap">C# and ASP.NET Core</mark> with{' '}
              <mark className="whitespace-nowrap">SQL Server</mark>, front ends in{' '}
              <mark className="sm:whitespace-nowrap">React and TypeScript</mark>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTick(1000)}
                className="btn btn-primary"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                View résumé (PDF)
              </a>
              <a
                href={`mailto:${portfolioData.email}`}
                onClick={() => soundManager.playTick(1000)}
                className="btn btn-secondary"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {portfolioData.email}
              </a>
            </div>

            <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
              <li>
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <img
            src="/assets/profile.jpg"
            alt="Portrait of Rhazel Alforque"
            width={288}
            height={288}
            loading="eager"
            className="order-first h-24 w-24 rounded-[4px] border border-line object-cover md:order-none md:h-52 md:w-52"
          />
        </div>

        <dl className="mt-10 grid grid-cols-1 border-t border-fg sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-line py-5 last:border-b-0 sm:pr-6 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-l lg:py-6 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="mt-1.5 text-base font-semibold leading-snug text-fg">{fact.value}</dd>
              <dd className="mt-1 text-sm text-muted">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
