'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { startAnalytics, track, trackPageview } from '@/lib/analytics';

// What visitors do, as named events:
// - any element with data-track="name" sends `name` with its data-track-* attributes as props
// - outbound links send `outbound_click`, mailto links send `email_click`
// - case-study pages send `read_depth` at 25/50/75/100% scroll
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    void startAnalytics();

    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track], a[href]');
      if (!el) return;
      const name = el.dataset.track;
      if (name) {
        const props: Record<string, string> = {};
        for (const [k, v] of Object.entries(el.dataset)) {
          if (k.startsWith('track') && k !== 'track' && v) props[k.slice(5, 6).toLowerCase() + k.slice(6)] = v;
        }
        track(name, props);
        return;
      }
      const href = el.getAttribute('href') ?? '';
      if (href.startsWith('mailto:')) track('email_click', { from: window.location.pathname });
      else if (/^https?:\/\//.test(href) && !href.startsWith(window.location.origin)) {
        track('outbound_click', { url: href, text: el.textContent?.trim().slice(0, 60), from: window.location.pathname });
      }
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  useEffect(() => {
    trackPageview(pathname);
    if (!pathname.startsWith('/projects/') || pathname === '/projects/') return;

    const slug = pathname.split('/').filter(Boolean)[1];
    const sent = new Set<number>();
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark - 1 && !sent.has(mark)) {
          sent.add(mark);
          track('read_depth', { case_study: slug, percent: mark });
        }
      }
      if (sent.size === 4) window.removeEventListener('scroll', onScroll);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
