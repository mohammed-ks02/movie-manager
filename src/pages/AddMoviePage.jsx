import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addManualMovie } from '../store/slices/manualMoviesSlice';

function AddMoviePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genres = [
    'Action', 'Aventure', 'Comédie', 'Drame', 
    'Fantastique', 'Horreur', 'Science-Fiction', 
    'Thriller', 'Romance', 'Documentaire'
  ];

  const validateForm = () => {
    if (!title.trim()) {
      setError('Le titre est obligatoire');
      return false;
    }
    if (!description.trim()) {
      setError('La description est obligatoire');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const newMovie = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        release_date: releaseDate,
        genre: genre,
        rating: rating ? parseFloat(rating) : null,
        isManual: true,
        created_at: new Date().toISOString()
      };

      dispatch(addManualMovie(newMovie));
      navigate(`/film/${newMovie.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pt-24 px-8">
      <div className="max-w-2xl mx-auto bg-netflix-gray rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Ajouter un Nouveau Film
        </h2>
        
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-netflix-light-gray text-white rounded"
              placeholder="Entrez le titre du film"
              maxLength={100}
            />
          </div>
          
          <div>
            <label className="block text-white mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-netflix-light-gray text-white rounded"
              rows="4"
              placeholder="Décrivez le film"
              maxLength={500}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Date de sortie</label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full p-3 bg-netflix-light-gray text-white rounded"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full p-3 bg-netflix-light-gray text-white rounded"
              >
                <option value="">Sélectionnez un genre</option>
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-white mb-2">Note (optionnel)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-3 bg-netflix-light-gray text-white rounded"
              min="0"
              max="10"
              step="0.1"
              placeholder="Note sur 10"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="netflix-button flex-grow"
            >
              Ajouter le Film
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 flex-grow"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMoviePage;