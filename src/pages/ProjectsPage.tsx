import { Helmet } from 'react-helmet-async';
import { ArrowRightIcon } from '../components/icons';
import projects, { Project } from '../data/projects.ts';
import ProjectItem from '../components/ProjectItem.tsx';
import ProjectModal from '../components/ProjectModal.tsx';
import email from '../data/email.ts';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import useProjectActions from '../hooks/useProjectActions.ts';

const PROJECTS_DESCRIPTION =
  'A comprehensive collection of mobile, web, and full-stack projects by Jeffery Orazulike — from Android apps to Kotlin Multiplatform libraries and React dashboards.';

export default function ProjectsPage() {
  const { handleProjectClick, handleContactClick, isModalOpen, handleCloseModal, selectedProject } =
    useProjectActions();

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

  const years = Object.keys(projectsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <>
      <Helmet>
        <title>All Projects — Jeffery Orazulike</title>
        <meta name="description" content={PROJECTS_DESCRIPTION} />
        <meta property="og:title" content="All Projects — Jeffery Orazulike" />
        <meta property="og:description" content={PROJECTS_DESCRIPTION} />
        <meta name="twitter:title" content="All Projects — Jeffery Orazulike" />
        <meta name="twitter:description" content={PROJECTS_DESCRIPTION} />
        <link rel="canonical" href="https://logickoder.dev/projects" />
      </Helmet>

      <div className="bg-chinese-black min-h-screen text-white">
        <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
          <div className="container mx-auto max-w-screen-xl">
            <div className="mb-8">
              <BackButton />
            </div>
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              All Projects
            </h1>
            <p className="max-w-2xl text-lg text-gray-300">
              A comprehensive collection of my work across mobile, web, and full-stack development.
              From Android apps to KMP libraries to React dashboards.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16 sm:px-10 sm:pb-20 lg:px-20 lg:pb-24 xl:px-40">
          <div className="container mx-auto max-w-screen-xl">
            {years.map((year) => (
              <div key={year} className="mb-16">
                <div className="mb-8 flex items-center gap-4">
                  <h2 className="text-primary font-mono text-xl font-bold tracking-wide sm:text-2xl">
                    {year}
                  </h2>
                  <div className="from-primary/30 via-primary/20 h-px flex-1 bg-gradient-to-r to-transparent"></div>
                  <span className="border-primary/30 bg-primary/10 text-primary rounded-full border px-3 py-1 font-mono text-xs font-medium tracking-wide">
                    {projectsByYear[year].length}{' '}
                    {projectsByYear[year].length === 1 ? 'project' : 'projects'}
                  </span>
                </div>
                <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {projectsByYear[year].map((project, index) => (
                    <ProjectItem
                      key={index}
                      {...project}
                      onProjectClick={handleProjectClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#161a1e] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24 xl:px-40">
          <div className="container mx-auto max-w-screen-lg text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold text-white sm:text-4xl">
              Ready to Work Together?
            </h2>
            <p className="mb-8 text-gray-400">
              Let&apos;s discuss how I can help bring your next project to life.
            </p>
            <Link
              to={email}
              className="bg-primary hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold text-white transition-colors"
              onClick={handleContactClick}
            >
              Start a Conversation
              <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </div>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
