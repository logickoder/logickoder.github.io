import { MouseEvent } from 'react';
import useAnalytics from './useAnalytics.ts';

export default function useSmoothScroll() {
  const { trackNavigation } = useAnalytics();

  const scroll = (href: string, e: MouseEvent<HTMLElement>) => {
    // Only intercept in-page anchors; let router-managed paths navigate normally.
    if (!href.startsWith('#')) {
      return;
    }

    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);

    if (!target) {
      // Element absent on the current route — fall through to default behavior so
      // routed `/#section` navigation works after Link transitions to homepage.
      return;
    }

    e.preventDefault();
    trackNavigation(targetId);

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return { scroll };
}

