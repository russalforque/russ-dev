import { useState, useEffect, useRef } from 'react';
import { 
  FolderGit2, 
  ShoppingBag,
  Briefcase, 
  Layers, 
  User, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Search,
  ArrowRight,
  Terminal,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onCopyEmail: () => void;
  copied: boolean;
  onOpenTerminal: () => void;
  onToggleTheme: () => void;
  darkMode: boolean;
  onToggleSound: () => void;
  soundEnabled: boolean;
}

interface PaletteItem {
  id: string;
  label: string;
  category: 'Navigation' | 'External' | 'Action' | 'System';
  shortcut?: string;
  icon: typeof FolderGit2;
  action: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onCopyEmail,
  copied,
  onOpenTerminal,
  onToggleTheme,
  darkMode,
  onToggleSound,
  soundEnabled,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: PaletteItem[] = [
    {
      id: 'projects',
      label: 'Projects',
      category: 'Navigation',
      shortcut: 'P',
      icon: FolderGit2,
      action: () => {
        soundManager.playTick(1000);
        onNavigate('projects');
        onClose();
      },
    },
    {
      id: 'shop',
      label: 'Shop: download my apps',
      category: 'Navigation',
      icon: ShoppingBag,
      action: () => {
        soundManager.playTick(1000);
        onNavigate('shop');
        onClose();
      },
    },
    {
      id: 'experience',
      label: 'Work Experience',
      category: 'Navigation',
      shortcut: 'E',
      icon: Briefcase,
      action: () => {
        soundManager.playTick(1000);
        onNavigate('experience');
        onClose();
      },
    },
    {
      id: 'stack',
      label: 'Tech Stack',
      category: 'Navigation',
      shortcut: 'S',
      icon: Layers,
      action: () => {
        soundManager.playTick(1000);
        onNavigate('stack');
        onClose();
      },
    },
    {
      id: 'about',
      label: 'About Me',
      category: 'Navigation',
      shortcut: 'A',
      icon: User,
      action: () => {
        soundManager.playTick(1000);
        onNavigate('about');
        onClose();
      },
    },
    {
      id: 'certifications',
      label: 'Certifications',
      category: 'Navigation',
      shortcut: 'T',
      icon: Award,
      action: () => {
        soundManager.playTick(1000);
        onNavigate('certifications');
        onClose();
      },
    },
    {
      id: 'contact',
      label: 'Contact',
      category: 'Navigation',
      shortcut: 'C',
      icon: Mail,
      action: () => {
        soundManager.playTick(1000);
        onNavigate('contact');
        onClose();
      },
    },
    {
      id: 'terminal',
      label: 'Terminal Console',
      category: 'System',
      shortcut: '~',
      icon: Terminal,
      action: () => {
        soundManager.playTick(1200);
        onOpenTerminal();
        onClose();
      },
    },
    {
      id: 'theme',
      label: `Switch to ${darkMode ? 'Light' : 'Dark'} Mode`,
      category: 'System',
      shortcut: 'D',
      icon: darkMode ? Sun : Moon,
      action: () => {
        soundManager.playTick(1100);
        onToggleTheme();
      },
    },
    {
      id: 'sound',
      label: soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects',
      category: 'System',
      shortcut: 'M',
      icon: soundEnabled ? VolumeX : Volume2,
      action: () => {
        soundManager.playTick(1100);
        onToggleSound();
      },
    },
    {
      id: 'copy-email',
      label: copied ? 'Email Copied!' : `Copy Email (${portfolioData.email})`,
      category: 'Action',
      shortcut: 'Y',
      icon: copied ? Check : Copy,
      action: () => {
        onCopyEmail();
        soundManager.playSuccess();
      },
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      category: 'External',
      shortcut: 'G',
      icon: Github,
      action: () => {
        soundManager.playTick(1000);
        window.open(portfolioData.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      category: 'External',
      shortcut: 'L',
      icon: Linkedin,
      action: () => {
        soundManager.playTick(1000);
        window.open(portfolioData.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundManager.playTick(700);
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundManager.playTick(700);
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        soundManager.playTick(800);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement | undefined;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div 
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[max(4rem,env(safe-area-inset-top))] sm:pt-28 px-4 bg-black/50 backdrop-blur-xs transition-opacity duration-150"
      onClick={() => {
        soundManager.playTick(800);
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        id="command-palette-modal"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl transition-all text-fg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3 text-muted">
          <Search className="h-4 w-4 shrink-0 text-faint" />
          <input
            id="command-palette-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search anything..."
            className="w-full bg-transparent text-base sm:text-sm font-mono text-fg placeholder:text-faint outline-none"
          />
          <kbd className="hidden sm:inline-block rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[min(20rem,60dvh)] overflow-y-auto overscroll-contain p-2 divide-y divide-transparent"
        >
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-faint font-mono">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  id={`palette-item-${item.id}`}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex min-h-11 items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs sm:text-sm font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-surface-2  text-fg  font-medium'
                      : 'text-muted  hover:bg-surface-2 '
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`p-1 rounded-md ${isSelected ? 'text-fg ' : 'text-faint'}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-[10px] font-mono text-faint uppercase">
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <kbd className="hidden sm:inline-flex h-5 items-center justify-center rounded-md border border-line bg-surface px-1.5 text-[10px] font-mono text-muted">
                        {item.shortcut}
                      </kbd>
                    )}
                    {isSelected && <ArrowRight className="h-3.5 w-3.5 text-fg" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="border-t border-line bg-surface-2/60 px-4 py-2 flex items-center justify-between text-[11px] text-faint font-mono">
          <div className="hidden sm:flex items-center gap-2">
            <span>Navigate ↑↓</span>
            <span>·</span>
            <span>Select ↵</span>
          </div>
          <span className="hidden sm:inline">Rhazel Alforque · Cebu City</span>
        </div>
      </div>
    </div>
  );
}