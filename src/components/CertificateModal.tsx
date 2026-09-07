import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CertificateItem } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

// Maps the certificate to its respective image in public/assets/
function getCertificateImage(certificate: CertificateItem): string {
  // 1. If an image path is already defined in your data, use it
  const directPath =
    (certificate as any).image ||
    (certificate as any).imageUrl ||
    (certificate as any).src;
  if (directPath) return directPath;

  // 2. Otherwise, automatically match by title keywords
  const title = (certificate.title || '').toLowerCase();

  if (title.includes('kubernetes')) {
    return '/assets/Kubernetes Certificate.png';
  }
  if (title.includes('cloud')) {
    return '/assets/Cloud Data Ceritification.png';
  }
   if (title.includes('devops')) {
    return '/assets/Devops With Docker Certificates.png';
  }
  if (title.includes('docker') || title.includes('devops')) {
    return '/assets/Using Docker For Devops Cert.png';
    // or '/assets/using docker for devops Certification.png'
  }

  return '';
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playTick(800);
        onClose();
      }
    };

    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const imageUrl = getCertificateImage(certificate);

  return (
    <div
      id="certificate-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => {
        soundManager.playTick(800);
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
    >
      <div
        id="certificate-modal-card"
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="certificate-modal-close-btn"
          type="button"
          onClick={() => {
            soundManager.playTick(800);
            onClose();
          }}
          className="absolute -top-11 right-0 p-2 rounded-full bg-neutral-900/80 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
          aria-label="Close image modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Certificate Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={certificate.title || 'Certificate'}
            className="max-h-[85vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-neutral-800 bg-neutral-950"
          />
        ) : (
          <div className="p-8 text-neutral-400 bg-neutral-900 rounded-xl border border-neutral-800">
            No image preview available for this certificate.
          </div>
        )}
      </div>
    </div>
  );
}