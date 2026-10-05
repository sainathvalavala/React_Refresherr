import { useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect: same API as useEffect, but it runs AFTER React updates
// the DOM and BEFORE the browser paints. Use it to measure something and
// fix the layout before the user sees anything.
// Here the tooltip must know its own height to sit ABOVE the button. With
// useEffect it would first paint in the wrong place and then jump (a flicker).
function Tooltip({ text }) {
  const tooltipRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(tooltipRef.current.getBoundingClientRect().height);
  }, [text]);

  return (
    <div ref={tooltipRef} className="tooltip" style={{ top: -height - 8 }}>
      {text}
    </div>
  );
}

export default Tooltip;
