interface ProjectImageProps {
  image?: string;
  title: string;
  featured?: boolean;
  className?: string;
  showFullImage?: boolean;
  showFeaturedBadge?: boolean;
}

export default function ProjectImage({
  image,
  title,
  featured,
  className = "aspect-video",
  showFullImage = false,
  showFeaturedBadge = true
}: ProjectImageProps) {
  return (
    <div className={`relative w-full flex-shrink-0 overflow-hidden ${className}`}>
      {image ? (
        <img
          src={image}
          alt={title}
          className={`h-full w-full transition-transform duration-500 group-hover:scale-110 ${
            showFullImage ? 'object-contain bg-gray-900' : 'object-cover'
          }`}
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-primary-600/20 via-primary-500/10 to-primary-400/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-primary-500/20 p-6 transition-transform duration-300 group-hover:scale-110">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg"></div>
            </div>
          </div>
        </div>
      )}
      {featured && showFeaturedBadge && (
        <div className="absolute left-4 top-4">
          <span className="animate-pulse rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg ring-2 ring-amber-400/20">
            ⭐ Featured
          </span>
        </div>
      )}
    </div>
  );
}
