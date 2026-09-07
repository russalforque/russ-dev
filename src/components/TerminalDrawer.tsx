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
  onOpenVisitorsModal?: () => void;
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
  onOpenVisitorsModal,
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
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="w-2 h-2 bg-emerald-500 animate-pulse" />
            <span>Rhazel Alforque — Cloud & Full-Stack Engineer</span>
          </div>
          <p className="text-neutral-400 text-[11px]">
            Status: <span className="text-emerald-400 font-semibold">Available for hire</span> · Cebu City (UTC+8)
          </p>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    if (isOpen) {
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
            <div className="border border-emerald-500/40 bg-emerald-950/30 p-3 space-y-2 font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Ready to ship production code</span>
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Focused on Full-Stack (.NET / React) and Cloud Architecture. Open to Remote or Hybrid roles.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-[11px] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3 h-3" /> Get in Touch
                </a>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-2.5 py-1 border border-neutral-700 bg-neutral-900 hover:border-emerald-400 text-neutral-200 text-[11px] inline-flex items-center gap-1.5 transition-colors"
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
                <span className="text-amber-400 font-semibold">hire</span>
                <span className="text-neutral-400">Hiring overview &amp; contact</span>

                <span className="text-amber-400 font-semibold">projects</span>
                <span className="text-neutral-400">Featured builds</span>

                <span className="text-amber-400 font-semibold">skills</span>
                <span className="text-neutral-400">Core tech stack</span>

                <span className="text-amber-400 font-semibold">resume</span>
                <span className="text-neutral-400">Open resume</span>

                <span className="text-amber-400 font-semibold">status</span>
                <span className="text-neutral-400">Location &amp; availability</span>

                <span className="text-amber-400 font-semibold">email</span>
                <span className="text-neutral-400">Copy email</span>

                <span className="text-amber-400 font-semibold">clear</span>
                <span className="text-neutral-400">Clear console</span>
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
                    className="border border-neutral-800 bg-neutral-900/60 p-2 flex items-center justify-between hover:border-emerald-500/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">#{p.number}</span>
                      <span className="text-white font-medium">{p.title}</span>
                    </div>
                    <span className="text-emerald-400 text-[10px] uppercase font-bold flex items-center gap-0.5">
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
                  <span className="text-neutral-500 text-[10px] uppercase font-bold">{cat.category}</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-1.5 py-0.5 border border-neutral-800 bg-neutral-900 text-neutral-300 text-[10px]"
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
            <div className="font-mono text-[11px] space-y-1 border border-neutral-800 bg-neutral-900/40 p-2.5">
              <p>• Availability: <span className="text-emerald-400 font-bold">Open to Offers</span></p>
              <p>• Location: <span className="text-white">Cebu City, Philippines (UTC+8)</span></p>
              <p>• Core Focus: <span className="text-white">Full-Stack &amp; Cloud Systems</span></p>
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
          text: '✓ Opened resume viewer.',
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
      className={`fixed z-50 transition-all duration-150 ease-out flex flex-col font-mono text-xs border-2 border-neutral-800 bg-neutral-950 text-neutral-200 shadow-xl ${
        isMaximized
          ? 'inset-2 sm:inset-6'
          : 'bottom-0 right-0 sm:bottom-4 sm:right-4 w-full sm:w-[500px] h-[400px] max-h-[85vh]'
      }`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-2 bg-neutral-900/90 select-none">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-emerald-500 rounded-full" />
          <TerminalIcon className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-bold text-white text-xs">terminal</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setHistory([])}
            className="p-1 text-neutral-400 hover:text-white"
            title="Clear"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 text-neutral-400 hover:text-white"
          >
            {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-rose-400"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Output Feed */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2 bg-neutral-950/95 font-mono text-xs">
        {history.map((item) => (
          <div key={item.id}>
            {item.type === 'command' ? (
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span>❯</span>
                <span className="text-white font-normal">{item.text}</span>
              </div>
            ) : item.type === 'error' ? (
              <div className="text-rose-400 text-[11px]">{item.text}</div>
            ) : (
              <div className="text-neutral-300">{item.text}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Quick-Action Chips for Fast Browsing */}
      <div className="border-t border-neutral-900 px-3 py-1.5 bg-neutral-950 flex items-center gap-1.5 overflow-x-auto text-[10px]">
        <span className="text-neutral-500 shrink-0 select-none">Quick:</span>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => handleCommand(action)}
            className={`px-2 py-0.5 border text-nowrap transition-colors ${
              action === 'hire'
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-neutral-950 font-bold'
                : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600'
            }`}
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input Prompt */}
      <div className="border-t border-neutral-800 px-3 py-2 bg-neutral-900 flex items-center gap-2">
        <span className="text-emerald-400 font-bold select-none">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'hire', 'projects', 'resume'..."
          className="w-full bg-transparent text-white focus:outline-none font-mono text-xs placeholder:text-neutral-600"
          autoComplete="off"
          spellCheck="false"
        />
        {copied && (
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 shrink-0">
            <Check className="w-3 h-3" /> Copied
          </span>
        )}
      </div>
    </div>
  );
}