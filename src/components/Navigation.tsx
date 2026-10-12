import { useState, useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  FileText,
  House,
  Mail,
  Menu,
  Moon,
  ShoppingBag,
  Sun,
  Volume2,
  VolumeX,
  X,
  type LucideIcon,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { RESUME_URL } from '../utils/resume';
import { Link, pageFromPath, usePath } from '../utils/router';

interface NavigationProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
  darkMode: boolean;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTerminal: () => void;
}

interface NavLink {
  /** Matches activeSection: a page name, a home section id, or "top" for the home page itself */
  id: string;
  label: string;
  to: string;
  icon?: LucideIcon;
}

/** Sidebar groups, separated by hairlines: home sections, standalone pages, then contact. */
export const NAV_GROUPS: NavLink[][] = [
  [
    { id: 'top', label: 'Home', to: '/', icon: House },
    { id: 'shop', label: 'Shop', to: '/#shop', icon: ShoppingBag },
  ],
  [
    { id: 'projects', label: 'Projects', to: '/projects' },
    { id: 'experience', label: 'Experience', to: '/experience' },
    { id: 'stack', label: 'Stack', to: '/stack' },
    { id: 'certifications', label: 'Certifications', to: '/certifications' },
  ],
  [
    { id: 'about', label: 'About', to: '/#about' },
    { id: 'contact', label: 'Contact', to: '/#contact', icon: Mail },
  ],
];

/** Home sections that have their own sidebar entry; the rest highlight "Home". */
const HOME_ANCHORS = new Set(['shop', 'about', 'contact']);

export const NAV_LINKS = NAV_GROUPS.flat();

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);

function Keys({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((k, i) => (
        <span key={k} className="inline-flex items-center gap-1">
          {i > 0 && <span className="font-mono text-[10px] text-faint">+</span>}
          <kbd className="rounded border border-line-strong bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted">
            {k}
          </kbd>
        </span>
      ))}
    </span>
  );
}

