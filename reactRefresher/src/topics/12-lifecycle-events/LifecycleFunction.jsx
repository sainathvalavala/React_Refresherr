import { useEffect } from "react";

// The same three moments in a function component, all with useEffect:
//   mount   -> effect with []
//   update  -> effect with [count]
//   unmount -> the cleanup function returned from the [] effect
function LifecycleFunction({ count }) {
  useEffect(() => {
    console.log("[function] mounted");
    return () => console.log("[function] unmounted");
  }, []);

  useEffect(() => {
    console.log(`[function] count is now ${count}`);
  }, [count]);

  return <p>Function component sees count = {count}</p>;
}

export default LifecycleFunction;
