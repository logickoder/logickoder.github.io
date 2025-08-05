import { Project } from '../data/projects.ts';
import useAnalytics from '../hooks/useAnalytics.ts';
import ProjectImage from './ProjectImage.tsx';
import ProjectTechnologies from './ProjectTechnologies.tsx';
import ProjectActionButtons from './ProjectActionButtons.tsx';
import { useCallback, useEffect, MouseEvent, useState } from 'react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { trackProjectView, trackExternalLink } = useAnalytics();
  const [showContent, setShowContent] = useState(false);

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
      // Delay content animation slightly after modal opens
      const timer = setTimeout(() => setShowContent(true), 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    } else {
      setShowContent(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen 
          ? 'bg-black/80 backdrop-blur-sm opacity-100 visible' 
          : 'bg-black/0 backdrop-blur-none opacity-0 invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl transform transition-all duration-300 ease-out ${
          isOpen 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[90vh] overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/95 to-gray-900/95 shadow-2xl backdrop-blur-md">
          <div className="scrollbar-hide max-h-[90vh] overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:rotate-90 hover:scale-110"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className={`transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <ProjectImage
                image={project.image}
                title={project.title}
                featured={project.featured}
                className="h-64 sm:h-80 md:h-96"
                showFullImage={true}
                showFeaturedBadge={true}
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: showContent ? '0.1s' : '0s' }}>
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

              <div className={`mb-6 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: showContent ? '0.2s' : '0s' }}>
                <h3 className="mb-3 text-lg font-semibold text-white">About This Project</h3>
                <p className="leading-relaxed text-gray-300">{project.description}</p>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className={`mb-6 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: showContent ? '0.3s' : '0s' }}>
                  <h3 className="mb-3 text-lg font-semibold text-white">Technologies Used</h3>
                  <ProjectTechnologies
                    technologies={project.technologies}
                    showAll={true}
                    size="md"
                  />
                </div>
              )}

              <div className={`transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: showContent ? '0.4s' : '0s' }}>
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
        </div>
      </div>
    </div>
  );
}
