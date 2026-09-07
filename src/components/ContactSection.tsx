import { Copy, Check, ArrowUpRight, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface ContactSectionProps {
  onCopyEmail: () => void;
  copied: boolean;
}

export default function ContactSection({ onCopyEmail, copied }: ContactSectionProps) {
  return (
    <section 
      id="contact" 
      aria-label="Contact"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full border-t border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100"
    >
      <div className="space-y-6">
        
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-mono lowercase tracking-tight text-neutral-950 dark:text-white">
            contact
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Have a question or want to work together? Email me directly:
          </p>
        </div>

        {/* Email & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Direct Email Link */}
          <a
            href={`mailto:${portfolioData.email}`}
            onClick={() => soundManager.playTick(1000)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-md bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition-opacity"
          >
            <span>{portfolioData.email}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {/* Copy Button */}
          <button
            type="button"
            onClick={() => {
              onCopyEmail();
              soundManager.playSuccess();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-neutral-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playTick(1000)}
            className="hover:text-neutral-950 dark:hover:text-white underline underline-offset-4 transition-colors"
          >
            GitHub
          </a>
          <span>/</span>
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playTick(1000)}
            className="hover:text-neutral-950 dark:hover:text-white underline underline-offset-4 transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Footer */}
        <footer className="pt-10 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            <span>Cebu City, PH</span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playTick(1200);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            Back to top ↑
          </button>
        </footer>

      </div>
    </section>
  );
}