import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPopularMovies } from "../store/slices/moviesSlice";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

function Home() {
  const dispatch = useDispatch();
  const { popularMovies, loading } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPopularMovies(page));
  }, [page]);

  return (
    <div className="pt-24 px-8">
      <h1 className="text-4xl font-bold mb-8">Films Populaires</h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 netflix-scrollbar">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="netflix-button disabled:opacity-50"
        >
          Précédent
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="netflix-button"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Home;
