'use client';

import { useEffect, useRef } from 'react';

// Marks its box data-inview="true" the first time it scrolls into view, which
// starts the CSS sequences in globals.css (`.seq > *`). Plays once.
export default function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Also fire for a box already above the viewport (anchor jump, fast
        // scroll), so nothing stays blank behind the reader.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          el.dataset.inview = 'true';
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-inview="false" className={className}>
      {children}
    </div>
  );
}
