import { useState } from "react";

// Hot Module Replacement (HMR): while `npm run dev` is running, saving a file
// swaps just that module into the open page. There's no full reload, so
// React keeps component state.
// Try it: click the button a few times, then change the message below and save.
function HmrDemo() {
  const [clicks, setClicks] = useState(0);
  const message = "Edit this message in src/topics/01-setup/HmrDemo.jsx and save.";

  return (
    <div className="stack">
      <p>{message}</p>
      <div className="row">
        <button onClick={() => setClicks(clicks + 1)}>Clicked {clicks} times</button>
      </div>
      <p className="hint">The click count survives the edit: that's HMR.</p>
    </div>
  );
}

export default HmrDemo;
