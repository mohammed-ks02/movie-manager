import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import manualMoviesReducer from './manualMoviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    manualMovies: manualMoviesReducer,
  },
});