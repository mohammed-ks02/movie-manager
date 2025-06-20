import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../store/slices/moviesSlice";
import { removeManualMovie } from "../store/slices/manualMoviesSlice";

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentMovie, loading } = useSelector((state) => state.movies);
  const { movies: manualMovies } = useSelector((state) => state.manualMovies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    const manualMovie = manualMovies.find((m) => m.id === parseInt(id));
    if (manualMovie) {
      if (
        window.confirm(
          `Êtes-vous sûr de vouloir supprimer ${manualMovie.title} ?`
        )
      ) {
      if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${manualMovie.title}" ?`)) {
        dispatch(removeManualMovie(parseInt(id)));
        navigate('/');
    }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-netflix-red"></div>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="pt-24 px-8 text-center text-gray-500">
        Film non trouvé
      </div>
    );
  }

  const isManualMovie = currentMovie.isManual;
  const backgroundImage = currentMovie.poster_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
    : currentMovie.image;

  return (
    <div className="pt-24 px-8">
      <div className="flex flex-col md:flex-row bg-netflix-gray rounded-lg overflow-hidden">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt={currentMovie.title}
            className="w-full md:w-1/3 h-96 object-cover"
          />
        )}

        <div
          className="p-6 flex-grow relative"
          style={{
            backgroundImage: backgroundImage
              ? `linear-gradient(to right, rgba(20,20,20,0.9), rgba(20,20,20,0.7)), url(${backgroundImage})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4 text-white">
              {currentMovie.title}
            </h1>

            <div className="space-y-4 text-gray-300">
              <p>{currentMovie.overview || currentMovie.description}</p>

              <div className="grid md:grid-cols-2 gap-4 text-white bg-black/50 p-4 rounded">
                {currentMovie.release_date && (
                  <div>
                    <strong>Date de sortie:</strong> {currentMovie.release_date}
                  </div>
                )}

                {isManualMovie && currentMovie.genre && (
                  <div>
                    <strong>Genre:</strong> {currentMovie.genre}
                  </div>
                )}

                {isManualMovie && currentMovie.rating !== null && (
                  <div>
                    <strong>Note:</strong> {currentMovie.rating?.toFixed(1)}/10
                  </div>
                )}

                {!isManualMovie && (
                  <>
                    <div>
                      <strong>Note:</strong>{" "}
                      {currentMovie.vote_average?.toFixed(1)}/10
                    </div>
                    <div>
                      <strong>Langue:</strong> {currentMovie.original_language}
                    </div>
                    <div>
                      <strong>Popularité:</strong>{" "}
                      {currentMovie.popularity?.toFixed(2)}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              {isManualMovie && (
                <>
                  <button
                    onClick={() => navigate(`/ajouter?edit=${id}`)}
                    className="netflix-button"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </>
              )}
              <button onClick={() => navigate(-1)} className="netflix-button">
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
