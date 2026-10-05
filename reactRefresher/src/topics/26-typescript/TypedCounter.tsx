import { useRef, useState, type ChangeEvent } from "react";

// Typing state, events and refs.
function TypedCounter() {
  // Inferred from the initial value: count is a number, setCount takes a number
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Give the type explicitly when the initial value doesn't tell the full story
  const [history, setHistory] = useState<number[]>([]);

  // DOM refs: the element type, starting as null until React attaches it
  const inputRef = useRef<HTMLInputElement>(null);

  // Event types come from React: ChangeEvent<the element that fired it>
  function handleStepChange(e: ChangeEvent<HTMLInputElement>) {
    setStep(Number(e.target.value));
  }

  function increment() {
    setCount(count + step);
    setHistory([...history, count + step]);
  }

  return (
    <div className="stack">
      <p className="big">{count}</p>
      <label className="row">
        Step
        <input ref={inputRef} type="number" value={step} onChange={handleStepChange} />
      </label>
      <div className="row">
        <button onClick={increment}>+{step}</button>
        {/* ?. because inputRef.current is HTMLInputElement | null */}
        <button onClick={() => inputRef.current?.select()}>Select step input</button>
      </div>
      <p>History: {history.join(", ") || "none yet"}</p>
    </div>
  );
}

export default TypedCounter;
