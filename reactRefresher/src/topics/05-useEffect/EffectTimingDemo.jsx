import { useEffect, useState } from "react";

// The dependency array controls WHEN an effect runs. Open the console and:
//   - type in the input -> only A runs (count didn't change)
//   - click the button  -> A and C run
//   - B ran once, when the component first appeared
// React compares each dependency with its previous value using Object.is
// (like ===). If any differ, the effect runs again.
function EffectTimingDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("A. no array: after EVERY render");
  });

  useEffect(() => {
    console.log("B. [] : once, after the first render");
  }, []);

  useEffect(() => {
    console.log(`C. [count] : count is now ${count}`);
  }, [count]);

  return (
    <div className="row">
      <button onClick={() => setCount(count + 1)}>count: {count}</button>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="type here" />
    </div>
  );
}

export default EffectTimingDemo;
