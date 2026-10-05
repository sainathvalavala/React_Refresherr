import { useState } from "react";

// State is a snapshot: during one render, count is a fixed number. Calling
// setCount doesn't change it straight away; it asks React for a new render.
//
// "+3 (broken)" calls setCount(count + 1) three times, but count is 0 every
// time in this render, so it means "set to 1" three times, giving 1.
//
// "+3 (updater)" passes a function. React queues the three functions and
// runs them in order (0 -> 1 -> 2 -> 3), each with the latest value.
function SnapshotDemo() {
  const [count, setCount] = useState(0);

  function addThreeBroken() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log("count right after setting:", count); // still the old value
  }

  function addThreeUpdater() {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  return (
    <div className="stack">
      <p className="big">{count}</p>
      <div className="row">
        <button onClick={addThreeBroken}>+3 (broken)</button>
        <button onClick={addThreeUpdater}>+3 (updater)</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default SnapshotDemo;
