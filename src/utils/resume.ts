import { portfolioData } from '../data/portfolioData';

// The PDF in public/assets is the single source of truth for the résumé.
export const RESUME_URL = `/assets/${encodeURIComponent(portfolioData.resumeDownloadName)}`;
