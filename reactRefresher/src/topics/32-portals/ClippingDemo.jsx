import { useState } from "react";
import { createPortal } from "react-dom";

// Why portals exist: CSS of ANCESTORS can trap an element. This box has
// overflow: hidden and a transform, which (a CSS rule) makes even
// position: fixed children positioned and clipped relative to the box.
//   Inline popup -> rendered inside the box: cut off
//   Portal popup -> rendered in document.body: escapes, covers the page
function ClippingDemo() {
  const [openWhich, setOpenWhich] = useState(null);

  const popup = (
    <div className="popup" onClick={() => setOpenWhich(null)}>
      <strong>I'm a popup. Click me to close.</strong>
      <p>If you can read all of this, I'm not clipped.</p>
    </div>
  );

  return (
    <div className="clip-box">
      <div className="row">
        <button onClick={() => setOpenWhich("inline")}>Open inline popup</button>
        <button onClick={() => setOpenWhich("portal")}>Open portal popup</button>
      </div>
      {openWhich === "inline" && popup}
      {openWhich === "portal" && createPortal(popup, document.body)}
    </div>
  );
}

export default ClippingDemo;
