import { useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Section from './ui/Section';

interface GitHubActivityProps {
  darkMode?: boolean;
}

const username = portfolioData.github.split('/').filter(Boolean).pop() ?? '';

export default function GitHubActivity({ darkMode }: GitHubActivityProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // On narrow screens the calendar overflows; start scrolled to the most recent
  // weeks. It renders async after fetching, so re-pin whenever its DOM changes.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const pinRight = () => {
      el.scrollLeft = el.scrollWidth;
    };
    pinRight();
    const observer = new MutationObserver(pinRight);
    observer.observe(el, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      id="github-activity"
      title="GitHub activity"
      note={
        <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
          @{username}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      }
    >
      <div ref={scrollerRef} className="overflow-x-auto overscroll-x-contain text-muted">
        <GitHubCalendar
          username={username}
          colorScheme={darkMode ? 'dark' : 'light'}
          blockSize={11}
          blockMargin={4}
          blockRadius={2}
          fontSize={13}
          theme={{
            light: ['#eceef1', '#c3cdf6', '#8a9eee', '#4a67e0', '#1a3fcf'],
            dark: ['#1c2026', '#28356b', '#3b4fa8', '#6f86e8', '#9fb2ff'],
          }}
        />
      </div>
    </Section>
  );
}
