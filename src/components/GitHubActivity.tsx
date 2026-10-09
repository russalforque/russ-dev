import { useEffect, useRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import Section, { Em } from './ui/Section';
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
      index="05"
      label="Activity"
      title={
        <>
          Building in <Em>public</Em>
        </>
      }
      aside={
        <a
          href={portfolioData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          @{username}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      }
    >
      <Reveal>
        <div
          ref={scrollerRef}
          className="overflow-x-auto overscroll-x-contain rounded-2xl border border-line bg-surface p-4 text-muted sm:p-7"
        >
          <GitHubCalendar
            username={username}
            colorScheme={darkMode ? 'dark' : 'light'}
            blockSize={11}
            blockMargin={4}
            blockRadius={3}
            fontSize={12}
            theme={{
              light: ['#e7e5de', '#fdc9a8', '#f99a63', '#f0560f', '#b83d05'],
              dark: ['#1f1f1d', '#4a2414', '#8a3a15', '#d85a1c', '#ff7638'],
            }}
          />
        </div>
      </Reveal>
    </Section>
  );
}
