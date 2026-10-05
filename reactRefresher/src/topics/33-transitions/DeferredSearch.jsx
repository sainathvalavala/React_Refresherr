import { useDeferredValue, useState } from "react";
import SlowList from "./SlowList";

// useDeferredValue(value): returns a copy of value that is allowed to "lag
// behind". React first re-renders with the OLD deferred value (fast, so the
// input updates instantly), then renders the new value in the background.
// If you type again before it finishes, React drops that work and starts over.
function DeferredSearch() {
  const [text, setText] = useState("");
  const [isDeferred, setIsDeferred] = useState(true);
  const deferredText = useDeferredValue(text);

  const listText = isDeferred ? deferredText : text;
  const isStale = listText !== text; // the list is still showing older results

  return (
    <div className="stack">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type quickly here" />
      <label className="row">
        <input type="checkbox" checked={isDeferred} onChange={(e) => setIsDeferred(e.target.checked)} />
        Use useDeferredValue
      </label>
      <div style={{ opacity: isStale ? 0.5 : 1, transition: "opacity 0.2s" }}>
        <SlowList text={listText} />
      </div>
    </div>
  );
}

export default DeferredSearch;
