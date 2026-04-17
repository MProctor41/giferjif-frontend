import { useRef, useEffect } from "react";

export default function SpotlightModal({
  query = "",
  setQuery = () => {},
  results = [],
  onClose = () => {},
}) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div style={overlay}>
      <div ref={modalRef} style={modal}>
        <input
          type="text"
          placeholder="Search GIFs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          style={input}
        />

        {query === "" ? (
          <p style={{ opacity: 0.6 }}>
            Start typing to search GIFs...
          </p>
        ) : results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <div style={grid}>
            {results.map((gif) => (
              <div
                key={gif.id}
                style={item}
                onClick={() => {
                  navigator.clipboard.writeText(gif.url);
                  alert("Copied!");
                  onClose();
                }}
              >
                <img src={gif.url} alt="gif" style={img} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* styles */

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "100px",
  zIndex: 1000,
};

const modal = {
  width: "500px",
  background: "#fff",
  border: "4px solid black",
  boxShadow: "6px 6px black",
  padding: "20px",
};

const input = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "2px solid black",
  marginBottom: "15px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
};

const item = {
  border: "2px solid black",
  cursor: "pointer",
};

const img = {
  width: "100%",
  display: "block",
};
