import { useState, useEffect } from "react";

// OMDb free API key (replace with your own if needed)
const API_KEY = "4a3b711b"; // Demo key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export default function useFetchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}&s=${query.trim()}`);
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error || "No movies found");
          setMovies([]);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return { movies, loading, error };
}