export default function Navigation({
  onOpenCommandPalette,
  activeSection,
  darkMode,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenTerminal,
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

  // Full-screen mobile menu: lock page scroll, close on Escape or when the sidebar takes over.
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const onChange = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  // On a page, highlight that page. On home, only the anchored sections get their own highlight.
  const page = pageFromPath(usePath());
  const current = page ?? (HOME_ANCHORS.has(activeSection) ? activeSection : 'top');

  // Lets the mobile menu close before the overlay it opens animates in.
  const afterClose = (fn: () => void) => {
    setMenuOpen(false);
    setTimeout(fn, menuOpen ? 250 : 0);
  };

  const brand = (
    <Link
      to="/"
      onClick={() => setMenuOpen(false)}
      className="font-serif text-[22px] italic leading-none text-fg transition-opacity hover:opacity-60"
    >
      Rhazel Alforque
    </Link>
  );

  /** Grouped section links; `variant` sets the type scale for sidebar vs. full-screen menu. */
  const renderLinks = (variant: 'sidebar' | 'menu') =>
    NAV_GROUPS.map((group, gi) => (
      <Stagger key={gi} index={gi} animate={variant === 'menu'}>
        {gi > 0 && <div className={`h-px bg-line ${variant === 'menu' ? 'my-5' : 'my-4'}`} />}
        <ul className={`flex flex-col ${variant === 'menu' ? 'gap-4' : 'gap-2.5'}`}>
          {group.map((link) => {
            const isActive = current === link.id;
            const Icon = link.icon;
            return (
              <li key={link.id}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-flex w-fit items-center gap-2.5 transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`nav-active-${variant}`}
                      aria-hidden="true"
                      className="absolute -left-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              </li>
            );
          })}
          {gi === NAV_GROUPS.length - 1 && (
            <li>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTick(1000)}
                className="inline-flex w-fit items-center gap-2.5 text-muted transition-colors hover:text-fg"
              >
                <FileText className="h-3.5 w-3.5" />
                Résumé
                <ArrowUpRight className="h-3 w-3 text-faint" />
              </a>
            </li>
          )}
        </ul>
      </Stagger>
    ));

  const shortcuts = (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() =>
          afterClose(() => {
            soundManager.playTick(1000);
            onOpenCommandPalette();
          })
        }
        className="inline-flex w-fit cursor-pointer items-center gap-2 text-[12px] text-faint transition-colors hover:text-fg"
      >
        <span>Search</span>
        <Keys keys={[isMac ? '⌘' : 'Ctrl', 'K']} />
      </button>
      <button
        type="button"
        onClick={() =>
          afterClose(() => {
            soundManager.playTick(1200);
            onOpenTerminal();
          })
        }
        className="hidden w-fit cursor-pointer items-center gap-2 text-[12px] text-faint transition-colors hover:text-fg sm:inline-flex"
      >
        <span>Terminal</span>
        <Keys keys={['~']} />
      </button>
    </div>
  );

  const settings = (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <div role="group" aria-label="Theme" className="inline-flex rounded-full border border-line p-0.5">
          {[
            { dark: false, label: 'Light theme', Icon: Sun },
            { dark: true, label: 'Dark theme', Icon: Moon },
          ].map(({ dark, label, Icon }) => {
            const active = darkMode === dark;
            return (
              <button
                key={label}
                type="button"
                aria-label={label}
                aria-pressed={active}
                title={`${label} (D)`}
                onClick={() => {
                  if (active) return;
                  soundManager.playTick(1100);
                  onToggleTheme();
                }}
                className={`flex h-6.5 w-7.5 cursor-pointer items-center justify-center rounded-full transition-colors ${
                  active ? 'bg-surface-2 text-fg' : 'text-faint hover:text-fg'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onToggleSound}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? 'Turn interface sounds off' : 'Turn interface sounds on'}
          title={soundEnabled ? 'Sounds on' : 'Sounds off'}
          className="flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full border border-line text-faint transition-colors hover:border-line-strong hover:text-fg"
        >
          {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>
      </div>
      <p className="text-[12px] leading-relaxed text-faint">For work &amp; everything else, reach me at</p>
      <a
        href={`mailto:${portfolioData.email}`}
        className="mt-1.5 inline-flex w-fit items-center gap-2 break-all text-[13px] text-fg transition-opacity hover:opacity-60"
      >
        <Mail className="h-3.5 w-3.5 shrink-0" />
        {portfolioData.email}
      </a>
    </div>
  );

  return (
    <>
      {/* Fixed left sidebar (lg+) */}
      <nav
        id="main-navigation"
        aria-label="Sections"
        className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-line bg-bg px-7 py-8 lg:flex"
      >
        {brand}
        <div className="mt-9 flex-1 overflow-y-auto pl-4 -ml-4 font-mono text-[13px]">{renderLinks('sidebar')}</div>
        <div className="mt-6 shrink-0 space-y-6">
          {shortcuts}
          {settings}
        </div>

        {/* Scroll progress along the sidebar edge */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute -right-px inset-y-0 w-px origin-top bg-line-strong"
        />
      </nav>

      {/* Top bar (below lg) */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 lg:hidden ${
          scrolled ? 'border-line bg-bg/90' : 'border-transparent bg-bg/60'
        }`}
      >
        <div className="container-page flex items-center justify-between py-3">
          {brand}
          <button
            id="nav-menu-btn"
            type="button"
            onClick={() => {
              soundManager.playTick(1000);
              setMenuOpen(true);
            }}
            className="-mr-1 cursor-pointer p-1 text-muted transition-colors hover:text-fg"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-line-strong"
        />
      </header>

      {/* Full-screen menu (below lg) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 flex flex-col bg-bg lg:hidden"
          >
            <div className="container-page flex items-center justify-between border-b border-line py-3">
              {brand}
              <button
                type="button"
                autoFocus
                onClick={() => {
                  soundManager.playTick(900);
                  setMenuOpen(false);
                }}
                className="-mr-1 cursor-pointer p-1 text-muted transition-colors hover:text-fg"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              aria-label="Sections"
              className="container-page flex flex-1 flex-col overflow-y-auto py-8 pl-8 font-mono text-[16px] sm:pl-10"
            >
              {renderLinks('menu')}
              <Stagger index={NAV_GROUPS.length} animate>
                <div className="my-5 h-px bg-line" />
                <div className="space-y-6 pb-[env(safe-area-inset-bottom)]">
                  {shortcuts}
                  {settings}
                </div>
              </Stagger>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Fades menu groups in one after another; renders plainly in the sidebar. */
function Stagger({ index, animate, children }: { index: number; animate: boolean; children: ReactNode }) {
  if (!animate) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
