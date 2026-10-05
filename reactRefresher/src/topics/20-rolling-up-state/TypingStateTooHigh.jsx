import { useState } from "react";
import RenderStamp from "../../components/RenderStamp";

// Unoptimal re-renders: the text state lives in the parent, so EVERY
// keystroke re-renders the parent and all of its children, including the
// sidebar that has nothing to do with the text.
function TypingStateTooHigh() {
  const [text, setText] = useState("");

  return (
    <div className="stack">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here" />
      <RenderStamp label="Unrelated sidebar" />
    </div>
  );
}

export default TypingStateTooHigh;
