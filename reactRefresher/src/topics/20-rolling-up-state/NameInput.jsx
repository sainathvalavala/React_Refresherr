import { useState } from "react";

// Pushing state DOWN: the input owns its own text state, so typing only
// re-renders this small component.
function NameInput() {
  const [text, setText] = useState("");

  return <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here" />;
}

export default NameInput;
