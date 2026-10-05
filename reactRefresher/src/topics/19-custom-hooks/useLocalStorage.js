import { useEffect, useState } from "react";

// useState that remembers its value after a page refresh, by mirroring it
// into localStorage. Same API as useState: [value, setValue].
//   - Lazy initial state (topic 3): read storage once, on the first render.
//   - Effect (topic 5): write to storage whenever the value changes.
//   - try/catch: storage can be blocked (private mode) or hold bad JSON.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable: the value still works in memory
    }
  }, [key, value]);

  return [value, setValue];
}
