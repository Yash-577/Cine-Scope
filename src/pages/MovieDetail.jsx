import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import ErrorScreen from "../components/ErrorScreen";
import "./MovieDetail.css";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToFavorites, favorites } = useAppContext();

  const BEARER = process.env.REACT_APP_TMDB_BEARER; // <-- hidden Bearer key

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${BEARER}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.ok) setMovie(data);
        else throw new Error("Movie not found");
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, BEARER]);

  if (loading) return <Loader />;
  if (error) return <ErrorScreen message="Could not load movie details." />;

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="movie-detail-container">
      <Link to="/" className="back-link">
        ⬅ Back
      </Link>
      <div className="movie-detail-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} / 10
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="movie-overview">{movie.overview}</p>
          <button
            onClick={() => addToFavorites(movie)}
            className={`fav-btn ${isFavorite ? "added" : ""}`}
          >
            {isFavorite ? "❤️ In Favorites" : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
