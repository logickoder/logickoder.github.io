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
      className={`inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${className}`}
    >
      <ArrowRightIcon className="h-4 w-4 rotate-180" />
      {text}
    </button>
  );
}
