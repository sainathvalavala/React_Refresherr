// Plain async functions that fetch data. TanStack Query doesn't fetch
// anything itself: you give it a function that returns a promise, and it
// handles caching, loading states, retries and refetching around it.
const BASE = "https://jsonplaceholder.typicode.com";

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export function getPosts() {
  return fetchJson(`${BASE}/posts?_limit=5`);
}

export function getPost(id) {
  return fetchJson(`${BASE}/posts/${id}`);
}

export function createPost(post) {
  return fetchJson(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
}
