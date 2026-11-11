'use client';

import { useEffect } from 'react';
import { tap } from '@/lib/feedback';

// One delegated listener: every link and button gets a tap sound and haptic.
// Elements that play their own feedback (theme and sound toggles) opt out with
// data-feedback="own".
export default function Feedback() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest('a, button');
      if (!el || el.getAttribute('data-feedback') === 'own') return;
      tap();
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
