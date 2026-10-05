import { useState } from "react";

// A tiny counter with its own state, used to watch when state is kept or lost.
function TallyCounter({ label, fancy = false }) {
  const [count, setCount] = useState(0);

  return (
    <div className="card" style={fancy ? { borderColor: "var(--accent)", background: "var(--accent-bg)" } : undefined}>
      <span>
        {label}: <strong>{count}</strong>
      </span>
      <div className="row">
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  );
}

export default TallyCounter;
