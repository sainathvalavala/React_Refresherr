import { useRef } from "react";
import FancyInput from "./FancyInput";

// The parent creates the refs and passes them to its own FancyInput
// components. It can then move focus around, e.g. to the first empty field.
function LoginFormFocus() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function focusFirstEmpty() {
    if (emailRef.current.value === "") {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  }

  return (
    <div className="stack">
      <FancyInput label="Email" ref={emailRef} />
      <FancyInput label="Password" ref={passwordRef} />
      <div className="row">
        <button onClick={focusFirstEmpty}>Focus first empty field</button>
      </div>
    </div>
  );
}

export default LoginFormFocus;
