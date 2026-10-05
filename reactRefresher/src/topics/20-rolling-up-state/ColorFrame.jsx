import { useState } from "react";

// Fixing unoptimal re-renders with children: ColorFrame owns color state
// and re-renders on every change, but its {children} were created by the
// PARENT (the lesson), which did not re-render. React sees the exact same
// children elements as last time and skips them.
function ColorFrame({ children }) {
  const [color, setColor] = useState("#aa3bff");

  return (
    <div className="stack" style={{ border: `3px solid ${color}`, borderRadius: 8, padding: 12 }}>
      <label className="row">
        Frame color
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </label>
      {children}
    </div>
  );
}

export default ColorFrame;
