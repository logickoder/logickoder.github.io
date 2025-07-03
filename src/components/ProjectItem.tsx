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
    <div className="group flex flex-col overflow-hidden rounded-xl border border-[#3b4754] bg-[#1b2127] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
      {/* Project Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        {props.image ? (
          <img src={props.image} alt={props.title} className="h-full w-full object-cover" />
        ) : (
          <div className="bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-primary/20 p-4">
                <div className="h-8 w-8 rounded bg-primary/40"></div>
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
          <div className="flex gap-3">
            {props.githubUrl && (
              <Link
                className="rounded-md border border-white px-3 py-2 text-sm text-white transition-colors hover:bg-white/10"
                to={props.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleProjectLinkClick('code')}
              >
                Code
              </Link>
            )}
            {props.liveUrl && (
              <Link
                className="rounded-md bg-primary px-3 py-2 text-sm text-white transition-colors hover:bg-primary/80"
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
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold leading-tight text-white">{props.title}</h3>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {props.category}
          </span>
        </div>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-[#9cabba]">{props.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {props.technologies.map((tech, techIndex) => (
            <span key={techIndex} className="rounded bg-[#283039] px-2 py-1 text-xs text-gray-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
