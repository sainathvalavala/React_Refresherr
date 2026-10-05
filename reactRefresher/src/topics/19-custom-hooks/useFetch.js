import { useEffect, useState } from "react";

// The fetching logic from topic 5's UserFetcher, packaged so ANY component
// can load JSON with one line:
//   const { data, error, isLoading } = useFetch(url);
// It re-fetches when url changes and ignores responses for an old url.
export default function useFetch(url) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!ignore) setResult({ url, data, error: null });
      })
      .catch((err) => {
        if (!ignore) setResult({ url, data: null, error: err.message });
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  // Loading until we have a result for THIS url
  const isLoading = result === null || result.url !== url;

  return {
    data: isLoading ? null : result.data,
    error: isLoading ? null : result.error,
    isLoading,
  };
}
