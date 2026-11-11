import type { Metadata } from 'next';
import Link from 'next/link';
import MiniWindow from '@/components/home/Minis';
import Schematic from '@/components/home/Schematic';
import { Footer, Header, Page } from '@/components/site/Shell';
import { featuredProjects } from '@/data/projects';
import { credentials, jobs, site } from '@/data/site';
import { formatMonth, getPosts } from '@/lib/feeds';
import { external } from '@/lib/links';
import { btnOutline, btnPrimary } from '@/lib/ui';

export const metadata: Metadata = { alternates: { canonical: '/' } };

function Chip() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 28"
      className="text-acc inline-block h-[0.82em] w-[1.4em] align-middle"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="12" y="4" width="24" height="20" rx="2" />
      <path d="M17 4V0M24 4V0M31 4V0M17 28v-4M24 28v-4M31 28v-4M12 10H6M12 18H6M36 10h6M36 18h6" />
      <circle cx="17" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

const featuredLink = 'text-fg decoration-accent inline-flex min-h-11 items-center self-start font-medium decoration-2';
const sectionTitle = 'm-0 font-display text-[40px] leading-none font-normal uppercase';

export default async function Home() {
  const work = featuredProjects();
  const posts = (await getPosts()).slice(0, 3);

  return (
    <Page gap="clamp(64px,10cqi,128px)">
      {/* Header, hero and lab sit tighter than the page rhythm: same clamp, 48px less. */}
      <div className="flex flex-col gap-[calc(clamp(64px,10cqi,128px)-48px)]">
        <Header current={null} />

        <section id="top" className="rise flex flex-col gap-9">
          <p className="text-fg3 m-0 flex flex-wrap items-center gap-2.5 font-mono text-[13px] tracking-[0.08em] uppercase">
            <span>
              {site.name} · {site.location}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-2">
              <span className="bg-accent size-2 rounded-full" />
              {site.status}
            </span>
          </p>
          <h1 className="m-0 max-w-[18ch] text-[clamp(44px,6.2cqi,92px)] leading-[1.08] font-light tracking-[-0.03em]">
            Software &amp; <span className="text-acc font-serif tracking-[-0.01em] italic">AI</span>{' '}
            Engineer. <span className="text-fg2">Six years of mobile. Now agents and circuits</span>{' '}
            <Chip />
          </h1>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <p className="text-fg2 m-0 max-w-[52ch] flex-[1_1_420px] text-[19px] leading-[1.6]">
              I build infrastructure people don&apos;t notice until it breaks: SDKs, caching
              libraries, kiosk launchers, CI pipelines. Senior Android at Grimaldi Group, consultant
              for Product Studio (VFD Group), final-year Computer Engineering at UNILAG.
            </p>
            <a href={`mailto:${site.email}`} className={`${btnPrimary} flex-none`}>
              Get in touch
            </a>
            <a
              href={site.cvUrl}
              {...external(site.cvUrl)}
              data-track="cv_open"
              data-track-from="hero"
              className={`${btnOutline} flex-none`}
            >
              CV ↗
            </a>
          </div>
        </section>

        <section
          aria-label="Lab"
          className="border-line bg-surface flex flex-col gap-7 rounded-[20px] border p-6"
        >
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-xs">
            <span className="text-fg">
              <span className="text-acc">~/lab</span> · Edge AI on a microcontroller
            </span>
            <span className="text-fg3">Final-year project · details after submission</span>
          </div>
          <div className="overflow-x-auto">
            <Schematic />
          </div>
          {/* Ask box: UI only until the backend exists. When built, it must answer only from
            public material (CV, case studies, public READMEs), never the vault or academics/fyp/. */}
          <form
            role="search"
            aria-label="Ask about my work (coming soon)"
            className="flex w-full max-w-[640px] flex-col gap-3 self-center pb-2"
          >
            <label htmlFor="ask" className="text-fg3 text-center font-mono text-xs">
              Ask about my work · answers will come only from my CV, case studies and public repos
            </label>
            <div className="border-line2 bg-bg flex items-center gap-2.5 rounded-full border py-1.5 pr-1.5 pl-5">
              <span aria-hidden="true" className="text-acc font-mono">
                &gt;
              </span>
              <input
                id="ask"
                type="text"
                disabled
                placeholder="what did you build at Grimaldi?"
                className="text-fg placeholder:text-fg3 min-h-11 min-w-0 flex-1 bg-transparent text-base focus:outline-none disabled:cursor-not-allowed"
              />
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="border-line2 text-fg3 min-h-11 shrink-0 cursor-not-allowed rounded-full border px-5 font-mono text-xs"
              >
                Coming soon
              </button>
            </div>
            <div aria-hidden="true" className="flex flex-wrap justify-center gap-2">
              {['Which banks does bankstract parse?', 'How does Retrostash invalidate?'].map(
                (q) => (
                  <span
                    key={q}
                    className="border-line text-fg3 inline-flex min-h-9 items-center rounded-full border px-3.5 text-[13px]"
                  >
                    {q}
                  </span>
                )
              )}
            </div>
          </form>
        </section>
      </div>

      <section id="work" className="flex flex-col gap-[clamp(56px,8cqi,112px)]">
        <div className="border-line flex items-baseline justify-between border-b pb-4">
          <h2 className={sectionTitle}>Work</h2>
          <Link href="/projects/" className="text-fg2 decoration-accent text-sm">
            All projects →
          </Link>
        </div>
        {work.map((p, i) => {
          const href = p.caseStudySlug
            ? `/projects/${p.caseStudySlug}/`
            : (p.links[0]?.href ?? '/projects/');
          return (
            <article
              key={p.title}
              className={`flex flex-wrap items-center gap-14 ${i % 2 ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
                <span className="text-fg3 font-mono text-[13px]">
                  <span className="text-acc">{String(i + 1).padStart(2, '0')}</span> · {p.kind}
                </span>
                <h3 className="m-0 text-[clamp(44px,5.5cqi,80px)] leading-[0.95] font-light tracking-[-0.04em]">
                  {p.title}
                </h3>
                <p className="text-fg2 m-0 max-w-[42ch] text-lg leading-[1.6]">
                  {p.homeLine ?? p.line}
                </p>
                <span className="text-fg3 font-mono text-[13px]">{p.homeStack ?? p.stack}</span>
                {/* Case studies are in-site: client navigation and a → arrow. Outbound links keep ↗. */}
                {p.caseStudySlug ? (
                  <Link
                    href={href}
                    data-track="home_project"
                    data-track-project={p.title}
                    className={featuredLink}
                  >
                    {p.homeCta ?? 'Read the case study'} →
                  </Link>
                ) : (
                  <a
                    href={href}
                    {...external(href)}
                    data-track="home_project"
                    data-track-project={p.title}
                    className={featuredLink}
                  >
                    {p.homeCta ?? 'View project'} ↗
                  </a>
                )}
              </div>
              {p.mini ? <MiniWindow kind={p.mini} /> : null}
            </article>
          );
        })}
      </section>

      <section id="about" className="flex flex-wrap gap-12">
        <h2 className={`${sectionTitle} flex-[1_1_240px]`}>About</h2>
        <div className="flex min-w-0 flex-[3_1_600px] flex-col gap-8">
          <p className="text-fg2 m-0 text-[clamp(18px,2.4cqi,26px)] leading-normal font-light">
            Android is the home base: launchers, device policy, SDKs that walk the view tree at
            runtime. The rest of the stack comes along when the job needs it, Kotlin Multiplatform,
            React, Python, C#/.NET. I&apos;ve mentored eight HNG cohorts and now run review
            infrastructure for the Zedu org. On my own time I build what I wanted and nobody
            shipped.
          </p>
          <ul className="m-0 list-none p-0">
            {jobs.map((j) => (
              <li
                key={j.org}
                className="border-line grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-6 gap-y-1 border-b py-4"
              >
                <span className="font-medium">{j.org}</span>
                <span className="text-fg2 text-[15px]">{j.role}</span>
                <span className="text-fg3 font-mono text-[13px]">{j.dates}</span>
              </li>
            ))}
          </ul>
          <p className="text-fg2 m-0 text-[15px]">{credentials}</p>
        </div>
      </section>

      <section id="writing" className="flex flex-col gap-6">
        <div className="border-line flex items-baseline justify-between border-b pb-4">
          <h2 className={sectionTitle}>
            Recent{' '}
            <span className="text-acc font-serif text-[46px] font-normal normal-case italic">
              writing
            </span>
          </h2>
          <Link href="/writing/" className="text-fg2 decoration-accent text-sm">
            All posts →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.href}
              {...external(post.href)}
              className="border-line bg-surface text-fg flex flex-col gap-3 rounded-xl border p-5 no-underline"
            >
              <span className="text-fg3 font-mono text-xs">
                {formatMonth(post.date)} · {post.sources[0]}
              </span>
              <span className="text-lg leading-[1.4] font-medium">{post.title}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-line flex flex-col gap-7 border-t pt-10">
        <p className="font-display m-0 text-[clamp(48px,8cqi,120px)] leading-[0.95] uppercase">
          Got something hard?
          <br />
          Send it.
        </p>
      </section>
      <Footer />
    </Page>
  );
}
