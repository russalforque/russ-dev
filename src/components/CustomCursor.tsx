import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if desktop pointer and not prefers-reduced-motion
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isVisible = false;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '0.5';
      }

      // Check if hovering an interactive target
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest('a, button, [role="button"], input, select, textarea, [data-interactive]');
      if (interactive !== isHovering) {
        isHovering = interactive;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const render = () => {
      // Lerp ring towards mouse
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      // Direct DOM transformation for smooth performance
      dot.style.transform = `translate3d(${mouseX - 2.5}px, ${mouseY - 2.5}px, 0) scale(${isHovering ? 1.4 : 1})`;
      const scale = isHovering ? 1.5 : 1;
      ring.style.transform = `translate3d(${ringX - 14}px, ${ringY - 14}px, 0) scale(${scale})`;

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Tiny central dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-emerald-400 opacity-0 transition-opacity duration-150 will-change-transform"
      />
      {/* Smooth outer tracking ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-7 w-7 rounded-full border border-neutral-400 dark:border-neutral-500 opacity-0 transition-[border-color,opacity] duration-150 will-change-transform"
      />
    </div>
  );
}
