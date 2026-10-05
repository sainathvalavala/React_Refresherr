const cities = ["Agra", "Ahmedabad", "Amritsar", "Bengaluru", "Bhopal", "Chennai", "Delhi", "Hyderabad", "Indore", "Jaipur", "Kochi", "Kolkata", "Lucknow", "Mumbai", "Mysuru", "Nagpur", "Pune", "Surat", "Vizag"];

// A pretend search API that supports cancelling through an AbortSignal,
// just like fetch(url, { signal }) does.
// SHORTER queries are SLOWER on purpose (1 letter: 1.4s, 2 letters: 0.8s,
// 3+: 0.3s). Typing quickly therefore makes an older request finish LAST,
// which is the race condition example 1 shows.
export function searchCities(query, { signal } = {}) {
  const delayMs = Math.max(300, 2000 - query.length * 600);

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve(cities.filter((city) => city.toLowerCase().startsWith(query.toLowerCase())));
    }, delayMs);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("The request was cancelled", "AbortError"));
    });
  });
}

// A pretend profile endpoint that fails when asked to
export function loadProfile({ shouldFail }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("503 Service Unavailable"));
      else resolve({ name: "Priya", plan: "Pro", joined: 2021 });
    }, 900);
  });
}
