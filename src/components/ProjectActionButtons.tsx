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
  const sizeClasses = size === 'sm' ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-base';

  const buttonBase = `inline-flex items-center justify-center gap-2 rounded-lg font-mono uppercase tracking-wider transition-colors duration-200 ${sizeClasses}`;

  const githubClasses = isOverlay
    ? `${buttonBase} border border-white/70 bg-black/40 text-white backdrop-blur-md hover:border-white hover:bg-white/10`
    : `${buttonBase} border-primary text-primary hover:bg-primary hover:text-white border`;

  const liveClasses = isOverlay
    ? `${buttonBase} bg-primary text-white hover:bg-primary-600`
    : `${buttonBase} bg-primary text-white hover:bg-primary-600`;

  const containerClasses = isOverlay
    ? 'flex translate-y-2 transform gap-3 transition-transform duration-200 group-hover:translate-y-0'
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
          {!isOverlay && <GitHubIcon />}
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
          {!isOverlay && <OpenLinkIcon />}
          Live Demo
        </Link>
      )}
    </div>
  );
}
