import { MouseEvent } from 'react';
import useAnalytics from './useAnalytics.ts';

export default function useSmoothScroll() {
  const { trackNavigation } = useAnalytics();

  const scroll = (href: string, e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const targetId = href.replace('#', '');

    trackNavigation(targetId);

    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return { scroll };
}
