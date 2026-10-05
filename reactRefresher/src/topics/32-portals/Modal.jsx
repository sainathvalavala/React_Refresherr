import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// createPortal(jsx, domNode): render the JSX into a DIFFERENT DOM node, here
// document.body, instead of inside the parent's element. In React's tree
// the modal is still a child of whoever rendered it (props, state, context
// and events all work normally); only its DOM position moves.
//
// A11y basics: role="dialog" + aria-modal, a label, Escape to close, and
// focus moved into the dialog when it opens.
function Modal({ title, onClose, children }) {
  const closeButtonRef = useRef(null);

  // Focus once, when the modal opens. This is kept separate from the effect
  // below: onClose is often a new function every render, and re-running
  // this effect would steal focus from the input while the user types.
  useEffect(() => {
    closeButtonRef.current.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      {/* stopPropagation: clicks inside the box shouldn't reach the backdrop */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="modal-title">{title}</h3>
        {children}
        <div className="row">
          <button ref={closeButtonRef} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
