import { useState } from "react";
import Clock from "./Clock";

// Adding and removing <Clock /> mounts and unmounts it, so you can watch
// its effect start and its cleanup run in the console.
function ClockToggle() {
  const [showClock, setShowClock] = useState(true);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setShowClock(!showClock)}>
          {showClock ? "Remove clock (runs cleanup)" : "Show clock (runs effect)"}
        </button>
      </div>
      {showClock && <Clock />}
    </div>
  );
}

export default ClockToggle;
