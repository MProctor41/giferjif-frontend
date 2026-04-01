import { useState } from "react";
import "../styles/gifCard.css";

function GifCard({ gif, isFavorited, onFavoriteToggle }) {
  const [copied, setCopied] = useState(false);

  function handleCopyClick() {
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1400);
  }

  return (
    <article className="gif-card">
      <div
        className="gif-card__placeholder"
        aria-label={`${gif.title} preview placeholder`}
      >
        <span className="gif-card__placeholder-text">GIF PREVIEW</span>
      </div>

      <div className="gif-card__content">
        <h3 className="gif-card__title">{gif.title}</h3>

        <div className="gif-card__actions">
          <button
            className={`gif-card__copy-button ${
              copied ? "gif-card__copy-button--copied" : ""
            }`}
            type="button"
            onClick={handleCopyClick}
            aria-label={`Copy ${gif.title}`}
          >
            {copied ? "COPIED!" : "COPY"}
          </button>

          <button
            className={`gif-card__favorite-button ${
              isFavorited ? "gif-card__favorite-button--active" : ""
            }`}
            type="button"
            onClick={() => onFavoriteToggle(gif.id)}
            aria-label={
              isFavorited
                ? `Remove ${gif.title} from favorites`
                : `Add ${gif.title} to favorites`
            }
          >
            {isFavorited ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default GifCard;
