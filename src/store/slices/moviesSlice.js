import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies, searchMovies, getMovieDetails } from '../../services/tmdbService';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page = 1) => {
    const response = await getPopularMovies(page);
    return response;
  }
);

export const searchMoviesByQuery = createAsyncThunk(
  'movies/searchMovies',
  async (query) => {
    // Search TMDB movies
    const tmdbResults = await searchMovies(query);

    // Search manual movies
    const manualMovies = JSON.parse(localStorage.getItem('manualMovies') || '[]');
    const manualResults = manualMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      (movie.description && movie.description.toLowerCase().includes(query.toLowerCase()))
    );

    // Combine and add isManual flag to manual movies
    const combinedResults = [
      ...tmdbResults,
      ...manualResults.map(movie => ({
        ...movie,
        poster_path: null, // Manual movies don't have poster paths
        isManual: true
      }))
    ];

    return combinedResults;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId) => {
    // Convert ID to number, handling both string and number inputs
    const parsedId = typeof movieId === 'string' ? parseInt(movieId, 10) : movieId;

    // First check manual movies
    const manualMovies = JSON.parse(localStorage.getItem('manualMovies') || '[]');
    const manualMovie = manualMovies.find(m => m.id === parsedId);

    if (manualMovie) {
      return { ...manualMovie, isManual: true };
    }

    // If not a manual movie, fetch from TMDB
    const details = await getMovieDetails(parsedId);
    return details;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    searchResults: [],
    currentMovie: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchMoviesByQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMoviesByQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMoviesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
}
});
export default moviesSlice.reducer;