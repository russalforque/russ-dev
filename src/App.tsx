import { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectList, { ProjectArchive } from './components/ProjectList';
import ExperienceTimeline, { Education } from './components/ExperienceTimeline';
import TechStack from './components/TechStack';
import AboutSection from './components/AboutSection';
import CertificationsList from './components/CertificationsList';
import ContactSection from './components/ContactSection';
import { portfolioData } from './data/portfolioData';

const THEME_KEY = 'rhazel_theme';

/** Sections the nav highlights while they are on screen. */
const SECTION_IDS = [
  'projects',
  'more-projects',
  'experience',
  'education',
  'stack',
  'certifications',
  'about',
  'contact',
];

function readStoredTheme(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored === 'dark';
  } catch {
    // Storage can be blocked (private mode, strict settings). Fall through to the OS setting.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(readStoredTheme);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);

  // index.html applies the same class before first paint, so this never flashes.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
    } catch {
      // The theme still applies for this visit; it just is not remembered.
    }
  }, [darkMode]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Clipboard access was refused. The address is on screen and the mailto link still works.
    }
  }, []);

  // The page is rendered by script, so the browser may look for /#studex before it exists.
  // Scroll to it once, after the first render.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  // Track which section is in view so the nav can mark it.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -50% 0px' },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // "More projects" unmounts while a skill filter hides it, so re-observe when the filter changes.
  }, [selectedTechFilter]);

  return (
    <div className="relative min-h-screen bg-bg font-sans text-fg antialiased">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[4px] focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <Navigation
        activeSection={activeSection}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((prev) => !prev)}
      />

      <main>
        {/* Who, what role, what stack, how to get in touch */}
        <Hero />

        {/* Proof: engineering write-ups, then the smaller builds */}
        <ProjectList
          projects={portfolioData.projects}
          selectedTechFilter={selectedTechFilter}
          onClearTechFilter={() => setSelectedTechFilter(null)}
        />
        <ProjectArchive projects={portfolioData.projects} selectedTechFilter={selectedTechFilter} />

        {/* Background */}
        <ExperienceTimeline />
        <Education />
        <TechStack
          selectedTech={selectedTechFilter}
          onSelectTech={(tech) => setSelectedTechFilter((prev) => (prev === tech ? null : tech))}
          projects={portfolioData.projects}
        />
        <CertificationsList />
        <AboutSection />
        <ContactSection onCopyEmail={handleCopyEmail} copied={copiedEmail} />
      </main>
    </div>
  );
}
