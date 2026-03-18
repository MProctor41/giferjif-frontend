import "../styles/gifCard.css";

function GifCard({ title }) {
  return (
    <article className="gif-card">
      <div
        className="gif-card__placeholder"
        aria-label={`${title} preview placeholder`}
      >
        <span className="gif-card__placeholder-text">GIF PREVIEW</span>
      </div>

      <div className="gif-card__content">
        <h3 className="gif-card__title">{title}</h3>

        <div className="gif-card__actions">
          <button className="gif-card__copy-button" type="button">
            COPY
          </button>

          <button
            className="gif-card__favorite-button"
            type="button"
            aria-label={`Add ${title} to favorites`}
          >
            ♡
          </button>
        </div>
      </div>
    </article>
  );
}

export default GifCard;