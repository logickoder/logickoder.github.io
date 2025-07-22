import { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import useAnalytics from '../hooks/useAnalytics.ts';

export default function HomePage() {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('Portfolio Home');
  }, [trackPageView]);

  return (
    <div className="group/design-root dark relative flex size-full min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Subtle animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary-600/5 blur-3xl"></div>
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-primary-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 h-60 w-60 rounded-full bg-primary-400/5 blur-3xl"></div>
      </div>

      <Header />
      <main className="relative z-10 flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
