import { useRef, useState } from "react";

// Measuring: an element's real size is only known after the browser lays
// it out, so ask the DOM node with getBoundingClientRect(). Resize the
// window or the textarea (drag its corner), then measure again.
// The ref is read in an event handler, never during render.
function MeasureBox() {
  const boxRef = useRef(null);
  const [size, setSize] = useState(null);

  function measure() {
    const rect = boxRef.current.getBoundingClientRect();
    setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
  }

  return (
    <div className="stack">
      <textarea ref={boxRef} defaultValue="Drag my corner to resize me" rows={3} />
      <div className="row">
        <button onClick={measure}>Measure</button>
        {size && (
          <span>
            {size.width} x {size.height} px
          </span>
        )}
      </div>
    </div>
  );
}

export default MeasureBox;
