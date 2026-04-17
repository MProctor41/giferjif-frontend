import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import GlobalHotkey from "./assets/Features/GlobalHotkey";
import SpotlightModal from "./assets/Features/SpotlightModal";

function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  return (
    <>
      <GlobalHotkey onOpen={() => setOpen(true)} />

      {open && (
        <SpotlightModal
          query={query}
          setQuery={setQuery}
          results={results}
          onClose={() => setOpen(false)}
        />
      )}

      <Dashboard />
    </>
  );
}

export default App;