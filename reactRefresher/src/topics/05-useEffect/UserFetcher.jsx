import { useEffect, useState } from "react";

// Fetching data is the most common effect. It re-runs whenever userId changes.
// The cleanup sets ignore = true, so if you click quickly, a slow old response
// can't overwrite the newer one (a "race condition").
function UserFetcher() {
  const [userId, setUserId] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((user) => {
        if (!ignore) setResult({ id: userId, user });
      })
      .catch(() => {
        if (!ignore) setResult({ id: userId, error: "Could not load user" });
      });

    return () => {
      ignore = true;
    };
  }, [userId]);

  // Still loading if we have no result yet, or the result is for an old id
  const isLoading = result === null || result.id !== userId;

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setUserId(Math.max(1, userId - 1))}>Previous</button>
        <span>User #{userId}</span>
        <button onClick={() => setUserId(Math.min(10, userId + 1))}>Next</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : result.error ? (
        <p>{result.error}</p>
      ) : (
        <p>
          {result.user.name} ({result.user.email})
        </p>
      )}
    </div>
  );
}

export default UserFetcher;
