import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from './icons';

interface BackButtonProps {
  text?: string;
  className?: string;
}

export default function BackButton({ text = 'Back', className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className={`group inline-flex items-center gap-2 rounded-lg border border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-700/80 px-4 py-2.5 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-200 hover:border-primary-500/50 hover:from-gray-700/80 hover:to-gray-600/80 hover:text-white hover:shadow-lg hover:shadow-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 ${className}`}
    >
      <ArrowRightIcon className="h-4 w-4 rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5" />
      {text}
    </button>
  );
}
