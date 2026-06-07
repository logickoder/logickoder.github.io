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
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1'
  };

  return (
    <div className="flex flex-wrap gap-2">
      {displayTechnologies.map((tech, index) => (
        <span
          key={index}
          className={`border-primary/30 bg-primary/10 text-primary rounded-full border font-mono ${sizeClasses[size]}`}
        >
          {tech}
        </span>
      ))}
      {!showAll && remainingCount > 0 && (
        <span
          className={`rounded-full border border-gray-700 bg-gray-900 font-mono text-gray-400 ${sizeClasses[size]}`}
        >
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}
