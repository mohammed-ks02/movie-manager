// src/services/tmdbService.js
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: { 
        api_key: API_KEY, 
        page,
        language: 'fr-FR'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { 
        api_key: API_KEY, 
        query,
        language: 'fr-FR'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: { 
        api_key: API_KEY,
        language: 'fr-FR'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};