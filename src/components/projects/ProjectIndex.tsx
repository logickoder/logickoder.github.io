'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Project, ProjectCategory } from '@/data/projects';
import { external } from '@/lib/links';

const categories: ('All' | ProjectCategory)[] = ['All', 'Mobile', 'Web', 'Full-stack', 'Tools'];

function Row({ p }: { p: Project }) {
  return (
    <article className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 gap-y-3 border-b border-line py-7">
      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-[30px] leading-[1.1] font-light tracking-[-0.02em]">{p.title}</h3>
        <span className="font-mono text-xs text-fg3">{p.kind}</span>
      </div>
      <div className="flex flex-col gap-3.5">
        <p className="m-0 leading-[1.6] text-fg2">{p.line}</p>
        <span className="font-mono text-xs text-fg3">{p.stack}</span>
        {p.caseStudySlug || p.links.length ? (
          <span className="flex flex-wrap gap-2">
            {p.caseStudySlug ? (
              <Link
                href={`/projects/${p.caseStudySlug}/`}
                data-track="case_study_open"
                data-track-project={p.title}
                className="inline-flex min-h-10 items-center rounded-full border-[1.5px] border-accent px-4 text-sm font-semibold text-acc no-underline"
              >
                Case study →
              </Link>
            ) : null}
            {p.links.map((l) => (
              <a key={l.href} href={l.href} {...external(l.href)} data-track="project_link" data-track-project={p.title} data-track-link={l.label} className="inline-flex min-h-10 items-center rounded-full border border-line2 px-4 text-sm text-fg no-underline">
                {l.label} ↗
              </a>
            ))}
          </span>
        ) : null}
      </div>
    </article>
  );
}

function Group({ label, note, accent, items }: { label: string; note?: string; accent?: boolean; items: Project[] }) {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-6">
      <div className="flex flex-[0_0_160px] flex-col gap-2">
        <h2 className={`m-0 font-display font-normal leading-none uppercase ${accent ? 'text-[40px] text-fg' : 'text-[48px] text-fg3'}`}>{label}</h2>
        {note ? <span className="font-mono text-xs leading-normal text-fg3">{note}</span> : null}
      </div>
      <div className="flex min-w-0 flex-[1_1_600px] flex-col border-t border-line">
        {items.map((p) => <Row key={p.title} p={p} />)}
      </div>
    </div>
  );
}

export default function ProjectIndex({ projects, grimaldiNote }: { projects: Project[]; grimaldiNote: string }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const shown = projects.filter((p) => filter === 'All' || p.category === filter);
  const grimaldi = shown.filter((p) => p.group === 'grimaldi');
  const years = [...new Set(shown.flatMap((p) => (p.year ? [p.year] : [])))].sort((a, b) => b - a);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const on = c === filter;
          const n = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              data-track="filter_used"
              data-track-category={c}
              onClick={() => setFilter(c)}
              className={`min-h-11 cursor-pointer rounded-full border px-[18px] text-sm ${on ? 'border-fg bg-fg text-bg' : 'border-line2 bg-transparent text-fg2'}`}
            >
              {c} <span className="font-mono text-xs opacity-75">{n}</span>
            </button>
          );
        })}
      </div>
      <section className="flex flex-col gap-16">
        {grimaldi.length ? <Group label="Grimaldi" note={grimaldiNote} accent items={grimaldi} /> : null}
        {years.map((y) => (
          <Group key={y} label={String(y)} items={shown.filter((p) => p.year === y)} />
        ))}
      </section>
    </>
  );
}
