import { Project } from '../data/projects.ts';
import useAnalytics from '../hooks/useAnalytics.ts';
import ProjectImage from './ProjectImage.tsx';
import ProjectTechnologies from './ProjectTechnologies.tsx';
import ProjectActionButtons from './ProjectActionButtons.tsx';
import { useCallback, useEffect, MouseEvent } from 'react';

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
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/95 to-gray-900/95 shadow-2xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:rotate-90"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ProjectImage
          image={project.image}
          title={project.title}
          featured={project.featured}
          className="h-64 sm:h-80 md:h-96"
          showFullImage={true}
          showFeaturedBadge={true}
        />

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{project.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary-500/30 bg-gradient-to-r from-primary-500/10 to-primary-400/10 px-3 py-1 text-sm font-medium text-primary-400">
                  {project.category}
                </span>
                {project.year && (
                  <span className="text-sm font-medium text-gray-500">{project.year}</span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-white">About This Project</h3>
            <p className="leading-relaxed text-gray-300">{project.description}</p>
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-white">Technologies Used</h3>
              <ProjectTechnologies
                technologies={project.technologies}
                showAll={true}
                size="md"
              />
            </div>
          )}

          <ProjectActionButtons
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            onLinkClick={handleProjectLinkClick}
            variant="inline"
            size="md"
          />
        </div>
      </div>
    </div>
  );
}
