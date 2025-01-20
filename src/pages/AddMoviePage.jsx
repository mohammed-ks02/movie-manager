// src/pages/AddMoviePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddMoviePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Predefined genre options
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
    if (description.trim().length < 10) {
      setError('La description doit contenir au moins 10 caractères');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;

    // Get existing movies from local storage
    const existingMovies = JSON.parse(localStorage.getItem('manualMovies') || '[]');

    // Check for duplicate titles
    const isDuplicate = existingMovies.some(
      movie => movie.title.toLowerCase() === title.trim().toLowerCase()
    );

    if (isDuplicate) {
      setError('Un film avec ce titre existe déjà');
      return;
    }

    // Create new movie object with additional details
    const newMovie = {
      id: Date.now(), // Use timestamp as unique ID
      title: title.trim(),
      description: description.trim(),
      release_date: releaseDate,
      genre: genre,
      rating: rating ? parseFloat(rating) : null,
      isManual: true,
      created_at: new Date().toISOString()
    };

    // Save to local storage
    const updatedMovies = [...existingMovies, newMovie];
    localStorage.setItem('manualMovies', JSON.stringify(updatedMovies));

    // Reset form and navigate
    resetForm();
    navigate('/');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setReleaseDate('');
    setGenre('');
    setRating('');
    setError('');
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Ajouter un Nouveau Film
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label 
              htmlFor="title" 
              className="block text-gray-700 font-bold mb-2"
            >
              Titre *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Entrez le titre du film"
              maxLength={100}
            />
          </div>
          
          {/* Description Input */}
          <div className="mb-4">
            <label 
              htmlFor="description" 
              className="block text-gray-700 font-bold mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows="4"
              placeholder="Décrivez le film"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.length}/500 caractères
            </p>
          </div>
          
          {/* Release Date Input */}
          <div className="mb-4">
            <label 
              htmlFor="releaseDate" 
              className="block text-gray-700 font-bold mb-2"
            >
              Date de Sortie
            </label>
            <input
              type="date"
              id="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Genre Select */}
          <div className="mb-4">
            <label 
              htmlFor="genre" 
              className="block text-gray-700 font-bold mb-2"
            >
              Genre
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez un genre</option>
              {genres.map(genreOption => (
                <option key={genreOption} value={genreOption}>
                  {genreOption}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Input */}
          <div className="mb-6">
            <label 
              htmlFor="rating" 
              className="block text-gray-700 font-bold mb-2"
            >
              Note (optionnel)
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="10"
              step="0.1"
              placeholder="Note sur 10"
            />
          </div>
          
          {/* Submit and Reset Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-grow bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Ajouter le Film
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-grow bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMoviePage;