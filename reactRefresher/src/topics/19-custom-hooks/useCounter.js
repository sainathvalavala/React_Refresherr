import { useState } from "react";

// Custom hook: a function whose name starts with "use" and which calls
// other hooks. It packages stateful logic so any component can reuse it.
// Each component that calls useCounter gets its OWN separate count.
export default function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
