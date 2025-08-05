import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { GitHubIcon, OpenLinkIcon } from './icons';

interface ProjectActionButtonsProps {
  githubUrl?: string;
  liveUrl?: string;
  onLinkClick: (e: MouseEvent, linkType: 'code' | 'demo') => void;
  variant?: 'overlay' | 'inline';
  size?: 'sm' | 'md';
}

export default function ProjectActionButtons({
  githubUrl,
  liveUrl,
  onLinkClick,
  variant = 'overlay',
  size = 'sm'
}: ProjectActionButtonsProps) {
  const isOverlay = variant === 'overlay';
  const sizeClasses = size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-base';

  const baseButtonClasses = `font-medium transition-all duration-200 rounded-lg ${sizeClasses}`;

  const githubClasses = isOverlay
    ? `${baseButtonClasses} border border-white/80 bg-black/30 text-white backdrop-blur-md hover:border-white hover:bg-white/20 hover:shadow-lg`
    : `${baseButtonClasses} flex items-center justify-center border border-white/20 bg-black/20 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/10 hover:shadow-lg`;

  const liveClasses = isOverlay
    ? `${baseButtonClasses} bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg backdrop-blur-md hover:from-primary-500 hover:to-primary-400 hover:shadow-xl hover:shadow-primary-500/25`
    : `${baseButtonClasses} flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg hover:from-primary-500 hover:to-primary-400 hover:shadow-xl hover:shadow-primary-500/25`;

  const containerClasses = isOverlay
    ? 'flex translate-y-4 transform gap-3 transition-transform duration-300 group-hover:translate-y-0'
    : 'flex flex-col gap-3 sm:flex-row';

  return (
    <div className={containerClasses}>
      {githubUrl && (
        <Link
          className={githubClasses}
          to={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => onLinkClick(e, 'code')}
        >
          {!isOverlay && <GitHubIcon className="mr-2" />}
          View Code
        </Link>
      )}
      {liveUrl && (
        <Link
          className={liveClasses}
          to={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => onLinkClick(e, 'demo')}
        >
          {!isOverlay && <OpenLinkIcon className="mr-2" />}
          Live Demo
        </Link>
      )}
    </div>
  );
}
