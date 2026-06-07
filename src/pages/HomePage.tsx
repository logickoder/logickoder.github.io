import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import NowSection from '../components/NowSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import useAnalytics from '../hooks/useAnalytics.ts';

const HOME_DESCRIPTION =
  'Senior Mobile Engineer in Lagos. Android, Kotlin Multiplatform, Compose Multiplatform, Flutter, React Native. Maintainer of Retrostash on Maven Central. 6+ years shipping mobile infrastructure.';

export default function HomePage() {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('Portfolio Home');
  }, [trackPageView]);

  return (
    <div className="bg-chinese-black group/design-root dark relative flex size-full min-h-screen flex-col overflow-x-hidden">
      <Helmet>
        <title>Jeffery Orazulike — Senior Mobile Engineer</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta property="og:title" content="Jeffery Orazulike — Senior Mobile Engineer" />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta name="twitter:title" content="Jeffery Orazulike — Senior Mobile Engineer" />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <link rel="canonical" href="https://logickoder.dev/#/" />
      </Helmet>
      <Header />
      <main className="relative z-10 flex-1">
        <HeroSection />
        <AboutSection />
        <NowSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
