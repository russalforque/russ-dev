import { useState, useEffect } from 'react';
import { Command } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface NavigationProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
  darkMode: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTerminal: () => void;
}

export default function Navigation({
  onOpenCommandPalette,
  activeSection,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'projects', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'stack', label: 'Stack' },
    { id: 'about', label: 'About' },
    { id: 'certifications', label: 'Certs' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    soundManager.playTick(1000);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    soundManager.playTick(1200);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation"
      className={`sticky top-0 z-40 w-full transition-colors duration-150 ${
        scrolled
          ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-xs'
          : 'bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-900'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        
        {/* BRAND / LOGO */}
        <button
          id="nav-logo-btn"
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-neutral-950 dark:text-white uppercase cursor-pointer select-none"
          aria-label="Scroll to top"
        >
          <span className="w-1.5 h-1.5 bg-neutral-900 dark:bg-white rounded-full" />
          <span>Rhazel</span>
        </button>

        

        {/* CONTROLS (Command Palette Trigger) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="nav-command-palette-btn"
            type="button"
            onClick={() => {
              soundManager.playTick(1000);
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer select-none"
            aria-label="Open command palette (Ctrl+K)"
            title="Open command palette (Ctrl+K)"
          >
            <Command className="h-3 w-3" />
            <span className="hidden sm:inline text-[11px]">Cmd+K</span>
            <span className="sm:hidden text-[10px]">K</span>
          </button>
        </div>

      </div>
    </header>
  );
}