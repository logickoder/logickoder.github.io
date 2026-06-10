# logickoder.dev

Personal portfolio for **Jeffery Orazulike** · Senior Mobile Engineer.

Built with React 19 + Vite 6 + Tailwind CSS v4 + TypeScript. Hosted on GitHub Pages.

## Quick start

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # → dist/
pnpm preview  # serve the production build
pnpm lint     # ESLint (zero-warnings gate)
pnpm format   # Prettier
```

## Stack

| Concern      | Choice                                  |
| ------------ | --------------------------------------- |
| Language     | TypeScript                              |
| Build / dev  | Vite 6                                  |
| UI runtime   | React 19                                |
| Styling      | Tailwind CSS v4 (`@theme` in `main.css`)|
| Routing      | `react-router-dom` (HashRouter for GitHub Pages) |
| SEO / meta   | `react-helmet-async`                    |
| Analytics    | Firebase Analytics                      |
| Type display | Fraunces (serif), Inter (sans), JetBrains Mono (mono) |

No Tailwind config file. Tokens live in `src/main.css` under `@theme`.

## Structure

```
src/
  components/    UI components (Header, Hero, Project*, CaseStudy*, etc.)
  pages/         HomePage · ProjectsPage · ProjectDetailPage · WritingPage
  data/          projects.ts · skills.ts · navigation.ts · socialLinks.ts
                 case-studies/ (per-slug structured case study data)
  hooks/         useAnalytics · useSmoothScroll · useProjectActions
  services/      mediumService.ts (RSS aggregator: Substack + Medium)
  config/        firebase.ts
  main.css       Tailwind import + @theme tokens + body styles
  App.tsx        Router + lazy-loaded secondary routes
```

## Routes

| Path                    | Purpose                                 |
| ----------------------- | --------------------------------------- |
| `/`                     | Homepage (hero, about, /now, skills, projects, blog preview, contact) |
| `/projects`             | Full project archive with category filter |
| `/projects/:slug`       | Case study deep-dive                    |
| `/writing`              | Substack + Medium RSS aggregator        |

## Deploy

Static build (`pnpm build`) → push `dist/` to the `gh-pages` branch via existing GitHub Pages workflow.

HashRouter is used so deep links (`#/projects/retrostash`) survive direct visits and refreshes without a 404 fallback.
