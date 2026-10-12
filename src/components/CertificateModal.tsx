import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CertificateItem } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playTick(800);
        onClose();
      }
    };

    if (!certificate) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const imageUrl = certificate.image;

  return (
    <div
      id="certificate-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
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
        className="relative max-w-5xl max-h-[90dvh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeRef}
          id="certificate-modal-close-btn"
          type="button"
          onClick={() => {
            soundManager.playTick(800);
            onClose();
          }}
          className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-10 p-2.5 rounded-full bg-surface/90 text-muted hover:text-fg border border-line transition-colors cursor-pointer"
          aria-label="Close image modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Certificate Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={certificate.title || 'Certificate'}
            className="max-h-[calc(100dvh-7rem)] sm:max-h-[85dvh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-line bg-surface"
          />
        ) : (
          <div className="p-8 text-muted bg-surface rounded-xl border border-line">
            No image preview available for this certificate.
          </div>
        )}
      </div>
    </div>
  );
}