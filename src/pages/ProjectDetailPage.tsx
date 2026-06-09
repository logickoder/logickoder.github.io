import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Navigate } from 'react-router-dom';
import { estimateReadingMinutes, getCaseStudy } from '../data/case-studies';
import CaseStudyRenderer from '../components/CaseStudyRenderer';
import useAnalytics from '../hooks/useAnalytics';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    if (study) {
      trackPageView(`Case Study: ${study.title}`);
    }
  }, [study, trackPageView]);

  const jsonLd = useMemo(() => {
    if (!study) return null;
    const url = `https://logickoder.dev/#/projects/${study.slug}`;
    const readingMinutes = estimateReadingMinutes(study);
    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: study.title,
      description: study.summary,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: `${study.year}-01-01`,
      author: {
        '@type': 'Person',
        name: 'Jeffery Orazulike',
        url: 'https://logickoder.dev'
      },
      publisher: {
        '@type': 'Person',
        name: 'Jeffery Orazulike',
        url: 'https://logickoder.dev'
      },
      timeRequired: `PT${readingMinutes}M`,
      keywords: study.tech.join(', ')
    };
  }, [study]);

  if (!study) {
    return <Navigate to="/projects" replace />;
  }

  const description =
    study.summary.length > 160 ? study.summary.slice(0, 157) + '…' : study.summary;
  const title = `${study.title} · Case Study | Jeffery Orazulike`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={`https://logickoder.dev/#/projects/${study.slug}`} />
        {jsonLd ? (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        ) : null}
      </Helmet>
      <CaseStudyRenderer study={study} />
    </>
  );
}
