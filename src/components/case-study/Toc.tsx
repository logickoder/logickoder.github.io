'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

// Sticky table of contents. The dot follows the section in view.
export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -65% 0px' }
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="flex flex-col gap-1 font-mono text-[13px] lg:sticky lg:top-8">
      <span className="mb-2.5 text-[11px] tracking-[0.08em] text-fg3 uppercase">On this page</span>
      {items.map((s) => {
        const on = s.id === active;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={on ? 'location' : undefined}
            className={`flex min-h-10 items-center gap-3 no-underline ${on ? 'text-fg' : 'text-fg3 hover:text-fg2'}`}
          >
            <span
              aria-hidden="true"
              className={`size-2 shrink-0 rounded-full ${on ? 'bg-accent shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_25%,transparent)]' : 'bg-line2'}`}
            />
            {s.label}
          </a>
        );
      })}
    </nav>
  );
}
