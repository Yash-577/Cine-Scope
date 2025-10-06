import React from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./Favorites.css";

export default function Favorites() {
  const { favorites, removeFromFavorites } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="favorites-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>

      <h1 className="favorites-title">❤️ Your Favorite Movies</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites">You haven’t added any favorites yet!</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-card">
              <MovieCard movie={movie} />
              <button
                className="remove-btn"
                onClick={() => removeFromFavorites(movie.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
