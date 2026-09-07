import React from 'react';

export interface SketchAvatarProps {
  id?: string;
  className?: string;
  size?: number;
}

export default function SketchAvatar({ id = 'sketch-1', className = '', size = 32 }: SketchAvatarProps) {
  // Line-art monochrome sketch portraits matching the hand-drawn artistic style in the user's screenshot
  switch (id) {
    case 'sketch-2':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 select-none ${className}`}
        >
          <circle cx="24" cy="24" r="23" className="fill-white dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.5" />
          {/* Head & neck */}
          <path d="M24 13c-5.5 0-9 4-9 9.5 0 5 3.5 8.5 9 8.5s9-3.5 9-8.5c0-5.5-3.5-9.5-9-9.5z" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.5" strokeLinecap="round" />
          {/* Spiky hair */}
          <path d="M15 17c1-5 4-8 8-9 4 1 7 4 8 8-2-2-4-3-8-3s-6 1-8 4z" className="fill-neutral-900 dark:fill-neutral-100 stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" />
          {/* Glasses */}
          <rect x="17" y="19" width="5.5" height="4" rx="1.5" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.3" />
          <rect x="25.5" y="19" width="5.5" height="4" rx="1.5" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.3" />
          <path d="M22.5 21h3" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" />
          {/* Nose & Smile */}
          <path d="M24 23v2l1 .5" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M21 27c1.5 1.2 4.5 1.2 6 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.3" strokeLinecap="round" />
          {/* Shoulders & Jacket */}
          <path d="M11 44c1-9 6-13 13-13s12 4 13 13" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 31v6m6-6v6" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'sketch-3':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 select-none ${className}`}
        >
          <circle cx="24" cy="24" r="23" className="fill-white dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.5" />
          {/* Bob cut hair */}
          <path d="M14 24c0-7 4-13 10-13s10 6 10 13v4c0 1-2 2-3 0-1-3-2-5-2-5-1 4-2 6-5 6s-4-2-5-6c0 0-1 2-2 5-1 2-3 1-3 0v-4z" className="fill-neutral-900 dark:fill-neutral-100" />
          {/* Face */}
          <path d="M17 21c0 5 3 8.5 7 8.5s7-3.5 7-8.5" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.4" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="20" cy="21" r="1.2" className="fill-neutral-900 dark:fill-neutral-100" />
          <circle cx="28" cy="21" r="1.2" className="fill-neutral-900 dark:fill-neutral-100" />
          {/* Smirk */}
          <path d="M22 25.5c1 .8 3 .8 4 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
          {/* Turtleneck collar & shoulders */}
          <path d="M19 32h10v4H19v-4z" className="stroke-neutral-900 dark:stroke-neutral-100 fill-white dark:fill-neutral-900" strokeWidth="1.3" />
          <path d="M10 44c1-7 6-9 9-9h10c3 0 8 2 9 9" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'sketch-4':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 select-none ${className}`}
        >
          <circle cx="24" cy="24" r="23" className="fill-white dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.5" />
          {/* Beanie Hat */}
          <path d="M16 17c1-6 4-8 8-8s7 2 8 8c0 1-1 2-2 2H18c-1 0-2-1-2-2z" className="fill-neutral-900 dark:fill-neutral-100" />
          <path d="M15 19h18v3H15v-3z" className="stroke-neutral-900 dark:stroke-neutral-100 fill-neutral-200 dark:fill-neutral-800" strokeWidth="1.2" />
          {/* Face & Beard */}
          <path d="M17 21v4c0 4.5 3 7.5 7 7.5s7-3 7-7.5v-4" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.4" />
          <path d="M19 26c1 3 3 5 5 5s4-2 5-5" className="fill-neutral-900 dark:fill-neutral-100 stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="20.5" cy="23" r="1.2" className="fill-neutral-900 dark:fill-neutral-100" />
          <circle cx="27.5" cy="23" r="1.2" className="fill-neutral-900 dark:fill-neutral-100" />
          {/* Hoodie */}
          <path d="M9 44c1-8 6-12 15-12s14 4 15 12" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 34l3 5 3-5" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.3" />
        </svg>
      );

    case 'sketch-5':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 select-none ${className}`}
        >
          <circle cx="24" cy="24" r="23" className="fill-white dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.5" />
          {/* High Bun / Ponytail */}
          <circle cx="24" cy="9" r="4.5" className="fill-neutral-900 dark:fill-neutral-100" />
          {/* Wavy hair strands */}
          <path d="M16 19c2-5 5-7 8-7s6 2 8 7c0 4-1 6-2 7-2-3-4-4-6-4s-4 1-6 4c-1-1-2-3-2-7z" className="fill-neutral-900 dark:fill-neutral-100" />
          {/* Face */}
          <path d="M18 20v4c0 4 2.5 6.5 6 6.5s6-2.5 6-6.5v-4" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.4" />
          {/* Sharp eyes & smile */}
          <path d="M19.5 22.5c1-.5 2-.5 3 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M25.5 22.5c1-.5 2-.5 3 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M22 26.5c1 .8 3 .8 4 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
          {/* Hoop earring */}
          <circle cx="16" cy="24" r="1.5" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1" />
          {/* Shoulders */}
          <path d="M11 44c1-8 6-12 13-12s12 4 13 12" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'sketch-6':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 select-none ${className}`}
        >
          <circle cx="24" cy="24" r="23" className="fill-white dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.5" />
          {/* Cap backwards */}
          <path d="M16 16c2-4 5-6 8-6s6 2 8 6h-16z" className="fill-neutral-900 dark:fill-neutral-100" />
          <path d="M14 16c1-1 3-2 6-2h8c3 0 5 1 6 2l3 2H11l3-2z" className="stroke-neutral-900 dark:stroke-neutral-100 fill-white dark:fill-neutral-900" strokeWidth="1.2" />
          {/* Face */}
          <path d="M18 19v4c0 4 2.5 6.5 6 6.5s6-2.5 6-6.5v-4" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.4" />
          {/* Eyes & Smile */}
          <circle cx="20.5" cy="21.5" r="1.2" className="fill-neutral-900 dark:fill-neutral-100" />
          <circle cx="27.5" cy="21.5" r="1.2" className="fill-neutral-900 dark:fill-neutral-100" />
          <path d="M21.5 25.5c1.5 1.5 3.5 1.5 5 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.3" strokeLinecap="round" />
          {/* Collar & hoodie */}
          <path d="M10 44c1-8 6-12 14-12s13 4 14 12" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'sketch-1':
    default:
      // Default: Clean hand-drawn silhouette exactly reflecting the center avatar in user's image
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 select-none ${className}`}
        >
          <circle cx="24" cy="24" r="23" className="fill-white dark:fill-neutral-900 stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1.5" />
          {/* Sketch side-part hair */}
          <path d="M15 17c1-4 4-7 9-7 5 0 8 3 9 7-2-2-5-3-9-3s-7 1-9 3z" className="fill-neutral-900 dark:fill-neutral-100 stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" />
          {/* Face outline */}
          <path d="M17 19v4.5c0 4.5 3 7.5 7 7.5s7-3 7-7.5V19" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.5" strokeLinecap="round" />
          {/* Eyes & Eyebrows */}
          <path d="M19 19c1-.5 2-.5 3 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M26 19c1-.5 2-.5 3 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="20.5" cy="21.5" r="1.1" className="fill-neutral-900 dark:fill-neutral-100" />
          <circle cx="27.5" cy="21.5" r="1.1" className="fill-neutral-900 dark:fill-neutral-100" />
          {/* Nose & Smile */}
          <path d="M24 22v2.2l.8.3" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M21.5 26c1.5 1.2 3.5 1.2 5 0" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.3" strokeLinecap="round" />
          {/* Neck & Buttoned Collar */}
          <path d="M21 31v3m6-3v3" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" />
          <path d="M10 44c1-8 6-12 14-12s13 4 14 12" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 34v10" className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
  }
}
