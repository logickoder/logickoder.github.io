# logickoder.dev

Personal site for **Jeffery Orazulike** · Software & AI Engineer.

Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript, exported as a static site and hosted on GitHub Pages.

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export → out/
pnpm typecheck  # tsc --noEmit
pnpm lint       # ESLint (zero-warnings gate)
```

## Why static on GitHub Pages

This repo is the user site, so it owns `logickoder.dev`. Project sites from other repos
(`/retrostash/`, `/redactly/`, `/keyguarde/`, `/21DaysOfCode/`) resolve under the same domain
only while this site stays on GitHub Pages. `public/app-ads.txt` must stay at the domain root for AdMob.

## Stack

| Concern       | Choice                                                                 |
| ------------- | ---------------------------------------------------------------------- |
| Framework     | Next.js 16, `output: 'export'`, `trailingSlash: true`                   |
| Styling       | Tailwind CSS v4, tokens in `src/app/globals.css` (`@theme inline`)      |
| Type          | Anton (display), Inter (body), Instrument Serif (accents), JetBrains Mono (metadata) via `next/font` |
| Theme         | `html[data-theme]` set before paint: dark by default, light only after the visitor switches. Sun/moon toggle saves to `localStorage` (`logickoder-theme`). Never follows `prefers-color-scheme`. |
| Social images | `next/og`, rendered at build to `/og/home.png` and `/og/<slug>.png`     |
| Writing feed  | Substack + Medium RSS read at build (`src/lib/feeds.ts`), fallback list if a feed is down |
| Analytics     | PostHog (US cloud), loaded after hydration. `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` come from repository variables (`.env.local` locally). Named events via `data-track` attributes; see `src/components/site/Analytics.tsx`. |

## Structure

```
src/
  app/            routes: / · /projects · /projects/[slug] · /writing · not-found
                  og/[image]/ (social PNGs) · apple-touch-icon.png/ · icon.svg · sitemap · robots
  components/
    site/         Shell (header, footer, page frame) · ThemeToggle · Analytics
    home/         Schematic (FYP, generic until submission) · Minis (project windows)
    projects/     ProjectIndex (filter + year groups)
    case-study/   Diagrams · Toc · Inline (minimal markdown)
  data/           projects.ts (featured: 1–4 drives the home page) · site.ts · case-studies/
  lib/            feeds.ts · og.tsx
```

## Content rules

- Home page shows four `featured` projects: verifiable (live link or public repo), backs the
  headline, shipped or updated in the last 12 months, nothing confidential.
- Grimaldi and other client work: CV-level detail only, no links.
- The FYP schematic stays generic until submission: one sensor only (the AC clamp), no battery-side sensing, no shunt or I²C labels, no part numbers, no time-left output. Check this every time `src/assets/schematic.drawio` changes.

## Deploy

PostHog settings come from repository variables (`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST`), set in the build step. The old `ENV_FILE_CONTENT` secret is no longer read.

`.github/workflows/deploy.yml` builds and deploys `out/` on push to `main`, on manual dispatch,
and weekly on Monday at 05:00 UTC so new posts show up. To publish a post sooner, run the workflow by hand (Actions → "Deploy website to Pages" → Run workflow).

Old HashRouter links (`/#/projects/x`) are forwarded to `/projects/x` by the pre-paint script.
