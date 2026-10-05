import { useState } from "react";
import CountDisplay from "./CountDisplay";
import CountButtons from "./CountButtons";

// Lifted state: CountDisplay and CountButtons are siblings that both need
// count. Siblings can't share state directly, so it lives in their closest
// common parent (this component) and flows down as props.
function SharedCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="stack">
      <CountDisplay count={count} />
      <CountButtons setCount={setCount} />
    </div>
  );
}

export default SharedCounter;
