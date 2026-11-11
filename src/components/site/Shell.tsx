import Link from 'next/link';
import { site } from '@/data/site';
import SoundToggle from './SoundToggle';
import ThemeToggle from './ThemeToggle';
import { external } from '@/lib/links';

type Current = 'work' | 'about' | 'writing' | null;

const nav: { key: Exclude<Current, null>; label: string; href: string }[] = [
  { key: 'work', label: 'Work', href: '/projects/' },
  { key: 'about', label: 'About', href: '/#about' },
  { key: 'writing', label: 'Writing', href: '/writing/' }
];

export function Wordmark() {
  return (
    <Link href="/" className="font-display text-[28px] leading-none tracking-[0.02em] text-fg uppercase no-underline">
      LOGICKODER<span className="text-acc">.DEV</span>
    </Link>
  );
}

export function Header({ current, showNav = true }: { current: Current; showNav?: boolean }) {
  return (
    // Phone: wordmark + toggles on one row, nav full width below. Wider: one row.
    <header className="flex flex-wrap items-center gap-3">
      <div className="order-1 mr-auto">
        <Wordmark />
      </div>
      <div className="order-2 flex items-center gap-3 sm:order-3">
        <SoundToggle />
        <ThemeToggle />
      </div>
      {showNav ? (
        <nav
          aria-label="Primary"
          className="order-3 flex w-full justify-between gap-1.5 rounded-full border border-line p-1 sm:order-2 sm:w-auto sm:justify-start"
        >
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={current === item.key ? 'page' : undefined}
              className={`inline-flex min-h-10 flex-1 items-center justify-center rounded-full px-4 text-sm no-underline sm:flex-none ${
                current === item.key ? 'bg-fg text-bg' : 'text-fg2 hover:text-fg'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
      <a
        href={`mailto:${site.email}`}
        className="text-[clamp(22px,3cqi,32px)] font-light text-fg decoration-accent decoration-2"
      >
        {site.email}
      </a>
      <span className="flex flex-wrap gap-5 font-mono text-[13px]">
        <a href={site.cvUrl} {...external(site.cvUrl)} data-track="cv_open" data-track-from="footer" className="text-fg2 hover:text-fg">
          CV
        </a>
        {site.social.map((s) => (
          <a key={s.label} href={s.href} {...external(s.href)} className="text-fg2 hover:text-fg">
            {s.label}
          </a>
        ))}
      </span>
    </footer>
  );
}

/** Page frame: 1344px column with rule lines on wide screens, container for cqi units. */
export function Page({ children, gap = 'clamp(48px,6cqi,80px)' }: { children: React.ReactNode; gap?: string }) {
  return (
    <div className="min-h-screen bg-bg px-4 text-fg [container-name:page] [container-type:inline-size]">
      <div
        className="frame mx-auto flex min-h-screen max-w-[1344px] flex-col px-[clamp(0px,2cqi,24px)] pt-6 pb-[120px]"
        style={{ gap }}
      >
        {children}
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="m-0 font-mono text-[13px] tracking-[0.08em] text-fg3 uppercase">{children}</p>;
}
