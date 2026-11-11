import type { MetadataRoute } from 'next';
import { listCaseStudies } from '@/data/case-studies';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/projects/', '/writing/', ...listCaseStudies().map((s) => `/projects/${s.slug}/`)];
  return pages.map((path) => ({ url: `${site.url}${path}` }));
}
