import { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectList from './components/ProjectList';
import ProjectModal from './components/ProjectModal';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechStack from './components/TechStack';
import GitHubActivity from './components/GitHubActivity'; // 👈 Added
import AboutSection from './components/AboutSection';
import CertificationsList from './components/CertificationsList';
import CertificateModal from './components/CertificateModal';
import ContactSection from './components/ContactSection';
import CommandPalette from './components/CommandPalette';
import ResumeModal from './components/ResumeModal';
import CustomCursor from './components/CustomCursor';
import TerminalDrawer from './components/TerminalDrawer';
import LiveViewersBadge from './components/LiveViewersBadge';
import { usePresence } from './utils/presence';
import { portfolioData, Project, CertificateItem } from './data/portfolioData';
import { soundManager } from './utils/sound';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
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
    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
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
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#090a0c] text-[#121212] dark:text-[#ededed] font-sans antialiased relative selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-950 transition-colors duration-200">
      <CustomCursor />

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
      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Hero Section */}
        <Hero
          onCopyEmail={handleCopyEmail}
          copied={copiedEmail}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
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
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
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
        onOpenResume={() => setIsResumeModalOpen(true)}
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
          className="fixed bottom-5 right-5 z-30 hidden sm:inline-flex items-center gap-2 rounded-full border border-neutral-300/80 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 px-3.5 py-1.5 text-xs font-mono text-neutral-800 dark:text-neutral-200 shadow-lg hover:shadow-xl hover:border-neutral-900 dark:hover:border-white transition-all duration-200 cursor-pointer backdrop-blur-md"
          title="Open Interactive Developer CLI (Shortcut: ~)"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">&gt;_ CLI</span>
          <kbd className="text-[10px] text-neutral-400 dark:text-neutral-500 rounded bg-neutral-100 dark:bg-neutral-800 px-1 py-0.2">
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

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
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
  );
}