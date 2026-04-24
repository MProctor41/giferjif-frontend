import { useState } from "react";
import "../styles/header.css";

function Header({
  favoritesCount,
  showFavoritesOnly,
  onToggleFavorites,
  viewMode,
  onToggleTrending,
}) {
  const [logoText] = useState(() =>
  Math.random() < 0.5 ? "giferjif" : "jifergif"
  );
  return (
    <header className="header">
      <div className="header__spacer" />

      <h1 className="header__title">
        {logoText === "giferjif" ? (
          <>
            GIFER<span className="header__title-accent">JIF</span>
          </>
        ) : (
          <>
            JIFER<span className="header__title-accent">GIF</span>
          </>
        )}
      </h1>

      <div className="header__actions">
        <button
          className={`trending-button ${
            viewMode === "trending" ? "trending-button--active" : ""
          }`}
          type="button"
          onClick={onToggleTrending}
        >
          🔥 {viewMode === "trending" ? "SEARCH" : "TRENDING"}
        </button>

        <button
          className={`favorites-button ${
            showFavoritesOnly ? "favorites-button--active" : ""
          }`}
          type="button"
          onClick={onToggleFavorites}
        >
          <span className="favorites-button__icon">♥</span>
          {showFavoritesOnly ? "SHOW ALL" : `FAVORITES (${favoritesCount})`}
        </button>
      </div>
    </header>
  );
}

export default Header;