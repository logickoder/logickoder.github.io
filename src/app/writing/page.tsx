import type { Metadata } from 'next';
import { Eyebrow, Footer, Header, Page } from '@/components/site/Shell';
import { formatDay, formatMonth, getPosts } from '@/lib/feeds';
import { site } from '@/data/site';
import { external } from '@/lib/links';
import { btnOutline, btnPrimary } from '@/lib/ui';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'What broke, why, and the fix. Substack first, cross-posted to Medium.',
  alternates: { canonical: '/writing/' }
};

export default async function WritingPage() {
  const posts = await getPosts();
  const [latest, ...rest] = posts;
  const years = [...new Set(rest.map((p) => p.date.slice(0, 4)))];

  return (
    <Page>
      <Header current="writing" />

      <section className="flex flex-wrap items-end gap-x-16 gap-y-8">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <Eyebrow>~/writing · {posts.length} posts</Eyebrow>
          <h1 className="m-0 font-display text-[clamp(64px,11cqi,160px)] leading-[0.9] font-normal uppercase">
            Recent <span className="font-serif text-acc normal-case italic">writing</span>
          </h1>
          <p className="m-0 max-w-[56ch] text-[19px] leading-[1.6] text-fg2">
            What broke, why, and the fix. Substack first, cross-posted to Medium.
          </p>
        </div>
        <div className="flex flex-[1_1_300px] flex-col gap-2.5">
          <a href={site.substack} {...external(site.substack)} className={btnPrimary}>
            Subscribe on Substack ↗
          </a>
          <a href={site.medium} {...external(site.medium)} className={btnOutline}>
            Read on Medium ↗
          </a>
        </div>
      </section>

      {latest ? (
        <a href={latest.href} {...external(latest.href)} className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-8 text-fg no-underline">
          <span className="font-mono text-xs text-fg3">
            <span className="text-acc">Latest</span> · {formatMonth(latest.date)} · {latest.sources.join(' · ')}
          </span>
          <span className="max-w-[28ch] text-[clamp(32px,4cqi,52px)] leading-[1.05] font-light tracking-[-0.03em]">{latest.title}</span>
          <span className="text-[15px] font-medium underline decoration-accent decoration-2">Read the post ↗</span>
        </a>
      ) : null}

      <section className="flex flex-col gap-14">
        {years.map((y) => (
          <div key={y} className="flex flex-wrap gap-x-12 gap-y-6">
            <h2 className="m-0 flex-[0_0_160px] font-display text-[48px] leading-none font-normal text-fg3">{y}</h2>
            <ul className="m-0 min-w-0 flex-[1_1_600px] list-none border-t border-line p-0">
              {rest
                .filter((p) => p.date.startsWith(y))
                .map((p) => (
                  <li key={p.title} className="border-b border-line">
                    <a href={p.href} {...external(p.href)} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-[22px] text-fg no-underline">
                      <span className="max-w-[60ch] text-[22px] leading-[1.3]">{p.title}</span>
                      <span className="font-mono text-xs text-fg3">
                        {formatDay(p.date)} · {p.sources.join(' · ')} ↗
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>
      <Footer />
    </Page>
  );
}
