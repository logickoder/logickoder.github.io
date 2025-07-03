import { ArrowRightIcon } from '../components/icons';
import projects, { Project } from '../data/projects.ts';
import useAnalytics from '../hooks/useAnalytics.ts';
import ProjectItem from '../components/ProjectItem.tsx';
import email from '../data/email.ts';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';

export default function ProjectsPage() {
  const { trackExternalLink } = useAnalytics();

  const handleContactClick = () => {
    trackExternalLink('email', email);
  };

  // Group projects by year
  const projectsByYear = projects.reduce(
    (acc, project) => {
      const year = project.year || 'Other';
      if (!acc[year]) acc[year] = [];
      acc[year].push(project);
      return acc;
    },
    {} as Record<string, Project[]>
  );

  const years = Object.keys(projectsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="min-h-screen bg-[#111418] text-white">
      {/* Header */}
      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
        <div className="container mx-auto max-w-screen-xl">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              All Projects
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              A comprehensive collection of my work across mobile, web, and full-stack development.
              From Android apps to React dashboards, here's everything I've built.
            </p>
          </div>
        </div>
      </section>

      {/* Projects by Year */}
      <section className="px-6 pb-16 sm:px-10 sm:pb-20 lg:px-20 lg:pb-24 xl:px-40">
        <div className="container mx-auto max-w-screen-xl">
          {years.map((year) => (
            <div key={year} className="mb-16">
              <h2 className="mb-8 text-2xl font-bold text-primary">{year}</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projectsByYear[year].map((project, index) => (
                  <ProjectItem key={index} {...project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
        <div className="container mx-auto max-w-screen-lg text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Work Together?</h2>
          <p className="mb-8 text-gray-400">
            Let's discuss how I can help bring your next project to life.
          </p>
          <Link
            to={email}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-white transition-colors hover:bg-primary/80"
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
