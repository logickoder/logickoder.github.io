import { Project } from '../data/projects.ts';
import useAnalytics from '../hooks/useAnalytics.ts';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectItem(props: Project) {
  const { trackProjectView, trackExternalLink } = useAnalytics();

  const handleProjectLinkClick = useCallback(
    (linkType: 'code' | 'demo') => {
      trackProjectView(props.title);
      trackExternalLink(
        linkType === 'code' ? 'github' : 'live_demo',
        linkType === 'code' ? props.githubUrl || '' : props.liveUrl || ''
      );
    },
    [props]
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/90 to-gray-900/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10">
      {/* Project Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        {props.image ? (
          <img
            src={props.image}
            alt={props.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary-600/20 to-primary-400/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-primary-500/20 p-6">
                <div className="h-10 w-10 rounded bg-gradient-to-r from-primary-400 to-primary-600"></div>
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
          <div className="flex gap-3">
            {props.githubUrl && (
              <Link
                className="rounded-lg border border-white/80 bg-black/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/10"
                to={props.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleProjectLinkClick('code')}
              >
                View Code
              </Link>
            )}
            {props.liveUrl && (
              <Link
                className="rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-primary-500 hover:to-primary-400 hover:shadow-lg"
                to={props.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleProjectLinkClick('demo')}
              >
                Live Demo
              </Link>
            )}
          </div>
        </div>
        {props.featured && (
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-lg font-bold leading-tight text-white transition-colors duration-200 group-hover:text-primary-300">
            {props.title}
          </h3>
          <span className="rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
            {props.category}
          </span>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300">{props.description}</p>

        {/* Technologies */}
        {props.technologies && props.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {props.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="rounded-md border border-gray-600/30 bg-gray-700/50 px-2 py-1 text-xs font-medium text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {props.technologies.length > 4 && (
                <span className="rounded-md border border-gray-600/30 bg-gray-700/50 px-2 py-1 text-xs font-medium text-gray-400">
                  +{props.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Project Year */}
        {props.year && <div className="text-xs font-medium text-gray-500">{props.year}</div>}
      </div>
    </div>
  );
}
