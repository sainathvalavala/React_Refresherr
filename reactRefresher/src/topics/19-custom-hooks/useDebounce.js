import { useEffect, useState } from "react";

// Debounce: wait until the value has stopped changing for `delay` ms before
// using it, e.g. to avoid calling a search API on every single keystroke.
// Each change restarts the timer, because the cleanup cancels the old one.
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
}
