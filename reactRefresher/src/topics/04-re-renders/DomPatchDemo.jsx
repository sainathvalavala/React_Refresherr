import { useEffect, useState } from "react";

// Re-render does not mean "rebuild the page". This component re-renders
// every second, but React compares the new JSX with the old and changes
// only the one text node that differs. The input is never recreated, so
// your typed text and cursor position survive every re-render.
function DomPatchDemo() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="stack">
      <p>Re-rendered {seconds} times so far</p>
      <input placeholder="Type here while it ticks" />
    </div>
  );
}

export default DomPatchDemo;
