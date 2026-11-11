import Link from 'next/link';
import { Header, Page } from '@/components/site/Shell';
import { site } from '@/data/site';
import { btnOutline, btnPrimary } from '@/lib/ui';

export default function NotFound() {
  return (
    <Page gap="clamp(40px,6cqi,72px)">
      <Header current={null} showNav={false} />
      <main className="flex grow flex-col justify-center gap-8">
        <p className="m-0 font-mono text-[13px] text-fg3">
          GET this path <span className="text-acc">→ 404</span>
        </p>
        <h1 className="m-0 font-display text-[clamp(96px,22cqi,300px)] leading-[0.85] font-normal uppercase">404</h1>
        <p className="m-0 text-[clamp(30px,4.5cqi,60px)] leading-[1.1] font-light tracking-[-0.03em]">
          Open <span className="font-serif text-acc italic">circuit.</span> This page isn&apos;t wired to anything.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface px-5 py-4">
          <svg
            role="img"
            aria-label="Schematic of an open switch: current stops at the break, the lamp stays off."
            viewBox="0 -24 900 164"
            className="block h-auto w-full min-w-[560px] font-mono text-line2"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M40 60h20M40 84h20" strokeWidth={2.2} />
            <path d="M45 72h10M45 96h10" strokeWidth={4} />
            <path d="M50 60V30h330" />
            <path d="M50 96v24h790V30H520" />
            <circle cx="380" cy="30" r="4" fill="currentColor" />
            <circle cx="520" cy="30" r="4" fill="currentColor" />
            <path d="M380 30l110 -34" className="text-accent" strokeWidth={2.4} />
            <g className="spark text-accent" strokeWidth={2}>
              <path d="M448 44l8 8M464 40v12M476 46l-6 8" />
            </g>
            <circle cx="680" cy="30" r="16" className="fill-bg" />
            <path d="M669 19l22 22M691 19l-22 22" />
            <g className="text-accent" strokeWidth={2.4} strokeDasharray="3 14">
              <path className="flow" d="M50 60V30h330" />
            </g>
            <g stroke="none" fontSize={12} className="fill-fg3">
              <text x="70" y="78">12V</text>
              <text x="410" y="76">route missing</text>
              <text x="660" y="66">this page</text>
            </g>
          </svg>
        </div>
        <nav aria-label="Where to go" className="flex flex-wrap gap-2.5">
          <Link href="/" className={btnPrimary}>
            Back home
          </Link>
          <Link href="/projects/" className={btnOutline}>
            All projects
          </Link>
          <Link href="/writing/" className={btnOutline}>
            Writing
          </Link>
        </nav>
        <p className="m-0 text-[15px] text-fg2">
          Followed a broken link from somewhere? Tell me at{' '}
          <a href={`mailto:${site.email}`} className="text-fg decoration-accent decoration-2">
            {site.email}
          </a>
          .
        </p>
      </main>
    </Page>
  );
}
