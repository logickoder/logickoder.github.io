import { Project } from '../data/projects.ts';
import useAnalytics from '../hooks/useAnalytics.ts';
import ProjectImage from './ProjectImage.tsx';
import ProjectTechnologies from './ProjectTechnologies.tsx';
import ProjectActionButtons from './ProjectActionButtons.tsx';
import { useCallback, MouseEvent } from 'react';

interface ProjectItemProps extends Project {
  onProjectClick?: (project: Project) => void;
}

export default function ProjectItem(props: ProjectItemProps) {
  const { trackProjectView, trackExternalLink } = useAnalytics();
  const { onProjectClick, ...project } = props;

  const handleProjectLinkClick = useCallback(
    (e: MouseEvent, linkType: 'code' | 'demo') => {
      e.stopPropagation();
      trackProjectView(props.title);
      trackExternalLink(
        linkType === 'code' ? 'github' : 'live_demo',
        linkType === 'code' ? props.githubUrl || '' : props.liveUrl || ''
      );
    },
    [props]
  );

  const handleCardClick = useCallback(() => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  }, [onProjectClick, project]);

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/90 to-gray-900/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-400/0 to-primary-500/0 opacity-0 transition-opacity duration-300 group-hover:from-primary-500/5 group-hover:via-primary-400/10 group-hover:to-primary-500/5 group-hover:opacity-100"></div>

      <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden">
        <ProjectImage
          image={props.image}
          title={props.title}
          featured={props.featured}
          className="aspect-video"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-black/20 opacity-0 transition-all duration-500 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/30 group-hover:opacity-100">
          <ProjectActionButtons
            githubUrl={props.githubUrl}
            liveUrl={props.liveUrl}
            onLinkClick={handleProjectLinkClick}
            variant="overlay"
            size="sm"
          />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-lg font-bold leading-tight text-white transition-colors duration-200 group-hover:text-primary-300">
            {props.title}
          </h3>
          <span className="rounded-full border border-primary-500/30 bg-gradient-to-r from-primary-500/10 to-primary-400/10 px-3 py-1 text-xs font-medium text-primary-400 backdrop-blur-sm">
            {props.category}
          </span>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300 transition-colors duration-200 group-hover:text-gray-200">
          {props.description}
        </p>

        {props.technologies && props.technologies.length > 0 && (
          <div className="mb-4">
            <ProjectTechnologies
              technologies={props.technologies}
              maxVisible={4}
              size="sm"
            />
          </div>
        )}

        {props.year && (
          <div className="mt-auto flex items-center justify-between">
            <div className="text-xs font-medium text-gray-500">{props.year}</div>
            <div className="mx-3 h-px flex-1 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
            <div className="text-xs text-gray-600">Project</div>
          </div>
        )}
      </div>
    </div>
  );
}
