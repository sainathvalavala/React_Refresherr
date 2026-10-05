import { useRef } from "react";

// DOM ref: pass the ref to an element's ref prop and React puts the real DOM
// node in inputRef.current, so you can call browser methods like focus().
function FocusInput() {
  const inputRef = useRef(null);

  return (
    <div className="row">
      <input ref={inputRef} placeholder="Click the button" />
      <button onClick={() => inputRef.current.focus()}>Focus the input</button>
    </div>
  );
}

export default FocusInput;
