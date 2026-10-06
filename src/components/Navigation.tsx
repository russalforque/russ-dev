import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Command, Menu, Moon, Sun, X } from 'lucide-react';
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

export const NAV_LINKS = [
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'about', label: 'About' },
  { id: 'certifications', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({
  onOpenCommandPalette,
  activeSection,
  darkMode,
  onToggleTheme,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu: close on Escape and when the viewport grows into the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const onChange = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    soundManager.playTick(1000);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const solid = scrolled || menuOpen;

  return (
    <header
      id="main-navigation"
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
        solid ? 'border-line bg-bg/90 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Brand */}
        <button
          id="nav-logo-btn"
          type="button"
          onClick={() => {
            soundManager.playTick(1200);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex cursor-pointer items-center gap-2.5"
          aria-label="Scroll to top"
        >
          <img
            src="/assets/profile.jpg"
            alt=""
            className="h-7 w-7 rounded-full object-cover ring-1 ring-line-strong"
          />
          <span className="text-sm font-semibold tracking-tight text-fg">
            Rhazel<span className="text-faint transition-colors group-hover:text-accent">.dev</span>
          </span>
        </button>

        {/* Section links (desktop). Needs ~750px, so it only appears from lg up. */}
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-surface-2"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            id="nav-theme-btn"
            type="button"
            onClick={() => {
              soundManager.playTick(1100);
              onToggleTheme();
            }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            title="Toggle theme (D)"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            id="nav-command-palette-btn"
            type="button"
            onClick={() => {
              soundManager.playTick(1000);
              onOpenCommandPalette();
            }}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
            aria-label="Open command palette (Ctrl+K)"
            title="Open command palette (Ctrl+K)"
          >
            <Command className="h-3.5 w-3.5" />
            <span>K</span>
          </button>

          <button
            id="nav-menu-btn"
            type="button"
            onClick={() => {
              soundManager.playTick(1000);
              setMenuOpen((open) => !open);
            }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-line-strong lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Section links (mobile & tablet) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Sections"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="container-page grid grid-cols-2 gap-1 py-3 sm:grid-cols-3">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-left text-[15px] font-medium transition-colors ${
                        isActive ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2/60 hover:text-fg'
                      }`}
                    >
                      <span className={`font-mono text-[11px] ${isActive ? 'text-accent' : 'text-faint'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
      />
    </header>
  );
}
