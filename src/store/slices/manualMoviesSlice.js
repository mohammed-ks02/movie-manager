import { createSlice } from '@reduxjs/toolkit';

const MAX_MANUAL_MOVIES = 50; // Limit for manual movies

const manualMoviesSlice = createSlice({
  name: 'manualMovies',
  initialState: {
    movies: JSON.parse(localStorage.getItem('manualMovies') || '[]'),
  },
  reducers: {
    addManualMovie: (state, action) => {
      // Get existing movies
      const existingMovies = JSON.parse(localStorage.getItem('manualMovies') || '[]');

      // Check for duplicate titles
      const isDuplicate = existingMovies.some(
        movie => movie.title.toLowerCase() === action.payload.title.trim().toLowerCase()
      );

      if (isDuplicate) {
        throw new Error('Un film avec ce titre existe déjà');
      }

      // Manage local storage size
      if (existingMovies.length >= MAX_MANUAL_MOVIES) {
        const sortedMovies = existingMovies.sort((a, b) => 
          new Date(a.created_at) - new Date(b.created_at)
        );
        sortedMovies.shift(); // Remove the oldest movie
        sortedMovies.push(action.payload);
        localStorage.setItem('manualMovies', JSON.stringify(sortedMovies));
        state.movies = sortedMovies;
      } else {
        state.movies.push(action.payload);
        localStorage.setItem('manualMovies', JSON.stringify(state.movies));
      }
    },
    removeManualMovie: (state, action) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
      localStorage.setItem('manualMovies', JSON.stringify(state.movies));
    },
    updateManualMovie: (state, action) => {
      const index = state.movies.findIndex(movie => movie.id === action.payload.id);
      if (index !== -1) {
        state.movies[index] = action.payload;
        localStorage.setItem('manualMovies', JSON.stringify(state.movies));
      }
    },
  },
});

export const { addManualMovie, removeManualMovie, updateManualMovie } = manualMoviesSlice.actions;
export default manualMoviesSlice.reducer;