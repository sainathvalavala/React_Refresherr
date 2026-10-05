import { useState } from "react";

// Not rendering vs hiding with CSS:
//   {isOpen && <input />}           -> the input is REMOVED (unmounted). Its
//                                      state is destroyed, so text is lost.
//   style={{ display: "none" }}     -> the input stays mounted, just
//                                      invisible, so its text survives.
// Type in both inputs, hide them, then show them again.
function KeepStateToggle() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Hide both" : "Show both"}</button>
      </div>
      <div className="grid">
        <div className="stack">
          <strong>{"{isOpen && ...}"} (unmounts)</strong>
          {isOpen && <input placeholder="Type, then hide" />}
        </div>
        <div className="stack">
          <strong>display: none (keeps state)</strong>
          <input placeholder="Type, then hide" style={{ display: isOpen ? "block" : "none" }} />
        </div>
      </div>
    </div>
  );
}

export default KeepStateToggle;
