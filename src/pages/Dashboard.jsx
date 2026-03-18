import Header from "../components/Header";
import GifGrid from "../components/GifGrid";
import "../styles/dashboard.css";

function Dashboard() {
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

  return (
    <div className="app-shell">
      <Header />

      <main className="dashboard">
        <section className="dashboard__search-section">
          <div className="search-bar">
            <span className="search-bar__icon" aria-hidden="true">
              ⌕
            </span>

            <input
              className="search-bar__input"
              type="text"
              placeholder="Search GIFs..."
            />
          </div>
        </section>

        <section className="dashboard__content">
          <GifGrid gifs={placeholderGifs} />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;