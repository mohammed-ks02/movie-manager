const MovieCardSkeleton = () => (
  <div className="bg-netflix-gray rounded-lg overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-netflix-card bg-netflix-light-gray"></div>
    <div className="p-4">
      <div className="h-4 bg-netflix-light-gray rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-netflix-light-gray rounded w-1/4"></div>
    </div>
  </div>
);

export default MovieCardSkeleton;