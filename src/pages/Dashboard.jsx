import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import GifGrid from "../components/GifGrid";
import { recordGifUsage, searchGifs } from "../services/gifApi";
import "../styles/dashboard.css";

function Dashboard() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [searchId, setSearchId] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteGifIds");

    if (!savedFavorites) {
      return [];
    }

    try {
      return JSON.parse(savedFavorites);
    } catch (error) {
      console.error("Failed to load favorite GIFs from local storage.", error);
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    let isActive = true;

    async function loadGifs() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await searchGifs(debouncedQuery);

        if (!isActive) {
          return;
        }

        setGifs(data.results);
        setHasSearched(debouncedQuery.trim().length > 0);
        setSearchId(data.searchId);
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("Failed to load GIFs.", error);
        setGifs([]);
        setSearchId(null);
        setHasSearched(debouncedQuery.trim().length > 0);
        setErrorMessage("Could not load GIFs right now. Please try again.");
      } finally {
        if (!isActive) {
          return;
        }

        setIsLoading(false);
      }
    }

    loadGifs();

    return () => {
      isActive = false;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    localStorage.setItem("favoriteGifIds", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const filteredGifs = useMemo(() => {
    if (!showFavoritesOnly) {
      return gifs;
    }

    return gifs.filter((gif) => favoriteIds.includes(gif.id));
  }, [favoriteIds, gifs, showFavoritesOnly]);

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

  function handleClearSearch() {
    setQuery("");
  }

  async function handleGifCopy(gifId) {
  if (!searchId) {
    return;
  }

  try {
    await recordGifUsage(gifId, searchId);
  } catch (error) {
    console.error("Failed to record GIF usage.", error);
  }
}

  const statusText = showFavoritesOnly
    ? `Showing ${filteredGifs.length} favorite${
        filteredGifs.length === 1 ? "" : "s"
      }`
    : `Showing ${filteredGifs.length} GIF${
        filteredGifs.length === 1 ? "" : "s"
      }`;

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
              <p className="dashboard__status">{statusText}</p>

              {query && (
                <button
                  className="dashboard__clear-button"
                  type="button"
                  onClick={handleClearSearch}
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="dashboard__content">
          {isLoading ? (
            <div className="dashboard__message-card">Loading GIFs...</div>
          ) : errorMessage ? (
            <div className="dashboard__message-card">{errorMessage}</div>
          ) : filteredGifs.length > 0 ? (
            <GifGrid
              gifs={filteredGifs}
              favoriteIds={favoriteIds}
              onFavoriteToggle={handleFavoriteToggle}
              onGifCopy={handleGifCopy}
            />
          ) : (
            <div className="dashboard__message-card">
              {showFavoritesOnly
                ? "No favorite GIFs match this view."
                : hasSearched
                ? "No GIFs found. Try a different search."
                : "Start by searching for a GIF."}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;