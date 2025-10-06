import React from "react";
import "./ErrorScreen.css";

export default function ErrorScreen({ message, onRetry }) {
  return (
    <div className="error-screen">
      <h2>😕 Oops! Something went wrong.</h2>
      <p>{message || "Unable to load movies. Please try again later."}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          🔁 Retry
        </button>
      )}
    </div>
  );
}
