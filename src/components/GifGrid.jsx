import GifCard from "./GifCard";
import "../styles/gifGrid.css";

function GifGrid({ gifs, favoriteIds, onFavoriteToggle, onGifCopy, onGifLoadError }) {
  return (
    <section className="gif-grid">
      {gifs.map((gif) => (
        <GifCard
          key={gif.id}
          gif={gif}
          isFavorited={favoriteIds.includes(gif.id)}
          onFavoriteToggle={onFavoriteToggle}
          onGifCopy={onGifCopy}
          onGifLoadError={onGifLoadError}
        />
      ))}
    </section>
  );
}

export default GifGrid;