// src/pages/MovieDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/tmdbService';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState(null);

  const MAX_MANUAL_MOVIES = 50; // Limit for manual movies

  const handleDelete = () => {
    const manualMovies = JSON.parse(localStorage.getItem('manualMovies') || '[]');
    const updatedMovies = manualMovies.filter(m => m.id !== movie.id);
    localStorage.setItem('manualMovies', JSON.stringify(updatedMovies));
    navigate('/');
  };

  const handleEdit = () => {
    setEditedMovie({ ...movie });
    setIsEditing(true);
  };

  const saveEditedMovie = () => {
    const manualMovies = JSON.parse(localStorage.getItem('manualMovies') || '[]');
    const updatedMovies = manualMovies.map(m => 
      m.id === editedMovie.id ? editedMovie : m
    );
    localStorage.setItem('manualMovies', JSON.stringify(updatedMovies));
    setMovie(editedMovie);
    setIsEditing(false);
  };

  const genres = [
    'Action', 'Aventure', 'Comédie', 'Drame', 
    'Fantastique', 'Horreur', 'Science-Fiction', 
    'Thriller', 'Romance', 'Documentaire'
  ];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Convert ID to number, handling both string and number inputs
        const movieId = typeof id === 'string' ? parseInt(id, 10) : id;
        console.log('Fetching movie with ID:', movieId);

        // Manage local storage size
        const manualMovies = JSON.parse(localStorage.getItem('manualMovies') || '[]');
        if (manualMovies.length > MAX_MANUAL_MOVIES) {
          const sortedMovies = manualMovies.sort((a, b) => 
            new Date(a.created_at) - new Date(b.created_at)
          );
          localStorage.setItem('manualMovies', JSON.stringify(sortedMovies.slice(-MAX_MANUAL_MOVIES)));
        }

        // First check manual movies
        const manualMovie = manualMovies.find(m => m.id === movieId);

        if (manualMovie) {
          console.log('Found manual movie:', manualMovie);
          setMovie(manualMovie);
          setLoading(false);
          return;
        }

        // If not a manual movie, fetch from TMDB
        const details = await getMovieDetails(movieId);
        setMovie(details);
      } catch (err) {
        console.error('Detailed error fetching movie:', err);
        setError(`Impossible de charger les détails du film: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retour &agrave; l&apos;accueil
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {movie.poster_path && !movie.isManual ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 object-cover"
          />
        ) : (
          <div className="w-full md:w-1/3 bg-gray-200 flex items-center justify-center">
            Pas d&apos;image disponible
          </div>
        )}

        <div className="p-6 flex-grow">
          {isEditing && movie.isManual ? (
            <div>
              <input
                type="text"
                value={editedMovie.title}
                onChange={(e) => setEditedMovie({...editedMovie, title: e.target.value})}
                className="text-3xl font-bold mb-4 w-full border rounded p-2"
              />
              <textarea
                value={editedMovie.description}
                onChange={(e) => setEditedMovie({...editedMovie, description: e.target.value})}
                className="text-gray-700 mb-4 w-full border rounded p-2"
                rows="4"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Date de sortie</label>
                  <input
                    type="date"
                    value={editedMovie.release_date}
                    onChange={(e) => setEditedMovie({...editedMovie, release_date: e.target.value})}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Genre</label>
                  <select
                    value={editedMovie.genre}
                    onChange={(e) => setEditedMovie({...editedMovie, genre: e.target.value})}
                    className="w-full border rounded p-2"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Note</label>
                  <input
                    type="number"
                    value={editedMovie.rating || ''}
                    onChange={(e) => setEditedMovie({...editedMovie, rating: parseFloat(e.target.value)})}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full border rounded p-2"
                  />
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={saveEditedMovie}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

              {movie.isManual ? (
                <>
                  <p className="text-gray-700 mb-4">{movie.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {movie.release_date && (
                      <div>
                        <strong>Date de sortie:</strong> {movie.release_date}
                      </div>
                    )}
                    {movie.genre && (
                      <div>
                        <strong>Genre:</strong> {movie.genre}
                      </div>
                    )}
                    {movie.rating !== null && (
                      <div>
                        <strong>Note:</strong> {movie.rating?.toFixed(1)}/10
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">{movie.overview}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong>Date de sortie:</strong> {movie.release_date}
                    </div>
                    <div>
                      <strong>Note:</strong> {movie.vote_average?.toFixed(1)}/10
                    </div>
                    <div>
                      <strong>Langue originale:</strong> {movie.original_language}
                    </div>
                    <div>
                      <strong>Popularité:</strong> {movie.popularity?.toFixed(2)}
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={() => navigate(-1)}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Retour
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;