import GifCard from "./GifCard";
import "../styles/gifGrid.css";

function GifGrid({ gifs }) {
  return (
    <section className="gif-grid">
      {gifs.map((gif) => (
        <GifCard key={gif.id} title={gif.title} />
      ))}
    </section>
  );
}

export default GifGrid;