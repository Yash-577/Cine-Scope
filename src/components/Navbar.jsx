import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ toggleTheme, theme, onSearch, onHomeClick }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      navigate("/"); // redirect to home page to show search results
    }
  };

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
      navigate("/"); // redirect to home page
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleHomeClick} style={{ cursor: "pointer" }}>
        🎥 CineScope
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul className="nav-links">
        <li>
          <Link to="/" onClick={handleHomeClick}>Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </nav>
  );
}
