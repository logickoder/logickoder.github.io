import { ArrowRightIcon } from './icons';
import useAnalytics from '../hooks/useAnalytics';
import ProjectItem from './ProjectItem.tsx';
import { useMemo } from 'react';
import projects from '../data/projects.ts';
import email from '../data/email.ts';
import { Link } from 'react-router-dom';

export default function ProjectsSection() {
  const { trackExternalLink } = useAnalytics();

  const handleContactClick = () => {
    trackExternalLink('email', email);
  };

  const items = useMemo(
    () =>
      projects
        .filter((item) => item.featured)
        .sort((a, b) => a.title.localeCompare(b.title)),
    []
  );

  return (
    <section
      className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40"
      id="projects"
    >
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:mb-12 sm:text-4xl">
          Featured Projects
        </h2>

        {/* Projects Grid - Only showing featured projects */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-400">Want to see more of my work?</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/80"
            >
              View All Projects
              <ArrowRightIcon />
            </Link>
            <Link
              to={email}
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary/10"
              onClick={handleContactClick}
            >
              Let's Connect
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
