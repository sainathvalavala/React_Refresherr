import { useState } from "react";
import TallyCounter from "./TallyCounter";

// React ties state to a component's POSITION in the tree (plus its type
// and key), not to the variable or JSX line it came from.
//   A: same type, same position, only props change -> state KEPT
//   B: a different type appears at that position    -> state DESTROYED
//   C: same type, but each branch is a different child slot -> state DESTROYED
// Click +1 a few times in each, then press its toggle.
function PositionDemo() {
  const [isFancy, setIsFancy] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showFirst, setShowFirst] = useState(true);

  return (
    <div className="grid">
      <div className="stack">
        <strong>A: props change</strong>
        {isFancy ? <TallyCounter label="Fancy" fancy /> : <TallyCounter label="Plain" />}
        <button onClick={() => setIsFancy(!isFancy)}>Toggle fancy</button>
      </div>
      <div className="stack">
        <strong>B: type changes</strong>
        {isPaused ? <p className="card">Paused (a &lt;p&gt;)</p> : <TallyCounter label="Running" />}
        <button onClick={() => setIsPaused(!isPaused)}>Toggle paused</button>
      </div>
      <div className="stack">
        <strong>C: different slots</strong>
        {showFirst && <TallyCounter label="First slot" />}
        {!showFirst && <TallyCounter label="Second slot" />}
        <button onClick={() => setShowFirst(!showFirst)}>Switch slot</button>
      </div>
    </div>
  );
}

export default PositionDemo;
