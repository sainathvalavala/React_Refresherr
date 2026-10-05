import { useRef, useState } from "react";

// Ref vs state: both keep a value between renders, but changing
// ref.current does NOT re-render, so the screen doesn't update. Use state
// for what the user sees and a ref for behind-the-scenes values.
function RefVsState() {
  const [stateClicks, setStateClicks] = useState(0);
  const refClicks = useRef(0);

  return (
    <div className="stack">
      <p>State clicks shown on screen: {stateClicks}</p>
      <div className="row">
        <button onClick={() => setStateClicks(stateClicks + 1)}>+1 state</button>
        <button onClick={() => (refClicks.current += 1)}>+1 ref (no re-render)</button>
        <button onClick={() => alert(`Ref clicks: ${refClicks.current}`)}>
          Show ref value
        </button>
      </div>
    </div>
  );
}

export default RefVsState;
