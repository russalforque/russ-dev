import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Section from './ui/Section';

export default function CertificationsList() {
  return (
    <Section
      id="certifications"
      title="Training"
      note="Course certificates from Percipio, completed during training at Accenture."
    >
      <ul>
        {portfolioData.certifications.map((cert) => (
          <li
            key={cert.id}
            className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-line py-5 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
          >
            <div>
              <h3 className="text-[17px] font-bold leading-snug text-fg">{cert.title}</h3>
              <p className="mt-1 text-sm tabular-nums text-muted">
                {cert.provider} course, {cert.duration}. Completed {cert.completed}. Certificate no. {cert.certNumber}.
              </p>
            </div>
            {/* A plain link to the image: no modal, no script, and it can be opened in a new tab or saved. */}
            <a
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1 text-[15px]"
              aria-label={`View certificate: ${cert.title}`}
            >
              View certificate
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
