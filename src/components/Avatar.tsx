interface AvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = ({ className = '', size = 'md' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-16'
  };

  return (
    <a
      className={`aspect-square rounded-full border-2 border-primary bg-cover bg-center bg-no-repeat ${sizeClasses[size]} ${className}`}
      href="https://github.com/logickoder"
      style={{
        backgroundImage: `url("https://www.gravatar.com/avatar/671d2f99007257da5babde90df49d0fe654d4564a627b58a2fc8e0332cd0aa57?s=200&d=mp")`
      }}
      target="_blank"
    />
  );
};
