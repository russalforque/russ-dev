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
    if (!certificate) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playTick(800);
        onClose();
      }
    };
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

  const close = () => {
    soundManager.playTick(800);
    onClose();
  };

  return (
    <div
      id="certificate-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
    >
      <figure
        id="certificate-modal-card"
        className="relative flex max-h-[90dvh] max-w-4xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={certificate.image}
          alt={`Certificate of completion: ${certificate.title}`}
          width={1600}
          height={1200}
          decoding="async"
          className="h-auto max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded-[4px] bg-white object-contain"
        />
        <figcaption className="mt-3 text-sm leading-relaxed text-white">
          {certificate.title}
          <span className="block text-white/70">
            {certificate.provider} course, {certificate.duration}. Completed {certificate.completed}.
          </span>
        </figcaption>
      </figure>

      <button
        ref={closeRef}
        id="certificate-modal-close-btn"
        type="button"
        onClick={close}
        className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-[4px] border border-white/40 bg-black text-white transition-colors hover:border-white"
        aria-label="Close certificate"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
