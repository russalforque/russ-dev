import { ArrowUpRight, Box, Layers, Cpu, Cloud, Award } from 'lucide-react';
import { portfolioData, CertificateItem } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import Section, { Em } from './ui/Section';
import Reveal from './ui/Reveal';

interface CertificationsListProps {
  onSelectCertificate: (certificate: CertificateItem) => void;
}

function getCertIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes('kubernetes')) return Cpu;
  if (lower.includes('container') || lower.includes('devops with')) return Layers;
  if (lower.includes('docker')) return Box;
  if (lower.includes('cloud') || lower.includes('architecture')) return Cloud;
  return Award;
}

// Data titles are stored uppercase; render them in title case.
function toTitleCase(s: string) {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bDevops\b/g, 'DevOps');
}

export default function CertificationsList({ onSelectCertificate }: CertificationsListProps) {
  return (
    <Section
      id="certifications"
      index="07"
      label="Credentials"
      title={
        <>
          Cloud &amp; DevOps <Em>credentials</Em>
        </>
      }
      intro="Training across cloud architecture, Docker containerization, and Kubernetes administration. Select one to view the certificate."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {portfolioData.certifications.map((cert, i) => {
          const Icon = getCertIcon(cert.title);
          return (
            <Reveal key={cert.id} delay={(i % 2) * 0.08} className="h-full">
              <button
                id={`cert-card-${cert.id}`}
                type="button"
                onClick={() => {
                  soundManager.playTick(1000);
                  onSelectCertificate(cert);
                }}
                className="group flex h-full w-full cursor-pointer flex-col rounded-2xl border border-line bg-surface p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-fg transition-colors group-hover:bg-accent group-hover:text-on-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] text-faint">{cert.year}</span>
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-fg">{toTitleCase(cert.title)}</h3>
                <p className="mt-1 text-sm text-muted">{cert.subtitle}</p>

                <div className="mb-6 mt-5 flex flex-wrap gap-1.5">
                  {cert.topics.map((topic) => (
                    <span key={topic} className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] text-muted">
                  <span>#{cert.certNumber}</span>
                  <span className="inline-flex items-center gap-1 transition-colors group-hover:text-accent">
                    View certificate <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
