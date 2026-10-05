import { useId, useState } from "react";

// A show/hide section that screen readers understand:
//   aria-expanded -> announces "expanded" or "collapsed" on the button
//   aria-controls -> links the button to the panel it controls (by id)
//   hidden        -> really hides the panel from everyone, screen readers included
function Disclosure({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="card">
      <button aria-expanded={isOpen} aria-controls={panelId} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "▼" : "▶"} {title}
      </button>
      <div id={panelId} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}

export default Disclosure;
