import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  X,
  Maximize2,
  Minimize2,
  Trash2,
  Briefcase,
  FileText,
  Mail,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { portfolioData, Project } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (project: Project) => void;
  onOpenResume: () => void;
  onToggleTheme: () => void;
  darkMode: boolean;
  onCopyEmail: () => void;
}

interface CommandOutput {
  id: string;
  type: 'command' | 'output' | 'error' | 'success';
  text: string | React.ReactNode;
}

const QUICK_ACTIONS = ['hire', 'projects', 'resume', 'skills', 'status', 'email'];

export default function TerminalDrawer({
  isOpen,
  onClose,
  onOpenProject,
  onOpenResume,
  onToggleTheme,
  darkMode,
  onCopyEmail,
}: TerminalDrawerProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init',
      type: 'output',
      text: (
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex items-center gap-2 text-accent font-bold">
            <span className="w-2 h-2 bg-accent animate-pulse" />
            <span>Rhazel Alforque — Cloud & Full-Stack Engineer</span>
          </div>
          <p className="text-muted text-[11px]">
            Status: <span className="text-accent font-semibold">Available for hire</span> · Cebu City (UTC+8)
          </p>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    // Skip autofocus on touch devices so the on-screen keyboard doesn't cover
    // the output and quick-action chips the moment the drawer opens.
    if (isOpen && !window.matchMedia('(pointer: coarse)').matches) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    soundManager.playTick(900);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newEntries: CommandOutput[] = [
      {
        id: `cmd-${Date.now()}`,
        type: 'command',
        text: trimmed,
      },
    ];

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    switch (cmd) {
      case 'hire':
      case 'sudo':
        if (cmd === 'sudo' && arg !== 'hire') {
          newEntries.push({
            id: `out-${Date.now()}`,
            type: 'error',
            text: 'Try "hire" or "sudo hire"',
          });
          break;
        }
        soundManager.playSuccess();
        newEntries.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: (
            <div className="border border-accent/40 bg-accent-soft p-3 space-y-2 font-mono">
              <div className="flex items-center gap-2 text-accent font-bold text-xs">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Ready to ship production code</span>
              </div>
              <p className="text-fg text-[11px] leading-relaxed">
                Focused on Full-Stack (.NET / React) and Cloud Architecture. Open to Remote or Hybrid roles.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="px-2.5 py-1 bg-accent hover:opacity-90 text-on-accent font-bold text-[11px] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3 h-3" /> Get in Touch
                </a>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-2.5 py-1 border border-line-strong bg-surface-2 hover:border-accent text-fg text-[11px] inline-flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3 h-3" /> View Resume
                </button>
              </div>
            </div>
          ),
        });
        break;

      case 'help':
        newEntries.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 py-1 font-mono text-xs">
              <div className="grid grid-cols-[90px_1fr] gap-x-2 gap-y-1 text-[11px]">
                <span className="text-accent font-semibold">hire</span>
                <span className="text-muted">Hiring overview &amp; contact</span>

                <span className="text-accent font-semibold">projects</span>
                <span className="text-muted">Featured builds</span>

                <span className="text-accent font-semibold">skills</span>
                <span className="text-muted">Core tech stack</span>

                <span className="text-accent font-semibold">resume</span>
                <span className="text-muted">Open resume</span>

                <span className="text-accent font-semibold">status</span>
                <span className="text-muted">Location &amp; availability</span>

                <span className="text-accent font-semibold">email</span>
                <span className="text-muted">Copy email</span>

                <span className="text-accent font-semibold">clear</span>
                <span className="text-muted">Clear console</span>
              </div>
            </div>
          ),
        });
        break;

      case 'projects':
      case 'work':
        newEntries.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1.5 py-1 font-mono text-xs">
              <div className="space-y-1.5">
                {portfolioData.projects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onOpenProject(p);
                      onClose();
                    }}
                    className="border border-line bg-surface-2/60 p-2 flex items-center justify-between hover:border-accent/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-accent font-bold">#{p.number}</span>
                      <span className="text-fg font-medium">{p.title}</span>
                    </div>
                    <span className="text-accent text-[10px] uppercase font-bold flex items-center gap-0.5">
                      Open <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;

      case 'skills':
      case 'stack':
        newEntries.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1.5 py-1 font-mono text-xs">
              {portfolioData.technologies.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <span className="text-faint text-[10px] uppercase font-bold">{cat.category}</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-1.5 py-0.5 border border-line bg-surface-2 text-fg text-[10px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'status':
        newEntries.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: (
            <div className="font-mono text-[11px] space-y-1 border border-line bg-surface-2/40 p-2.5">
              <p>• Availability: <span className="text-accent font-bold">Open to Offers</span></p>
              <p>• Location: <span className="text-fg">Cebu City, Philippines (UTC+8)</span></p>
              <p>• Core Focus: <span className="text-fg">Full-Stack &amp; Cloud Systems</span></p>
            </div>
          ),
        });
        break;

      case 'resume':
      case 'cv':
        onOpenResume();
        newEntries.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: '✓ Opened resume PDF in a new tab.',
        });
        break;

      case 'email':
        onCopyEmail();
        soundManager.playSuccess();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        newEntries.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `✓ Copied: ${portfolioData.email}`,
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newEntries.push({
          id: `out-${Date.now()}`,
          type: 'error',
          text: `Unknown command "${trimmed}". Tap below or type "help".`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!commandHistory.length) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-150 ease-out flex flex-col font-mono text-xs border-2 border-line bg-bg text-fg shadow-xl ${
        isMaximized
          ? 'inset-2 sm:inset-6'
          : 'bottom-0 right-0 sm:bottom-4 sm:right-4 w-full sm:w-[500px] h-[min(400px,70dvh)] sm:h-[400px] max-h-[85dvh]'
      }`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-line px-3 py-2 bg-surface/90 select-none">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-accent rounded-full" />
          <TerminalIcon className="h-3.5 w-3.5 text-accent" />
          <span className="font-bold text-fg text-xs">terminal</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setHistory([])}
            className="p-2 sm:p-1 text-muted hover:text-fg"
            title="Clear"
            aria-label="Clear terminal"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-2 sm:p-1 text-muted hover:text-fg"
            aria-label={isMaximized ? 'Restore terminal size' : 'Maximize terminal'}
          >
            {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:p-1 text-muted hover:text-rose-400"
            aria-label="Close terminal"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Output Feed */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2 bg-bg/95 font-mono text-xs">
        {history.map((item) => (
          <div key={item.id}>
            {item.type === 'command' ? (
              <div className="flex items-center gap-1.5 text-accent font-semibold">
                <span>❯</span>
                <span className="text-fg font-normal">{item.text}</span>
              </div>
            ) : item.type === 'error' ? (
              <div className="text-rose-400 text-[11px]">{item.text}</div>
            ) : (
              <div className="text-fg">{item.text}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Quick-Action Chips for Fast Browsing */}
      <div className="border-t border-line px-3 py-1.5 bg-bg flex items-center gap-1.5 overflow-x-auto text-[10px]">
        <span className="text-faint shrink-0 select-none">Quick:</span>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => handleCommand(action)}
            className={`px-2.5 py-1.5 sm:px-2 sm:py-0.5 border text-nowrap transition-colors ${
              action === 'hire'
                ? 'border-accent/50 bg-accent-soft text-accent hover:bg-accent hover:text-on-accent font-bold'
                : 'border-line bg-surface-2 text-fg hover:border-line-strong'
            }`}
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input Prompt */}
      <div className="pb-safe border-t border-line bg-surface-2">
      <div className="px-3 py-2 flex items-center gap-2">
        <span className="text-accent font-bold select-none">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'hire', 'projects', 'resume'..."
          className="w-full bg-transparent text-fg focus:outline-none font-mono text-base sm:text-xs placeholder:text-faint"
          autoComplete="off"
          spellCheck="false"
        />
        {copied && (
          <span className="text-[10px] text-accent flex items-center gap-1 shrink-0">
            <Check className="w-3 h-3" /> Copied
          </span>
        )}
      </div>
      </div>
    </div>
  );
}