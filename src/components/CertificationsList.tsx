import { ArrowUpRight, Box, Layers, Cpu, Cloud, Award } from 'lucide-react';
import { portfolioData, CertificateItem } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface CertificationsListProps {
  onSelectCertificate: (certificate: CertificateItem) => void;
}

// Preset subtle rotations to replicate the organic tilted card look
const cardRotations = [
  'sm:-rotate-1',
  'sm:rotate-1',
  'sm:-rotate-1',
  'sm:rotate-2',
  'sm:-rotate-2',
];

// Helper to pick a clean monochrome icon matching each certification topic
function getCertIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes('kubernetes')) {
    return <Cpu className="h-5 w-5 text-neutral-900 dark:text-white" />;
  }
  if (lower.includes('container') || lower.includes('devops')) {
    return <Layers className="h-5 w-5 text-neutral-900 dark:text-white" />;
  }
  if (lower.includes('docker')) {
    return <Box className="h-5 w-5 text-neutral-900 dark:text-white" />;
  }
  if (lower.includes('cloud') || lower.includes('architecture')) {
    return <Cloud className="h-5 w-5 text-neutral-900 dark:text-white" />;
  }
  return <Award className="h-5 w-5 text-neutral-900 dark:text-white" />;
}

export default function CertificationsList({ onSelectCertificate }: CertificationsListProps) {
  return (
    <section 
      id="certifications" 
      aria-label="Certifications and Accreditations"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full border-t border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950"
    >
      <div className="space-y-10 sm:space-y-12">
        
        {/* HEADER */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-950 dark:text-white font-mono lowercase">
            certifications
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-2xl">
            Credentials across cloud architecture, Docker containerization, and Kubernetes administration — each verifiable at its source.
          </p>
        </div>

        {/* CATEGORY SECTION (Matches "A I" header in screenshot) */}
        <div className="space-y-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
            C L O U D &nbsp; &amp; &nbsp; D E V O P S
          </div>

          {/* TILTED CARD DECK GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-2">
            {portfolioData.certifications.map((cert, index) => {
              const rotationClass = cardRotations[index % cardRotations.length];

              return (
                <div
                  key={cert.id}
                  id={`cert-card-${cert.id}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    soundManager.playTick(1000);
                    onSelectCertificate(cert);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      soundManager.playTick(1000);
                      onSelectCertificate(cert);
                    }
                  }}
                  className={`group relative flex flex-col items-center text-center justify-between min-h-[220px] sm:min-h-[240px] p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:shadow-xl hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 cursor-pointer select-none hover:rotate-0 hover:-translate-y-1.5 z-0 hover:z-20 ${rotationClass}`}
                >
                  {/* Top Icon Badge */}
                  <div className="w-11 h-11 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {getCertIcon(cert.title)}
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-1.5 my-auto py-2">
                    <h3 className="text-xs sm:text-sm font-bold tracking-tight text-neutral-950 dark:text-white leading-snug line-clamp-3">
                      {cert.title}
                    </h3>
                    
                    <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {cert.issuer || cert.subtitle || 'ACCENTURE'}
                    </p>
                  </div>

                  {/* Bottom Action (Matches `< VERIFY >` in screenshot) */}
                  <div className="pt-2 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-white tracking-widest uppercase transition-colors flex items-center gap-0.5">
                    <span>&lang;</span>
                    <span className="font-semibold">VERIFY</span>
                    <span>&rang;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}