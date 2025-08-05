interface ProjectTechnologiesProps {
  technologies: string[];
  maxVisible?: number;
  showAll?: boolean;
  size?: 'sm' | 'md';
}

export default function ProjectTechnologies({
  technologies,
  maxVisible = 4,
  showAll = false,
  size = 'sm'
}: ProjectTechnologiesProps) {
  const displayTechnologies = showAll ? technologies : technologies.slice(0, maxVisible);
  const remainingCount = technologies.length - maxVisible;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-2'
  };

  return (
    <div className="flex flex-wrap gap-2">
      {displayTechnologies.map((tech, index) => (
        <span
          key={index}
          className={`rounded-md border border-gray-600/40 bg-gray-700/60 font-medium text-gray-300 transition-all duration-200 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-primary-300 ${sizeClasses[size]}`}
        >
          {tech}
        </span>
      ))}
      {!showAll && remainingCount > 0 && (
        <span className={`rounded-md border border-gray-600/40 bg-gray-700/60 font-medium text-gray-400 transition-all duration-200 hover:text-gray-300 ${sizeClasses[size]}`}>
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}
