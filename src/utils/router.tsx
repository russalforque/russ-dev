import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react';
import { soundManager } from './sound';

/** Pages that live at their own URL; everything else is a section of the home page. */
export const PAGES = ['projects', 'experience', 'stack', 'certifications'] as const;
export type Page = (typeof PAGES)[number];

const NAVIGATE_EVENT = 'app:navigate';

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

/** Current pathname without a trailing slash ("/" for home). */
export function usePath() {
  return useSyncExternalStore(subscribe, () => window.location.pathname.replace(/(.)\/$/, '$1'));
}

export function pageFromPath(path: string): Page | null {
  const name = path.replace(/^\//, '');
  return (PAGES as readonly string[]).includes(name) ? (name as Page) : null;
}

/** Client-side navigation. "/#contact" goes home, then scrolls to the section. */
export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const samePage = url.pathname === window.location.pathname;
  if (url.pathname + url.hash !== window.location.pathname + window.location.hash) {
    history.pushState(null, '', url.pathname + url.hash);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
  }

  const id = url.hash.slice(1);
  // Wait a frame so a freshly rendered page has its sections in the DOM.
  requestAnimationFrame(() => {
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ behavior: samePage ? 'smooth' : 'auto' });
    else window.scrollTo({ top: 0, behavior: samePage ? 'smooth' : 'auto' });
  });
}

/** In-app link: plain clicks route client-side; modified clicks behave like a normal link. */
export function Link({
  to,
  onClick,
  ...props
}: { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    soundManager.playTick(1000);
    navigate(to);
  };
  return <a href={to} onClick={handleClick} {...props} />;
}
