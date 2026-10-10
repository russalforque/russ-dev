import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { RESUME_URL } from '../utils/resume';

interface NavigationProps {
  activeSection: string;
  darkMode: boolean;
  onToggleTheme: () => void;
}

/** `covers` lists every section id that should light up this link. */
export const NAV_LINKS = [
  { id: 'projects', label: 'Work', covers: ['projects', 'more-projects'] },
  { id: 'experience', label: 'Experience', covers: ['experience', 'education'] },
  { id: 'stack', label: 'Skills', covers: ['stack'] },
  { id: 'certifications', label: 'Training', covers: ['certifications'] },
  { id: 'contact', label: 'Contact', covers: ['about', 'contact'] },
];

export default function Navigation({ activeSection, darkMode, onToggleTheme }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu: close on Escape and when the viewport grows into the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia('(min-width: 768px)');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  const iconButton =
    'flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] border border-line text-muted transition-colors hover:border-fg hover:text-fg';

  return (
    <header
      id="main-navigation"
      className={`sticky top-0 z-40 w-full border-b bg-bg transition-colors duration-200 ${
        scrolled || menuOpen ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="whitespace-nowrap text-base font-extrabold tracking-[-0.01em] text-fg">
          {portfolioData.name}
        </a>

        {/* Plain anchors: they work without JavaScript, can be copied, and update the URL. */}
        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.covers.includes(activeSection);
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block px-3 py-2 text-[15px] font-medium underline-offset-[6px] transition-colors hover:text-fg ${
                      isActive ? 'text-fg underline decoration-2' : 'text-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-10 px-3.5 text-sm">
            Résumé
          </a>

          <button
            id="nav-theme-btn"
            type="button"
            onClick={onToggleTheme}
            className={`${iconButton} max-[359px]:hidden`}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {darkMode ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>

          <button
            id="nav-menu-btn"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`${iconButton} text-fg md:hidden`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-line md:hidden">
          <ul className="container-page divide-y divide-line py-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.covers.includes(activeSection);
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex min-h-12 w-full items-center text-base ${
                      isActive ? 'font-bold text-fg' : 'font-medium text-muted'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
