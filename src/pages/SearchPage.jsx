// src/pages/SearchPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/tmdbService';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Search TMDB movies
      const tmdbResults = await searchMovies(searchQuery);

      // Search manual movies
      const manualMovies = JSON.parse(localStorage.getItem('manualMovies') || '[]');
      const manualResults = manualMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (movie.description && movie.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      // Combine and deduplicate results
      const combinedResults = [
        ...tmdbResults,
        ...manualResults.map(movie => ({
          ...movie,
          poster_path: null, // Manual movies don't have poster paths
          isManual: true
        }))
      ];

      setSearchResults(combinedResults);
    } catch (err) {
      setError('Erreur lors de la recherche de films');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="mb-6 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className="flex-grow p-2 border rounded-l-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Recherche...' : 'Rechercher'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {searchResults.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              {searchQuery ? 'Aucun résultat trouvé' : 'Commencez à rechercher des films'}
            </p>
          ) : (
            searchResults.map(movie => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="hover:scale-105 transition-transform"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      Pas d&apos;image
                    </div>
                  )}
                  <div className="p-3">
                    <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
                    <p className="text-xs text-gray-500">
                      {movie.release_date?.split('-')[0] || 'Date inconnue'}
                      {movie.isManual && ' (Ajouté manuellement)'}
                    </p>
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