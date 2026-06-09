import { Link } from 'react-router-dom';
import { OpenLinkIcon } from './icons';
import type { CaseStudy, CaseStudySection } from '../data/case-studies';
import { estimateReadingMinutes, getAdjacentCaseStudies } from '../data/case-studies';

interface CaseStudyRendererProps {
  study: CaseStudy;
}

function StatusBadge({ status }: { status: CaseStudy['status'] }) {
  const tone: Record<CaseStudy['status'], string> = {
    shipped: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    'in-progress': 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    archived: 'border-gray-500/40 bg-gray-500/10 text-gray-300',
    'confidential abstract': 'border-rose-500/40 bg-rose-500/10 text-rose-300'
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-[0.18em] uppercase ${tone[status]}`}
    >
      {status}
    </span>
  );
}

function Section({ section, index }: { section: CaseStudySection; index: number }) {
  switch (section.type) {
    case 'heading':
      if (section.level === 2) {
        return (
          <div className={index === 0 ? 'mt-0' : 'mt-16'}>
            <div className="border-primary/40 mb-6 h-px w-12 border-t-2" aria-hidden="true" />
            <h2 className="font-serif text-3xl leading-tight font-bold text-white sm:text-4xl">
              {section.text}
            </h2>
          </div>
        );
      }
      return (
        <h3 className="text-primary mt-10 font-mono text-[0.7rem] leading-relaxed tracking-[0.22em] uppercase sm:text-xs">
          {section.text}
        </h3>
      );
    case 'prose':
      return (
        <p className="mt-5 max-w-[68ch] text-base leading-[1.75] text-gray-200 sm:text-lg sm:leading-[1.85]">
          {section.content}
        </p>
      );
    case 'list':
      return (
        <ul className="mt-6 max-w-[68ch] space-y-3.5">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_1fr] gap-x-4 text-base leading-[1.7] text-gray-200 sm:text-lg sm:leading-[1.8]"
            >
              <span className="text-primary mt-1 font-mono text-xs tabular-nums sm:text-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <figure className="mt-8 max-w-[80ch]">
          <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-gray-700/60 bg-[#0f1419] px-4 py-2">
            <span className="font-mono text-[0.7rem] tracking-[0.18em] text-gray-500 uppercase">
              {section.language}
            </span>
            <span className="text-primary/60 font-mono text-xs">▌</span>
          </div>
          <pre className="overflow-x-auto rounded-b-lg border border-gray-700/60 bg-[#0a0d12] p-5 font-mono text-[0.8rem] leading-relaxed text-gray-100 sm:text-sm">
            <code>{section.code}</code>
          </pre>
        </figure>
      );
    case 'quote':
      return (
        <blockquote className="border-primary mt-8 max-w-[68ch] border-l-2 pl-6">
          <p className="font-serif text-lg leading-relaxed text-gray-100 italic sm:text-xl">
            “{section.text}”
          </p>
          {section.attribution ? (
            <footer className="mt-3 font-mono text-xs tracking-wide text-gray-500">
              · {section.attribution}
            </footer>
          ) : null}
        </blockquote>
      );
  }
}

export default function CaseStudyRenderer({ study }: CaseStudyRendererProps) {
  const readingMinutes = estimateReadingMinutes(study);
  const { prev, next } = getAdjacentCaseStudies(study.slug);

  return (
    <article className="bg-chinese-black min-h-screen text-white">
      {/* Hero */}
      <header className="relative border-b border-gray-800 px-6 py-20 sm:px-10 sm:py-24 lg:px-20 lg:py-28 xl:px-40">
        {/* Soft accent gradient behind hero */}
        <div
          className="from-primary/8 absolute inset-0 bg-linear-to-br via-transparent to-transparent"
          aria-hidden="true"
        />

        <div className="relative container mx-auto max-w-3xl">
          <Link
            to="/projects"
            className="text-primary hover:text-primary-400 mb-10 inline-flex items-center font-mono text-xs tracking-[0.18em] uppercase transition-colors sm:text-sm"
          >
            ← All projects
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={study.status} />
            <span className="font-mono text-xs tracking-[0.18em] text-gray-500 uppercase sm:text-sm">
              {study.year}
            </span>
            <span className="text-gray-700" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs tracking-[0.18em] text-gray-500 uppercase sm:text-sm">
              {study.role}
            </span>
            <span className="text-gray-700" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs tracking-[0.18em] text-gray-500 uppercase sm:text-sm">
              {readingMinutes} min read
            </span>
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[0.95] font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl font-serif text-xl leading-snug text-gray-300 italic sm:text-2xl">
            {study.tagline}
          </p>

          <p className="mt-8 max-w-[72ch] text-base leading-[1.75] text-gray-400 sm:text-lg sm:leading-[1.85]">
            {study.summary}
          </p>

          {study.badges && study.badges.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {study.badges.map((badge) =>
                badge.href ? (
                  <a
                    key={badge.src}
                    href={badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <img src={badge.src} alt={badge.alt} className="h-6" />
                  </a>
                ) : (
                  <img key={badge.src} src={badge.src} alt={badge.alt} className="h-6" />
                )
              )}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-2">
            {study.tech.map((tag) => (
              <span
                key={tag}
                className="border-primary/30 bg-primary/10 text-primary rounded-full border px-3 py-1 font-mono text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {study.links && study.links.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {study.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary text-primary hover:bg-primary inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 font-mono text-xs tracking-wide uppercase transition-colors hover:text-white sm:text-sm"
                >
                  {link.label}
                  <OpenLinkIcon />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* Body */}
      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-20 lg:py-28 xl:px-40">
        <div className="container mx-auto max-w-3xl">
          {study.sections.map((section, index) => (
            <Section key={index} section={section} index={index} />
          ))}
        </div>
      </section>

      {/* Prev / Next nav */}
      {(prev || next) && (
        <section className="border-t border-gray-800 px-6 py-12 sm:px-10 lg:px-20 xl:px-40">
          <div className="container mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/projects/${prev.slug}`}
                className="group hover:border-primary block rounded-lg border border-gray-800 bg-[#161a1e] p-5 transition-colors"
              >
                <span className="text-primary font-mono text-[0.65rem] tracking-[0.22em] uppercase">
                  ← Previous
                </span>
                <p className="mt-2 font-serif text-lg font-bold text-white group-hover:text-white sm:text-xl">
                  {prev.title}
                </p>
                <p className="mt-1 font-mono text-xs tracking-wider text-gray-500 uppercase">
                  {prev.year}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={`/projects/${next.slug}`}
                className="group hover:border-primary block rounded-lg border border-gray-800 bg-[#161a1e] p-5 text-right transition-colors"
              >
                <span className="text-primary font-mono text-[0.65rem] tracking-[0.22em] uppercase">
                  Next →
                </span>
                <p className="mt-2 font-serif text-lg font-bold text-white sm:text-xl">
                  {next.title}
                </p>
                <p className="mt-1 font-mono text-xs tracking-wider text-gray-500 uppercase">
                  {next.year}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="border-t border-gray-800 bg-[#0d1015] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-primary font-mono text-xs tracking-[0.18em] uppercase sm:text-sm">
            Want to talk shop?
          </p>
          <h3 className="mt-4 font-serif text-3xl leading-tight font-bold text-white sm:text-4xl">
            Discuss this work
          </h3>
          <p className="mt-4 text-base text-gray-400 sm:text-lg">
            I&apos;m open to conversations about mobile architecture, KMP rollouts, and shipping
            infrastructure that doesn&apos;t break under real load.
          </p>
          <Link
            to="/"
            className="bg-primary hover:bg-primary-600 mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
          >
            Back to portfolio
          </Link>
        </div>
      </section>
    </article>
  );
}
