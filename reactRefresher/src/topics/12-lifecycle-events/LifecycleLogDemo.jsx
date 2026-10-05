import { useState } from "react";
import LoggedParent from "./LoggedParent";

// Holds the log and the controls. Mount, update and unmount the parent and
// child, and read the order of events on screen.
function LifecycleLogDemo() {
  const [log, setLog] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [count, setCount] = useState(0);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setIsMounted(!isMounted)}>
          {isMounted ? "Unmount" : "Mount"}
        </button>
        <button onClick={() => setCount(count + 1)} disabled={!isMounted}>
          Update count
        </button>
        <button onClick={() => setLog([])}>Clear log</button>
      </div>
      {isMounted && <LoggedParent count={count} setLog={setLog} />}
      {/* The log only ever grows or is cleared, so index keys are safe here */}
      <ol className="log">
        {log.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ol>
    </div>
  );
}

export default LifecycleLogDemo;
