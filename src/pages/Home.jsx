import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPopularMovies } from '../store/slices/moviesSlice';

function Home() {
  const dispatch = useDispatch();
  const { popularMovies, loading } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [dispatch, page]);

  return (
    <div className="pt-24 px-8">
      <h1 className="text-4xl font-bold mb-8">Films Populaires</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-netflix-red"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 netflix-scrollbar">
          {popularMovies.map((movie) => (
            <Link 
              to={`/film/${movie.id}`} 
              key={movie.id} 
              className="netflix-card"
            >
              <div className="bg-netflix-gray rounded-lg overflow-hidden shadow-lg">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
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
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8 space-x-4">
        <button 
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="netflix-button disabled:opacity-50"
        >
          Précédent
        </button>
        <button 
          onClick={() => setPage(prev => prev + 1)}
          className="netflix-button"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Home;