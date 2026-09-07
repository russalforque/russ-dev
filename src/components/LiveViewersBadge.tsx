import React from 'react';
import SketchAvatar from './SketchAvatar';
import { ActiveViewer } from '../utils/presence';
import { soundManager } from '../utils/sound';

interface LiveViewersBadgeProps {
  onlineCount: number;
  activeViewers: ActiveViewer[];
  onOpenVisitorsModal: () => void;
  variant?: 'hero' | 'floating' | 'compact';
}

export default function LiveViewersBadge({
  onlineCount,
  activeViewers,
  onOpenVisitorsModal,
  variant = 'hero',
}: LiveViewersBadgeProps) {
  // Ensure we show at least 3 avatars matching the screenshot
  const displayAvatars = [
    activeViewers[0]?.avatarId || 'sketch-1',
    activeViewers[1]?.avatarId || 'sketch-2',
    activeViewers[2]?.avatarId || 'sketch-3',
  ];

  const totalCount = Math.max(onlineCount, 1);
  const remainingCount = Math.max(0, totalCount - 3);

  const handleClick = () => {
    soundManager.playTick(1100);
    onOpenVisitorsModal();
  };

  if (variant === 'floating') {
    return (
      <button
        id="floating-live-viewers-btn"
        onClick={handleClick}
        className="fixed bottom-5 left-5 z-30 group flex items-center gap-3 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 py-1.5 pl-2 pr-3.5 shadow-lg hover:shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 text-left"
        title="Click to view live audience & visitor records"
      >
        {/* Overlapping Avatar Stack */}
        <div className="flex items-center -space-x-2.5">
          {displayAvatars.map((avatarId, idx) => (
            <div
              key={idx}
              className="relative rounded-full ring-2 ring-white dark:ring-neutral-900 overflow-hidden bg-neutral-100 dark:bg-neutral-800"
            >
              <SketchAvatar id={avatarId} size={24} />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 ring-2 ring-white dark:ring-neutral-900 text-[10px] font-mono font-medium text-neutral-600 dark:text-neutral-300">
              +{remainingCount}
            </div>
          )}
        </div>

        <div className="flex flex-col text-[11px] leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-neutral-900 dark:text-white">
              <strong className="font-bold">{totalCount}</strong> viewing now
            </span>
          </div>
        </div>
      </button>
    );
  }

  // Hero variant matching the uploaded screenshot
  return (
    <div
      id="hero-live-viewers-card"
      onClick={handleClick}
      className="group inline-flex flex-col items-start gap-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 p-3 sm:p-3.5 shadow-xs hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 cursor-pointer backdrop-blur-xs select-none"
      role="button"
      tabIndex={0}
      aria-label="View current visitors and audience log"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* 1. Overlapping Circular Sketch Avatars + Count Bubble */}
      <div className="flex items-center -space-x-2">
        {displayAvatars.map((avatarId, idx) => (
          <div
            key={idx}
            className="relative rounded-full ring-2 ring-white dark:ring-neutral-900 shadow-xs transition-transform duration-150 group-hover:scale-105"
            style={{ zIndex: 10 - idx }}
          >
            <SketchAvatar id={avatarId} size={30} />
          </div>
        ))}

        {remainingCount > 0 && (
          <div
            className="relative flex h-[30px] w-[30px] items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-800 ring-2 ring-white dark:ring-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 shadow-xs group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700 transition-colors"
            style={{ zIndex: 6 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>

      {/* 2. Text label matching uploaded image: "9 people viewing now" */}
      <div className="flex items-center gap-1.5 pt-0.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <p className="text-xs sm:text-[13px] font-mono text-neutral-800 dark:text-neutral-200">
          <span className="font-bold text-neutral-950 dark:text-white text-sm">{totalCount}</span> people viewing now
        </p>
      </div>

      {/* 3. Subtext matching screenshot footer "_ community_chat / visitor log" */}
      <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors pt-0.5">
        <span className="text-neutral-300 dark:text-neutral-600">↳</span>
        <span className="underline decoration-dotted underline-offset-2">who is viewing · guestbook</span>
      </div>
    </div>
  );
}
