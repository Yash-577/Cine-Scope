// Home.jsx
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import ErrorScreen from "../components/ErrorScreen";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
  const {
    movies,
    setMovies,
    trendingMovies,
    loading,
    setLoading,
    error,
    setError,
    addToFavorites,
    favorites,
  } = useAppContext();

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const API_KEY = process.env.REACT_APP_TMDB_KEY; // <-- hidden API key

  // Function to search movies from TMDb
  const searchMovies = async (query) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    setMovies(trendingMovies);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorScreen message="Failed to load movies. Please try again." />;

  return (
    <div className={`home-container ${theme}`}>
      <h1 className="home-title">🎬 Trending Movies</h1>

      {movies !== trendingMovies && (
        <button className="back-to-home" onClick={handleBackToHome}>
          ⬅ Back to Home
        </button>
      )}

      {movies.length === 0 ? (
        <p className="no-results">No movies found.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              onFavorite={() => addToFavorites(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
