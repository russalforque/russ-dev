import { useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { portfolioData } from '../data/portfolioData';
import Section from './ui/Section';
import Reveal from './ui/Reveal';

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
      index="04"
      label="github"
      aside={
        <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
          @{username} →
        </a>
      }
    >
      <Reveal>
        <div ref={scrollerRef} className="overflow-x-auto overscroll-x-contain font-mono text-muted">
          <GitHubCalendar
            username={username}
            colorScheme={darkMode ? 'dark' : 'light'}
            blockSize={10}
            blockMargin={3}
            blockRadius={2}
            fontSize={11}
            theme={{
              light: ['#f4f4f5', '#fde7bd', '#f5b544', '#d97706', '#b45309'],
              dark: ['#1e1e22', '#4a3612', '#8a6217', '#d4962a', '#f5b544'],
            }}
          />
        </div>
      </Reveal>
    </Section>
  );
}
