import { useState, useEffect, useCallback } from 'react';
import { MotionConfig } from 'motion/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectList, { projectLink } from './components/ProjectList';
import AppShop from './components/AppShop';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechStack from './components/TechStack';
import GitHubActivity from './components/GitHubActivity';
import AboutSection from './components/AboutSection';
import CertificationsList from './components/CertificationsList';
import CertificateModal from './components/CertificateModal';
import ContactSection from './components/ContactSection';
import CommandPalette from './components/CommandPalette';
import TerminalDrawer from './components/TerminalDrawer';
import { portfolioData, CertificateItem } from './data/portfolioData';
import { soundManager } from './utils/sound';
import { openResume } from './utils/resume';
import { navigate, pageFromPath, PAGES, usePath } from './utils/router';

const PAGE_TITLES = {
  projects: 'Projects',
  experience: 'Experience',
  stack: 'Stack',
  certifications: 'Certifications',
} as const;

const HOME_SECTIONS = ['projects', 'shop', 'experience', 'github-activity', 'about', 'certifications', 'contact'];

export default function App() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);
  const page = pageFromPath(usePath());

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

  // Pages get their own URL; anything else is a section of the home page.
  const handleNavigate = useCallback((id: string) => {
    navigate((PAGES as readonly string[]).includes(id) ? `/${id}` : `/#${id}`);
  }, []);

  useEffect(() => {
    document.title = page ? `${PAGE_TITLES[page]} · Rhazel Alforque` : 'Rhazel Alforque - Full Stack Developer';
  }, [page]);

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

      if (isInput || e.metaKey || e.ctrlKey || e.altKey) return;

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

  // Section Observer for active scroll state (home page only)
  useEffect(() => {
    if (page) {
      setActiveSection(page);
      return;
    }
    setActiveSection('top');
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

    HOME_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [page]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-bg font-sans text-fg antialiased lg:pl-56">
      <a
        href="#main"
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

      {/* Soft sun glow in the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -right-40 -top-40 z-0 h-[36rem] w-[36rem] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--sun), transparent 65%)' }}
      />

      <main id="main" className="relative z-10">
        <div className="container-page">
          {page === 'projects' ? (
            <ProjectList
              projects={portfolioData.projects}
              selectedTechFilter={selectedTechFilter}
              onClearTechFilter={() => setSelectedTechFilter(null)}
            />
          ) : page === 'experience' ? (
            <ExperienceTimeline />
          ) : page === 'stack' ? (
            <TechStack
              selectedTech={selectedTechFilter}
              onSelectTech={setSelectedTechFilter}
              projects={portfolioData.projects}
            />
          ) : page === 'certifications' ? (
            <CertificationsList onSelectCertificate={setSelectedCertificate} />
          ) : (
            <>
              <Hero onCopyEmail={handleCopyEmail} copied={copiedEmail} />
              <ProjectList mode="preview" projects={portfolioData.projects} />
              <AppShop />
              <ExperienceTimeline mode="preview" />
              <GitHubActivity darkMode={darkMode} />
              <AboutSection />
              <CertificationsList mode="preview" onSelectCertificate={setSelectedCertificate} />
            </>
          )}

          <ContactSection onCopyEmail={handleCopyEmail} copied={copiedEmail} index={page ? undefined : '07'} />
        </div>
      </main>

      {/* Developer CLI Terminal Drawer */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenProject={(project) => {
          const link = projectLink(project);
          if (link) window.open(link.href, '_blank', 'noopener,noreferrer');
        }}
        onOpenResume={openResume}
        onToggleTheme={handleToggleTheme}
        darkMode={darkMode}
        onCopyEmail={handleCopyEmail}
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
      />
    </div>
    </MotionConfig>
  );
}