// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularMovies } from '../services/tmdbService';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies(page);
        setMovies(prevMovies => [...prevMovies, ...popularMovies]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching popular movies:', err);
        setError('Impossible de charger les films');
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [page]);

  const loadMoreMovies = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (loading && movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Films Populaires</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(movie => (
          <Link
            to={`/film/${movie.id}`}
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
                  Pas d&apos;image                </div>
              )}
              <div className="p-3">
                <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
                <p className="text-xs text-gray-500">{movie.release_date?.split('-')[0]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={loadMoreMovies}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Charger plus de films
        </button>
      </div>
    </div>
  );
}

export default Home;