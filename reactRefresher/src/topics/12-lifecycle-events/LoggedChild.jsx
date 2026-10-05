import { useEffect } from "react";

// setLog is the parent's state setter, passed down so this component can
// write to the on-screen log. Setters from useState never change between
// renders, so listing setLog as a dependency doesn't re-run the effects.
function LoggedChild({ count, setLog }) {
  // Mount + unmount
  useEffect(() => {
    setLog((log) => [...log, "Child: mounted"]);
    return () => setLog((log) => [...log, "Child: unmounted (cleanup)"]);
  }, [setLog]);

  // Runs on mount AND on every count change. Unlike componentDidUpdate,
  // an effect with [count] also runs the first time.
  useEffect(() => {
    setLog((log) => [...log, `Child: effect saw count = ${count}`]);
  }, [count, setLog]);

  return <p className="nested">Child sees count = {count}</p>;
}

export default LoggedChild;
