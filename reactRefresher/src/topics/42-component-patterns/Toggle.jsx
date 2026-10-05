import { useState } from "react";

// Render props: the component owns the LOGIC (on/off state) but lets the
// caller decide the UI. children is a FUNCTION; Toggle calls it with its
// state, and whatever it returns is rendered.
//   <Toggle>{({ on, toggle }) => <button onClick={toggle}>{on ? "ON" : "OFF"}</button>}</Toggle>
// Today a custom hook (useToggle, topic 19) usually does this job more
// simply, but you'll still see render props in libraries.
function Toggle({ initial = false, children }) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((o) => !o);

  return children({ on, toggle });
}

export default Toggle;
