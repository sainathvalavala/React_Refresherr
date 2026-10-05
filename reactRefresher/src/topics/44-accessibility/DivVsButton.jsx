import { useState } from "react";

// A <div onClick> LOOKS like a button but isn't one: you can't reach it with
// Tab, Enter and Space do nothing, and screen readers don't announce it as
// a button. A real <button> gets all of that for free.
// Try it: click into the page above, then press Tab to move between these
// and Enter to press them.
function DivVsButton() {
  const [divClicks, setDivClicks] = useState(0);
  const [buttonClicks, setButtonClicks] = useState(0);

  return (
    <div className="grid">
      <div className="stack">
        <strong>❌ div with onClick</strong>
        <div className="fake-button" onClick={() => setDivClicks(divClicks + 1)}>
          Fake button ({divClicks})
        </div>
      </div>
      <div className="stack">
        <strong>✅ real button</strong>
        <div className="row">
          <button onClick={() => setButtonClicks(buttonClicks + 1)}>Real button ({buttonClicks})</button>
        </div>
      </div>
    </div>
  );
}

export default DivVsButton;
