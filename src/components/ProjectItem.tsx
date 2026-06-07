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
    <article
      className="group hover:border-primary/60 flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#161a1e] transition-colors duration-200"
      onClick={handleCardClick}
    >
      <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden">
        <ProjectImage
          image={props.image}
          title={props.title}
          featured={props.featured}
          className="aspect-video"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <ProjectActionButtons
            githubUrl={props.githubUrl}
            liveUrl={props.liveUrl}
            onLinkClick={handleProjectLinkClick}
            variant="overlay"
            size="sm"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-bold leading-tight text-white">
            {props.title}
          </h3>
          <span className="border-primary/30 bg-primary/10 text-primary flex-shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider">
            {props.category}
          </span>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300 sm:text-base">
          {props.description}
        </p>

        {props.technologies && props.technologies.length > 0 && (
          <div className="mb-4">
            <ProjectTechnologies technologies={props.technologies} maxVisible={4} size="sm" />
          </div>
        )}

        {props.year && (
          <div className="mt-auto flex items-center justify-between border-t border-gray-800 pt-3">
            <span className="font-mono text-xs tracking-wider text-gray-500">{props.year}</span>
            {props.caseStudySlug ? (
              <span className="text-primary font-mono text-[0.65rem] uppercase tracking-wider">
                Case study →
              </span>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
