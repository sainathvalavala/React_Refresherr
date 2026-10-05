import { useCallback, useState } from "react";
import MemoButton from "./MemoButton";

// Functions are objects, and a function defined in a component is a NEW
// object on every render. So passing handleInline to a memo() child breaks
// memo: the prop is "different" every time.
// useCallback(fn, deps) returns the SAME function until a dependency
// changes, so the memo() child can skip re-rendering.
function CallbackDemo() {
  const [text, setText] = useState("");
  const [clicks, setClicks] = useState(0);

  // New function every render
  const handleInline = () => setClicks((c) => c + 1);

  // Same function every render. [] is safe because it uses the updater form,
  // so it never reads `clicks` directly.
  const handleStable = useCallback(() => setClicks((c) => c + 1), []);

  return (
    <div className="stack">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type to re-render the parent" />
      <p>Clicks: {clicks}</p>
      <div className="grid">
        <MemoButton label="Inline function" onClick={handleInline} />
        <MemoButton label="useCallback function" onClick={handleStable} />
      </div>
    </div>
  );
}

export default CallbackDemo;
