import { useState } from "react";

// Function component (the modern style): the same counter, written as a
// function with the useState hook. No class, no constructor, no "this".
function FunctionCounter({ label }) {
  const [count, setCount] = useState(0);

  return (
    <div className="stack">
      <p>
        {label}: {count}
      </p>
      <div className="row">
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  );
}

export default FunctionCounter;
