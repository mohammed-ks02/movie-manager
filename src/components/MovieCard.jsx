import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Link to={`/film/${movie.id}`} className="netflix-card">
      <div className="bg-netflix-gray rounded-lg overflow-hidden shadow-lg">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-netflix-card object-cover"
          />
        ) : (
          <div className="w-full h-netflix-card bg-netflix-light-gray flex items-center justify-center">
            Pas d'image
          </div>
        )}
        <div className="p-4">
          <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
          <p className="text-xs text-gray-400">{movie.release_date?.split('-')[0]}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;