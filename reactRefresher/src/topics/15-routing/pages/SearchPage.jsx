import { useSearchParams } from "react-router-dom";

const allTopics = ["useState", "useEffect", "useRef", "props", "context", "routing"];

// Query strings: the part after "?" in /search?q=use. Unlike :params,
// they're optional and good for filters, search terms and page numbers.
// useSearchParams works like useState, but the value lives in the URL, so
// it survives a refresh and can be shared as a link.
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const results = allTopics.filter((topic) => topic.toLowerCase().includes(query.toLowerCase()));

  function handleChange(e) {
    const value = e.target.value;
    // replace: true updates the current history entry instead of adding one
    // per keystroke, so the Back button isn't flooded with half-typed searches
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  return (
    <div className="stack">
      <h4>Search</h4>
      <input value={query} onChange={handleChange} placeholder="Search topics" />
      <p>Results: {results.join(", ") || "none"}</p>
    </div>
  );
}

export default SearchPage;
