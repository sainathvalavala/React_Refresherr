import { useState } from "react";

// A component that throws during render once count reaches 3.
function BuggyCounter({ label }) {
  const [count, setCount] = useState(0);

  if (count === 3) {
    throw new Error(`${label} crashed at 3`);
  }

  return (
    <div className="row">
      <span>
        {label}: {count}
      </span>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default BuggyCounter;
