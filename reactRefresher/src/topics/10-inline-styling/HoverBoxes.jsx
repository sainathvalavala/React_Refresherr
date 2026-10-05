import { useState } from "react";

// Inline styles can't do :hover, :focus, ::before or @media queries.
// Left box: faking :hover with state and mouse events (works, but it's
// extra code and an extra render on every hover).
// Right box: a real CSS class with :hover in App.css. Simpler: prefer it.
function HoverBoxes() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="grid">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          padding: 16,
          borderRadius: 8,
          background: isHovered ? "var(--accent)" : "var(--accent-bg)",
          color: isHovered ? "white" : "inherit",
        }}
      >
        Hover me (state + inline style)
      </div>
      <div className="hover-css">Hover me (CSS :hover)</div>
    </div>
  );
}

export default HoverBoxes;
