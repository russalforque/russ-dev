import { portfolioData } from '../data/portfolioData';

// The PDF in public/assets is the single source of truth for the résumé.
export const RESUME_URL = `/assets/${encodeURIComponent(portfolioData.resumeDownloadName)}`;

/** Opens the résumé PDF in a new browser tab. */
export function openResume() {
  window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
}
