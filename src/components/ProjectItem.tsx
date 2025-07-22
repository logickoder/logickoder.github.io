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
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/90 to-gray-900/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10">
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-400/0 to-primary-500/0 opacity-0 transition-opacity duration-300 group-hover:from-primary-500/5 group-hover:via-primary-400/10 group-hover:to-primary-500/5 group-hover:opacity-100"></div>

      {/* Project Image */}
      <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden">
        {props.image ? (
          <img
            src={props.image}
            alt={props.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary-600/20 via-primary-500/10 to-primary-400/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-primary-500/20 p-6 transition-transform duration-300 group-hover:scale-110">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg"></div>
              </div>
            </div>
          </div>
        )}
        {/* Enhanced overlay with smoother transitions */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-black/20 opacity-0 transition-all duration-500 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/30 group-hover:opacity-100">
          <div className="flex translate-y-4 transform gap-3 transition-transform duration-300 group-hover:translate-y-0">
            {props.githubUrl && (
              <Link
                className="rounded-lg border border-white/80 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-white/20 hover:shadow-lg"
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
                className="rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:from-primary-500 hover:to-primary-400 hover:shadow-xl hover:shadow-primary-500/25"
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
            <span className="animate-pulse rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg ring-2 ring-amber-400/20">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
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

        {/* Technologies */}
        {props.technologies && props.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {props.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="rounded-md border border-gray-600/40 bg-gray-700/60 px-2.5 py-1 text-xs font-medium text-gray-300 transition-all duration-200 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-primary-300"
                >
                  {tech}
                </span>
              ))}
              {props.technologies.length > 4 && (
                <span className="rounded-md border border-gray-600/40 bg-gray-700/60 px-2.5 py-1 text-xs font-medium text-gray-400 transition-all duration-200 hover:text-gray-300">
                  +{props.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Project Year with enhanced styling - pushed to bottom */}
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
