import { Project } from '../data/projects.ts';
import useAnalytics from '../hooks/useAnalytics.ts';
import ProjectImage from './ProjectImage.tsx';
import ProjectTechnologies from './ProjectTechnologies.tsx';
import ProjectActionButtons from './ProjectActionButtons.tsx';
import { useCallback, useEffect, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './icons';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { trackProjectView, trackExternalLink } = useAnalytics();

  const handleProjectLinkClick = useCallback(
    (_: MouseEvent, linkType: 'code' | 'demo') => {
      if (!project) return;
      trackProjectView(project.title);
      trackExternalLink(
        linkType === 'code' ? 'github' : 'live_demo',
        linkType === 'code' ? project.githubUrl || '' : project.liveUrl || ''
      );
    },
    [project, trackProjectView, trackExternalLink]
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
    document.body.style.overflow = 'unset';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isOpen ? 'visible bg-black/80 opacity-100 backdrop-blur-sm' : 'invisible bg-black/0 opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl transition-all duration-200 ease-out ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[90vh] overflow-hidden rounded-2xl border border-gray-800 bg-[#161a1e] shadow-2xl">
          <div className="scrollbar-hide max-h-[90vh] overflow-y-auto">
            <button
              onClick={onClose}
              className="hover:text-primary absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur-md transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ProjectImage
              image={project.image}
              title={project.title}
              featured={project.featured}
              className="h-64 sm:h-80 md:h-96"
              showFullImage
              showFeaturedBadge
            />

            <div className="p-6 sm:p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                    {project.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="border-primary/30 bg-primary/10 text-primary rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.year ? (
                      <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
                        {project.year}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-primary mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
                  About this project
                </h3>
                <p className="text-base leading-relaxed text-gray-300 sm:text-lg sm:leading-loose">
                  {project.description}
                </p>
              </div>

              {project.technologies && project.technologies.length > 0 ? (
                <div className="mb-6">
                  <h3 className="text-primary mb-3 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
                    Stack
                  </h3>
                  <ProjectTechnologies technologies={project.technologies} showAll size="md" />
                </div>
              ) : null}

              <ProjectActionButtons
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                onLinkClick={handleProjectLinkClick}
                variant="inline"
                size="md"
              />

              {project.caseStudySlug ? (
                <div className="mt-6">
                  <Link
                    to={`/projects/${project.caseStudySlug}`}
                    onClick={onClose}
                    className="bg-primary hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
                  >
                    Read case study
                    <ArrowRightIcon />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
