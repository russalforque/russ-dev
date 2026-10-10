import { portfolioData, CertificateItem } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Section from './ui/Section';

interface CertificationsListProps {
  onSelectCertificate: (certificate: CertificateItem) => void;
}

export default function CertificationsList({ onSelectCertificate }: CertificationsListProps) {
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
            <div>
              <button
                id={`cert-card-${cert.id}`}
                type="button"
                onClick={() => {
                  soundManager.playTick(1000);
                  onSelectCertificate(cert);
                }}
                className="btn btn-secondary min-h-10 px-3.5 text-sm"
                aria-label={`View certificate: ${cert.title}`}
              >
                View certificate
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
