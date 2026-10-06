import { useState, useEffect, useCallback } from 'react';
import { MotionConfig } from 'motion/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import ProjectModal from './components/ProjectModal';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechStack from './components/TechStack';
import GitHubActivity from './components/GitHubActivity';
import AboutSection from './components/AboutSection';
import CertificationsList from './components/CertificationsList';
import CertificateModal from './components/CertificateModal';
import ContactSection from './components/ContactSection';
import CommandPalette from './components/CommandPalette';
import TerminalDrawer from './components/TerminalDrawer';
import LiveViewersBadge from './components/LiveViewersBadge';
import { usePresence } from './utils/presence';
import { portfolioData, Project, CertificateItem } from './data/portfolioData';
import { soundManager } from './utils/sound';
import { openResume } from './utils/resume';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isVisitorsModalOpen, setIsVisitorsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);

  // Live Presence Tracking
  const { presence } = usePresence(activeSection);

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState(() => soundManager.isEnabled());

  // Dark Mode State with local storage and OS preference detection
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('rhazel_theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('rhazel_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('rhazel_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const handleToggleSound = useCallback(() => {
    const nextState = soundManager.toggle();
    setSoundEnabled(nextState);
  }, []);

  // Copy email with clipboard API and fallback
  const handleCopyEmail = useCallback(() => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(portfolioData.email);
    } else {
      const el = document.createElement('textarea');
      el.value = portfolioData.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2400);
  }, []);

  // Smooth navigation to section
  const handleNavigate = useCallback((sectionId: string) => {
    // Offset for the sticky header comes from html { scroll-padding-top }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isInput =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        document.activeElement?.getAttribute('contenteditable') === 'true';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundManager.playTick(1000);
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      if (e.key === '`' || e.key === '~') {
        if (!isInput) {
          e.preventDefault();
          soundManager.playTick(1200);
          setIsTerminalOpen((prev) => !prev);
          return;
        }
      }

      if (isInput) return;

      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        soundManager.playTick(1000);
        window.open(portfolioData.github, '_blank', 'noopener,noreferrer');
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        soundManager.playTick(1000);
        handleNavigate('projects');
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        soundManager.playTick(1000);
        handleNavigate('contact');
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        soundManager.playTick(1100);
        handleToggleTheme();
      } else if (e.key === '?') {
        e.preventDefault();
        soundManager.playTick(1000);
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleNavigate, handleToggleTheme]);

  // Section Observer for active scroll state
  useEffect(() => {
    const sections = ['projects', 'experience', 'stack', 'about', 'certifications', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-bg font-sans text-fg antialiased">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <Navigation
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeSection={activeSection}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Container */}
      <main>
        {/* Hero Section */}
        <Hero
          onCopyEmail={handleCopyEmail}
          copied={copiedEmail}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onlineCount={presence.onlineCount}
          activeViewers={presence.activeViewers}
          onOpenVisitorsModal={() => setIsVisitorsModalOpen(true)}
        />

        {/* 01 Projects List */}
        <ProjectList
          projects={portfolioData.projects}
          onSelectProject={(project) => setSelectedProject(project)}
          selectedTechFilter={selectedTechFilter}
          onClearTechFilter={() => setSelectedTechFilter(null)}
        />

        {/* 02 Experience Timeline */}
        <ExperienceTimeline />

        {/* 03 Technology Stack */}
        <TechStack
          selectedTech={selectedTechFilter}
          onSelectTech={(tech) =>
            setSelectedTechFilter((prev) => (prev === tech ? null : tech))
          }
          projects={portfolioData.projects}
        />

        {/* 04 GitHub Contribution Graph */}
        <GitHubActivity darkMode={darkMode} />

        {/* 05 About Section */}
        <AboutSection
        />

        {/* 06 Certifications List */}
        <CertificationsList
          onSelectCertificate={(cert) => setSelectedCertificate(cert)}
        />

        {/* 07 Contact Section */}
        <ContactSection
          onCopyEmail={handleCopyEmail}
          copied={copiedEmail}
        />
      </main>

      {/* Developer CLI Terminal Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenProject={(project) => setSelectedProject(project)}
        onOpenResume={openResume}
        onToggleTheme={handleToggleTheme}
        darkMode={darkMode}
        onCopyEmail={handleCopyEmail}
        onOpenVisitorsModal={() => setIsVisitorsModalOpen(true)}
      />

      {/* Floating CLI Launcher Pill */}
      {!isTerminalOpen && (
        <button
          id="floating-terminal-trigger"
          onClick={() => {
            soundManager.playTick(1200);
            setIsTerminalOpen(true);
          }}
          className="fixed bottom-5 right-5 z-30 hidden cursor-pointer items-center gap-2 rounded-full border border-line bg-surface/90 px-3.5 py-2 font-mono text-xs text-fg shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong sm:inline-flex"
          title="Open Interactive Developer CLI (Shortcut: ~)"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-medium">&gt;_ terminal</span>
          <kbd className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted">
            ~
          </kbd>
        </button>
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onCopyEmail={handleCopyEmail}
        copied={copiedEmail}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onToggleTheme={handleToggleTheme}
        darkMode={darkMode}
        onToggleSound={handleToggleSound}
        soundEnabled={soundEnabled}
        onOpenVisitorsModal={() => setIsVisitorsModalOpen(true)}
      />
    </div>
    </MotionConfig>
  );
}