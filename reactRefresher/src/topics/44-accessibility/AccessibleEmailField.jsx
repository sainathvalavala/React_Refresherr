import { useId, useState } from "react";

// An accessible form field with an error:
//   <label htmlFor>   -> the input's name is read aloud, and clicking the label focuses it
//   aria-invalid      -> announces "invalid entry"
//   aria-describedby  -> reads the hint/error text after the label
//   role="alert"      -> the error is announced the moment it appears
function AccessibleEmailField() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const error = touched && !email.includes("@") ? "Email must contain @" : null;

  return (
    <div className="stack">
      <label htmlFor={id}>Email (required)</label>
      <input
        id={id}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-help`}
      />
      <small id={`${id}-help`}>
        {error ? (
          <span role="alert" className="field-error">
            {error}
          </span>
        ) : (
          "We'll send the receipt here."
        )}
      </small>
    </div>
  );
}

export default AccessibleEmailField;
