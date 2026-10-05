import { useImperativeHandle, useState } from "react";

// useImperativeHandle(ref, () => api): instead of exposing a DOM node
// through the ref, expose a small object of METHODS you choose. The parent
// can call ref.current.reset() but can't touch anything else inside.
// In React 19, ref arrives as a normal prop (topic 18).
function ScoreBoard({ ref, player }) {
  const [score, setScore] = useState(0);

  useImperativeHandle(ref, () => ({
    addPoints(points) {
      setScore((s) => s + points);
    },
    reset() {
      setScore(0);
    },
  }));

  return (
    <p className="card">
      {player}: <strong>{score}</strong> points
    </p>
  );
}

export default ScoreBoard;
