import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchMoviesByQuery } from '../store/slices/moviesSlice';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.movies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    dispatch(searchMoviesByQuery(searchQuery));
  };

  return (
    <div className="pt-24 px-8">
      <form onSubmit={handleSearch} className="mb-8 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className="flex-grow p-3 bg-netflix-gray text-white border-2 border-netflix-light-gray rounded-l-md focus:outline-none focus:border-netflix-red"
        />
        <button
          type="submit"
          disabled={loading}
          className="netflix-button rounded-r-md"
        >
          {loading ? 'Recherche...' : 'Rechercher'}
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-netflix-red"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 netflix-scrollbar">
          {searchResults.length === 0 ? (
  <div className="col-span-full text-center text-gray-500 mt-16">
    {/* You can add an SVG icon here */}
    <h3 className="text-xl font-bold">
      {searchQuery ? 'Aucun résultat trouvé' : 'Trouvez votre prochain film préféré'}
    </h3>
    <p>
      {searchQuery ? `Essayez une autre recherche pour trouver le film que vous cherchez.` : `Utilisez la barre de recherche ci-dessus pour commencer.`}
    </p>
  </div>
) : (
            searchResults.map(movie => (
              <Link
                to={`/film/${movie.id}`}
                key={movie.id}
                className="netflix-card"
              >
                <div className="bg-netflix-gray rounded-lg overflow-hidden shadow-lg">
                  {movie.poster_path || movie.image ? (
                    <img
                      src={
                        movie.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : movie.image
                      }
                      alt={movie.title}
                      loading="lazy"
                      className="w-full h-netflix-card object-cover"
                    />
                  ) : (
                    <div className="w-full h-netflix-card bg-netflix-light-gray flex items-center justify-center">
                      Pas d&apos;image
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
                    <p className="text-xs text-gray-400">{movie.release_date?.split('-')[0]}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;