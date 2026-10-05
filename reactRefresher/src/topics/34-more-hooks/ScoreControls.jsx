import { useRef } from "react";
import ScoreBoard from "./ScoreBoard";

// The parent "commands" the children through their handles. Use this
// sparingly: passing props is usually better. It fits imperative actions
// such as focus, scroll, play/pause and reset.
function ScoreControls() {
  const arunRef = useRef(null);
  const priyaRef = useRef(null);

  return (
    <div className="stack">
      <div className="grid">
        <ScoreBoard ref={arunRef} player="Arun" />
        <ScoreBoard ref={priyaRef} player="Priya" />
      </div>
      <div className="row">
        <button onClick={() => arunRef.current.addPoints(10)}>Arun +10</button>
        <button onClick={() => priyaRef.current.addPoints(5)}>Priya +5</button>
        <button
          onClick={() => {
            arunRef.current.reset();
            priyaRef.current.reset();
          }}
        >
          Reset both
        </button>
      </div>
    </div>
  );
}

export default ScoreControls;
