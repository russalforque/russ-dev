import { GitHubCalendar } from 'react-github-calendar'; // 👈 Added brackets {}
import { Github, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface GitHubActivityProps {
  darkMode?: boolean;
}

export default function GitHubActivity({ darkMode }: GitHubActivityProps) {
  return (
    <section 
      id="github-activity" 
      aria-label="GitHub Contributions"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full border-t border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100"
    >
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 text-neutral-950 dark:text-white" />
            <h2 className="text-2xl sm:text-3xl font-mono lowercase tracking-tight text-neutral-950 dark:text-white">
              github
            </h2>
          </div>

          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-neutral-950 dark:hover:text-white underline underline-offset-4 transition-colors"
          >
            <span>@russalforque</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Contribution Graph Box */}
        <div className="p-4 sm:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 overflow-x-auto flex justify-center">
          <GitHubCalendar
            username="russalforque"
            colorScheme={darkMode ? 'dark' : 'light'}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
          />
        </div>

      </div>
    </section>
  );
}