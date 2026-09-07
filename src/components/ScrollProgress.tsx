import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollPercentage(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="story-scroll-tracker"
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-neutral-900 to-emerald-400 dark:from-emerald-400 dark:via-white dark:to-emerald-300 transition-all duration-150 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
