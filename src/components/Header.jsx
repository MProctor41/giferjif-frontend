import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__spacer" />

      <h1 className="header__title">
        GIFER<span className="header__title-accent">JIF</span>
      </h1>

      <button className="favorites-button" type="button">
        <span className="favorites-button__icon">♥</span>
        FAVORITES
      </button>
    </header>
  );
}

export default Header;