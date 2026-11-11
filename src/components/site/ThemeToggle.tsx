'use client';

import { useState, useSyncExternalStore } from 'react';
import { track } from '@/lib/analytics';
import { toggle } from '@/lib/feedback';
import { THEME_KEY, load, save } from '@/lib/storage';

const noopSubscribe = () => () => {};

// First-visit hint, read from the DOM after hydration (null on the server).
function useHint(): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => (load(THEME_KEY) ? null : document.documentElement.getAttribute('data-theme') === 'dark' ? 'Tap the moon' : 'Tap the sun'),
    () => null
  );
}

// The sun or moon is the control (Danfo pattern). The pre-paint script already
// set data-theme, so both icons render and CSS shows the right one.
export default function ThemeToggle() {
  const initialHint = useHint();
  const [dismissed, setDismissed] = useState(false);
  const hint = dismissed ? null : initialHint;

  function flip(e: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const apply = () => root.setAttribute('data-theme', next);

    // New theme spreads as a circle from the button. Instant where View
    // Transitions are missing or the visitor asked for reduced motion.
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || still) {
      apply();
    } else {
      const box = e.currentTarget.getBoundingClientRect();
      const x = box.left + box.width / 2;
      const y = box.top + box.height / 2;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.startViewTransition(apply).ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      });
    }
    toggle(next === 'light');
    track('theme_toggle', { to: next });
    save(THEME_KEY, next);
    setDismissed(true);
  }

  return (
    <div className="flex items-center gap-3">
      {hint ? <span className="hidden font-mono text-xs text-fg3 sm:inline">{hint} →</span> : null}
      <button
        type="button"
        onClick={flip}
        data-feedback="own"
        aria-label="Switch between day and night theme"
        className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-fg"
      >
        <svg className="only-dark" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
        <svg className="only-light" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
      </button>
    </div>
  );
}
