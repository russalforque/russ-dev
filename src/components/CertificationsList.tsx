import { portfolioData, CertificateItem } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Section, { AllLink, PageHeader } from './ui/Section';
import Reveal from './ui/Reveal';

interface CertificationsListProps {
  onSelectCertificate: (certificate: CertificateItem) => void;
  /** "preview" shows a couple on the home page; "page" is the full /certifications list */
  mode?: 'preview' | 'page';
}

// Data titles are stored uppercase; render them in title case.
function toTitleCase(s: string) {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bDevops\b/g, 'DevOps');
}

export default function CertificationsList({ onSelectCertificate, mode = 'page' }: CertificationsListProps) {
  const all = portfolioData.certifications;
  const items = mode === 'preview' ? all.slice(0, 2) : all;

  const list = (
    <Reveal>
      <ul className="divide-y divide-line border-y border-line">
        {items.map((cert) => (
          <li key={cert.id}>
            <button
              id={`cert-card-${cert.id}`}
              type="button"
              onClick={() => {
                soundManager.playTick(1000);
                onSelectCertificate(cert);
              }}
              className="group flex w-full cursor-pointer items-baseline justify-between gap-6 py-5 text-left transition-colors hover:bg-accent-soft"
            >
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-medium text-fg transition-colors group-hover:text-muted">
                  {toTitleCase(cert.title)}
                </h3>
                <p className="mt-1 truncate text-sm text-muted">{cert.subtitle}</p>
              </div>
              <span className="shrink-0 font-mono text-[12px] text-faint">{cert.year}</span>
            </button>
          </li>
        ))}
      </ul>
    </Reveal>
  );

  if (mode === 'preview') {
    return (
      <Section id="certifications" index="06" label="certifications" aside={<AllLink to="/certifications">all {all.length}</AllLink>}>
        {list}
      </Section>
    );
  }

  return (
    <div id="certifications">
      <PageHeader
        title="Certifications"
        count={`${all.length} total`}
        intro="Training across cloud architecture, Docker containerization and Kubernetes administration. Select one to view the certificate."
      />
      <div className="pb-14">{list}</div>
    </div>
  );
}
