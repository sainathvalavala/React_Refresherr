import { useEffect, useState } from "react";
import { searchCities } from "./fakeApi";

// ❌ No cleanup: every request that finishes calls setResult, in whatever
// order they finish. If an OLD request finishes after a newer one, it
// overwrites the newer results.
function BuggySearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (query === "") return;
    searchCities(query).then((cities) => setResult({ query, cities }));
  }, [query]);

  return (
    <div className="stack">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Quickly type "ag"' />
      {result && (
        <>
          {result.query !== query && (
            <p className="field-error">
              ⚠️ Showing results for "{result.query}" but you typed "{query}"
            </p>
          )}
          <p>{result.cities.join(", ") || "No cities"}</p>
        </>
      )}
    </div>
  );
}

export default BuggySearch;
