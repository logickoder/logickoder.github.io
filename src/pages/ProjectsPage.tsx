import { ArrowRightIcon } from '../components/icons';
import projects, { Project } from '../data/projects.ts';
import useAnalytics from '../hooks/useAnalytics.ts';
import ProjectItem from '../components/ProjectItem.tsx';
import email from '../data/email.ts';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

export default function ProjectsPage() {
  const { trackExternalLink } = useAnalytics();

  const handleContactClick = () => {
    trackExternalLink('email', email);
  };

  const projectsByYear = useMemo(() => {
    const grouped = projects.reduce(
      (acc, project) => {
        const year = project.year || 'Other';
        if (!acc[year]) acc[year] = [];
        acc[year].push(project);
        return acc;
      },
      {} as Record<string, Project[]>
    );

    Object.keys(grouped).forEach((year) => {
      grouped[year].sort((a, b) => {
        if ((b.featured ? 1 : 0) - (a.featured ? 1 : 0) !== 0) {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        return a.title.localeCompare(b.title);
      });
    });
    return grouped;
  }, []);

  const years = useMemo(
    () => Object.keys(projectsByYear).sort((a, b) => b.localeCompare(a)),
    [projectsByYear]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary-600/3 absolute -right-40 -top-40 h-80 w-80 rounded-full blur-3xl"></div>
        <div className="bg-primary-500/3 absolute -left-40 top-1/2 h-80 w-80 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <section className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
        <div className="container mx-auto max-w-screen-xl">
          <div className="mb-8 animate-fade-in">
            <BackButton />
          </div>
          <div className="animate-slide-up text-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              All Projects
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              A comprehensive collection of my work across mobile, web, and full-stack development.
              From Android apps to React dashboards, here's everything I've built.
            </p>
          </div>
        </div>
      </section>

      {/* Projects by Year */}
      <section className="relative z-10 px-6 pb-16 sm:px-10 sm:pb-20 lg:px-20 lg:pb-24 xl:px-40">
        <div className="container mx-auto max-w-screen-xl">
          {years.map((year, yearIndex) => (
            <div
              key={year}
              className="mb-16 animate-fade-in"
              style={{ animationDelay: `${yearIndex * 0.1}s` }}
            >
              <div className="mb-8 flex items-center gap-4">
                <h2 className="text-2xl font-bold text-primary-400 transition-colors duration-200 hover:text-primary-300">
                  {year}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-primary-500/30 via-primary-400/20 to-transparent"></div>
                <span className="rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-400">
                  {projectsByYear[year].length}{' '}
                  {projectsByYear[year].length === 1 ? 'project' : 'projects'}
                </span>
              </div>
              <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projectsByYear[year].map((project, index) => (
                  <div
                    key={index}
                    className="h-full animate-slide-up"
                    style={{ animationDelay: `${yearIndex * 0.1 + index * 0.05}s` }}
                  >
                    <ProjectItem {...project} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 bg-gradient-to-r from-gray-800/50 to-gray-700/50 px-6 py-16 backdrop-blur-sm sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
        <div className="container mx-auto max-w-screen-lg text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to Work Together?</h2>
          <p className="mb-8 text-gray-400">
            Let's discuss how I can help bring your next project to life.
          </p>
          <Link
            to={email}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:from-primary-500 hover:to-primary-400 hover:shadow-lg hover:shadow-primary-500/25"
            onClick={handleContactClick}
          >
            Start a Conversation
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </div>
  );
}
