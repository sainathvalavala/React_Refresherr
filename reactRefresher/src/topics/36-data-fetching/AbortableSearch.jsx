import { useEffect, useState } from "react";
import { searchCities } from "./fakeApi";

// ✅ AbortController: each effect run creates a controller and passes its
// signal to the request. The cleanup (which runs before the next effect)
// calls abort(), so the old request is CANCELLED: it never calls setResult,
// and with real fetch the browser also stops the download.
// This is the real-world version of topic 5's "ignore" flag.
function AbortableSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (query === "") return;
    const controller = new AbortController();

    searchCities(query, { signal: controller.signal })
      .then((cities) => setResult({ query, cities }))
      .catch((err) => {
        if (err.name === "AbortError") return; // cancelled on purpose: not an error
        setResult({ query, cities: [], error: err.message });
      });

    return () => controller.abort();
  }, [query]);

  const isLoading = query !== "" && result?.query !== query;

  return (
    <div className="stack">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Quickly type "ag"' />
      {isLoading && <p>Searching "{query}"...</p>}
      {!isLoading && result && query !== "" && <p>{result.cities.join(", ") || "No cities"}</p>}
    </div>
  );
}

export default AbortableSearch;
