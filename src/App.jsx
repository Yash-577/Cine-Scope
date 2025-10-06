import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import Navbar from "./components/Navbar";
import { AppProvider, useAppContext } from "./context/AppContext";
import "./App.css";

function AppContent() {
  const [theme, setTheme] = useState("dark");
  const { setMovies, trendingMovies, setLoading, setError } = useAppContext();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Function to search movies from TMDb
  const searchMovies = async (query) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=65fe744ffe20f7ac8277a16addc7c839&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to reset movies to default trending list
  const handleBackToHome = () => {
    setMovies(trendingMovies);
  };

  return (
    <div className={`app-container ${theme}`}>
      <Navbar
        toggleTheme={toggleTheme}
        theme={theme}
        onSearch={searchMovies}
        onHomeClick={handleBackToHome}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
