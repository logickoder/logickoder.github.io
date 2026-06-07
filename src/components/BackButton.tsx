import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './icons';

interface BackButtonProps {
  to?: string;
  text?: string;
  className?: string;
}

export default function BackButton({
  to = '/',
  text = 'Back to home',
  className = ''
}: BackButtonProps) {
  return (
    <Link
      to={to}
      className={`group hover:border-primary hover:text-primary inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-gray-300 transition-colors duration-200 sm:text-sm ${className}`}
    >
      <ArrowRightIcon className="h-4 w-4 rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5" />
      {text}
    </Link>
  );
}
