import { useEffect, useState } from "react";

// Subscribing to browser events is a classic effect: add the listener in
// the effect and remove it in the cleanup. When isTracking changes, React
// first runs the OLD cleanup (removing the old listener), then the new effect.
function MouseTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isTracking) return; // nothing to subscribe to, so no cleanup needed

    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isTracking]);

  return (
    <div className="stack">
      <label className="row">
        <input
          type="checkbox"
          checked={isTracking}
          onChange={(e) => setIsTracking(e.target.checked)}
        />
        Track the mouse
      </label>
      <p>
        Pointer position: x = {position.x}, y = {position.y}
      </p>
    </div>
  );
}

export default MouseTracker;
