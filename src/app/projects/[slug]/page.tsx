import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CaseStudyDiagram from '@/components/case-study/Diagrams';
import Inline from '@/components/case-study/Inline';
import Toc, { type TocItem } from '@/components/case-study/Toc';
import { Footer, Header, Page } from '@/components/site/Shell';
import { estimateReadingMinutes, getAdjacentCaseStudies, getCaseStudy, listCaseStudies, type CaseStudySection } from '@/data/case-studies';
import { external } from '@/lib/links';
import { OG_SIZE } from '@/lib/og';

export const dynamicParams = false;

export function generateStaticParams() {
  return listCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.title} · case study`,
    description: study.summary,
    alternates: { canonical: `/projects/${study.slug}/` },
    openGraph: {
      type: 'article',
      title: study.title,
      description: study.tagline,
      images: [{ url: `/og/${study.slug}.png`, ...OG_SIZE, alt: `${study.title} case study` }]
    },
    twitter: { card: 'summary_large_image', images: [`/og/${study.slug}.png`] }
  };
}

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const statusLabel = { shipped: 'Shipped', 'in-progress': 'In progress', archived: 'Archived', 'confidential abstract': 'Confidential abstract' } as const;

function Section({ s }: { s: CaseStudySection }) {
  switch (s.type) {
    case 'heading':
      return s.level === 2 ? (
        <h2 id={slugify(s.text)} className="mt-8 mb-0 scroll-mt-8 font-display text-4xl font-normal text-fg uppercase">
          {s.text}
        </h2>
      ) : (
        <h3 className="mt-2 mb-0 text-[22px] font-medium text-fg">{s.text}</h3>
      );
    case 'prose':
      return (
        <p className="m-0">
          <Inline text={s.content} />
        </p>
      );
    case 'list':
      return (
        <ul className="m-0 flex list-disc flex-col gap-2 pl-[22px] marker:text-acc">
          {s.items.map((it, i) => (
            <li key={i}>
              <Inline text={it} />
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <figure className="my-2 overflow-hidden rounded-[14px] border border-line bg-surface">
          <figcaption className="border-b border-line px-[18px] py-3 font-mono text-xs text-fg3">{s.language}</figcaption>
          <pre className="m-0 overflow-x-auto px-[18px] py-5 font-mono text-sm leading-[1.7] text-fg">
            <code>{s.code}</code>
          </pre>
        </figure>
      );
    case 'quote':
      return (
        <blockquote className="my-2 border-l-2 border-accent py-1 pl-6 font-serif text-[30px] leading-[1.3] text-fg italic">
          {s.text}
          {s.attribution ? <footer className="mt-2 font-mono text-xs text-fg3 not-italic">· {s.attribution}</footer> : null}
        </blockquote>
      );
  }
}

function Adjacent({ study, label, right }: { study?: { slug: string; title: string }; label: string; right?: boolean }) {
  // An empty span keeps "Next" pushed right on the first case study.
  if (!study) return <span />;
  return (
    <Link href={`/projects/${study.slug}/`} className={`flex flex-col gap-1.5 text-fg no-underline ${right ? 'text-right' : ''}`}>
      <span className="font-mono text-xs text-fg3">{label}</span>
      <span className="text-[28px] font-light">{study.title}</span>
    </Link>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const { prev, next } = getAdjacentCaseStudies(study.slug);
  const toc: TocItem[] = study.sections
    .filter((s): s is Extract<CaseStudySection, { type: 'heading' }> => s.type === 'heading' && s.level === 2)
    .map((s) => ({ id: slugify(s.text), label: s.text }));
  const facts = [
    { k: 'Role', v: study.role },
    { k: 'Stack', v: study.tech.slice(0, 4).join(' · ') },
    { k: 'Status', v: statusLabel[study.status] },
    { k: 'Reading', v: `${estimateReadingMinutes(study)} min` }
  ];

  return (
    <Page gap="clamp(48px,5cqi,72px)">
      <Header current="work" />

      <section className="flex flex-col gap-7">
        <Link href="/projects/" className="inline-flex min-h-11 items-center self-start font-mono text-[13px] text-fg2 no-underline">
          ← ~/work
        </Link>
        <p className="m-0 flex flex-wrap items-center gap-2.5 font-mono text-[13px] tracking-[0.06em] text-fg3 uppercase">
          <span className="text-acc">Case study</span>
          <span aria-hidden="true">·</span>
          <span>{study.year}</span>
          <span aria-hidden="true">·</span>
          <span>{study.role}</span>
        </p>
        <h1 className="m-0 text-[clamp(64px,10cqi,148px)] leading-[0.9] font-light tracking-[-0.05em]">{study.title}</h1>
        <p className="m-0 max-w-[30ch] text-[clamp(22px,2.6cqi,32px)] leading-[1.35] font-light text-fg2">{study.tagline}</p>
        {study.links?.length ? (
          <div className="flex flex-wrap gap-2">
            {study.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                {...external(l.href)}
                className={`inline-flex min-h-11 items-center rounded-full px-[18px] text-sm no-underline ${
                  i === 0 ? 'border border-accent bg-accent font-semibold text-on-accent' : 'border border-line2 text-fg'
                }`}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        ) : null}
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] border-y border-line">
          {facts.map((f) => (
            <div key={f.k} className="flex flex-col gap-1.5 py-5 pr-5">
              <dt className="font-mono text-[11px] tracking-[0.08em] text-fg3 uppercase">{f.k}</dt>
              <dd className="m-0 leading-[1.45]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CaseStudyDiagram slug={study.slug} />

      <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
        <div className="max-w-[260px] flex-[1_1_220px] self-stretch">
          <Toc items={toc} />
        </div>
        <article className="flex max-w-[720px] min-w-0 flex-[999_1_560px] flex-col gap-[22px] text-lg leading-[1.7] text-fg2">
          <p className="m-0 text-[22px] leading-[1.55] font-light text-fg">{study.summary}</p>
          {study.badges?.length ? (
            <div className="flex flex-wrap items-center gap-3">
              {study.badges.map((b) => {
                // eslint-disable-next-line @next/next/no-img-element -- remote shields.io badge, static export
                const img = <img src={b.src} alt={b.alt} height={24} className="h-6 w-auto" />;
                return b.href ? (
                  <a key={b.src} href={b.href} {...external(b.href)} className="inline-flex">
                    {img}
                  </a>
                ) : (
                  <span key={b.src} className="inline-flex">
                    {img}
                  </span>
                );
              })}
            </div>
          ) : null}
          {study.sections.map((s, i) => (
            <Section key={i} s={s} />
          ))}
        </article>
      </div>

      <nav aria-label="More case studies" className="flex flex-wrap justify-between gap-4 border-t border-line pt-8">
        <Adjacent study={prev} label="← Previous" />
        <Adjacent study={next} label="Next →" right />
      </nav>
      <Footer />
    </Page>
  );
}
