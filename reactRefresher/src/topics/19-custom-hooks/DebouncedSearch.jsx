import { useState } from "react";
import useDebounce from "./useDebounce";

function DebouncedSearch() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);

  return (
    <div className="stack">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type fast..." />
      <p>Typed right now: {text}</p>
      <p>Debounced (would be sent to an API): {debouncedText}</p>
    </div>
  );
}

export default DebouncedSearch;
