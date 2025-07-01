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
    <div
      className={`aspect-square rounded-full border-2 border-primary bg-cover bg-center bg-no-repeat ${sizeClasses[size]} ${className}`}
      style={{
        backgroundImage: `url("https://www.gravatar.com/avatar/b0c8df8b7d4c4e5f9a1e2b3c4d5e6f7a?s=200&d=mp")`
      }}
    />
  );
};
