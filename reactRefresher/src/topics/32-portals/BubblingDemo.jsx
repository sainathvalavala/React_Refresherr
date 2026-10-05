import { useState } from "react";
import { createPortal } from "react-dom";

// Events bubble through the REACT tree, not the DOM tree. The button lives
// in document.body (DOM-wise outside this div), but its click still reaches
// this div's onClick, because in React it's a child.
function BubblingDemo() {
  const [parentClicks, setParentClicks] = useState(0);

  return (
    <div className="nested" onClick={() => setParentClicks(parentClicks + 1)}>
      <p>Parent div caught {parentClicks} clicks.</p>
      {createPortal(
        <button className="floating-button" onClick={() => console.log("portal button clicked")}>
          Portal button (bottom right of the page)
        </button>,
        document.body,
      )}
    </div>
  );
}

export default BubblingDemo;
