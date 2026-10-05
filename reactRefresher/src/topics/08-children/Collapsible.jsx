import { useState } from "react";

// A wrapper can have its own state and logic. Collapsible owns open/closed
// and decides WHETHER to show its children, but it never needs to know what
// the children are. The same Collapsible works for an FAQ, a menu, anything.
function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "▼" : "▶"} {title}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

export default Collapsible;
