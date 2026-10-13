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
              light: ['#f4f4f5', '#dbe4ff', '#93b4ff', '#3b6ef5', '#1d4ed8'],
              dark: ['#1e1e22', '#1b2a4f', '#2a4a94', '#4f7ae6', '#7aa2ff'],
            }}
          />
        </div>
      </Reveal>
    </Section>
  );
}
