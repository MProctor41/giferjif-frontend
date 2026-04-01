import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import GifGrid from "../components/GifGrid";
import "../styles/dashboard.css";

const placeholderGifs = [
  { id: 1, title: "FUNNY CAT REACTION" },
  { id: 2, title: "DOG JUMPING EXCITED" },
  { id: 3, title: "DANCING CELEBRATION" },
  { id: 4, title: "CONFUSED EXPRESSION" },
  { id: 5, title: "HAPPY BABY LAUGHING" },
  { id: 6, title: "THUMBS UP SUCCESS" },
  { id: 7, title: "CLAPPING APPLAUSE" },
  { id: 8, title: "SHOCKED SURPRISED" },
];

function Dashboard() {
  const [query, setQuery] = useState("");
  const [gifs] = useState(placeholderGifs);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      console.log(`Searching GIFs for: ${trimmedQuery}`);
    }
  }, [query]);

  const filteredGifs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return gifs.filter((gif) => {
      const matchesQuery = gif.title.toLowerCase().includes(normalizedQuery);
      const matchesFavoriteFilter =
        !showFavoritesOnly || favoriteIds.includes(gif.id);

      return matchesQuery && matchesFavoriteFilter;
    });
  }, [favoriteIds, gifs, query, showFavoritesOnly]);

  function handleFavoriteToggle(gifId) {
    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(gifId)) {
        return currentFavorites.filter((id) => id !== gifId);
      }

      return [...currentFavorites, gifId];
    });
  }

  function handleFavoritesViewToggle() {
    setShowFavoritesOnly((currentValue) => !currentValue);
  }

  return (
    <div className="app-shell">
      <Header
        favoritesCount={favoriteIds.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={handleFavoritesViewToggle}
      />

      <main className="dashboard">
        <section className="dashboard__search-section">
          <div className="dashboard__search-stack">
            <div className="search-bar">
              <span className="search-bar__icon" aria-hidden="true">
                ⌕
              </span>

              <input
                className="search-bar__input"
                type="text"
                placeholder="Search GIFs..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search GIFs"
              />
            </div>

            <div className="dashboard__toolbar">
              <p className="dashboard__status">
                {showFavoritesOnly
                  ? `Showing ${filteredGifs.length} favorite${
                      filteredGifs.length === 1 ? "" : "s"
                    }`
                  : `Showing ${filteredGifs.length} GIF${
                      filteredGifs.length === 1 ? "" : "s"
                    }`}
              </p>

              {query && (
                <button
                  className="dashboard__clear-button"
                  type="button"
                  onClick={() => setQuery("")}
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="dashboard__content">
          {isLoading ? (
            <div className="dashboard__message-card">Searching...</div>
          ) : filteredGifs.length > 0 ? (
            <GifGrid
              gifs={filteredGifs}
              favoriteIds={favoriteIds}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ) : (
            <div className="dashboard__message-card">
              {showFavoritesOnly
                ? "No favorite GIFs found for this search."
                : "No GIFs found. Try a different search."}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
