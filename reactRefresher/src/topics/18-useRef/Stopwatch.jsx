import { useEffect, useRef, useState } from "react";

// Ref as an instance variable: the interval id is needed by handleStop, but
// it never appears on screen, so it belongs in a ref, not in state. A normal
// "let intervalId" would reset to undefined on every render.
function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setNow(Date.now()), 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  // Stop the interval if the component is removed while it is running
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const seconds = startTime === null ? 0 : (now - startTime) / 1000;

  return (
    <div className="stack">
      <p className="big">{seconds.toFixed(2)}s</p>
      <div className="row">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}

export default Stopwatch;
