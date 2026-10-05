import { useState } from "react";

const emptyForm = { name: "", email: "", password: "" };

// Validation is a plain function of the values. Errors are DERIVED on every
// render, not stored in state, so they can never be out of date.
function validate(values) {
  const errors = {};
  if (values.name.trim() === "") errors.name = "Name is required";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email";
  if (values.password.length < 8) errors.password = "Use at least 8 characters";
  return errors;
}

// Controlled form: React state is the single source of truth for every
// field (value={...} + onChange). "touched" remembers which fields the user
// has left, so errors only appear after they've had a chance to type.
function SignupFormControlled() {
  const [values, setValues] = useState(emptyForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  // One handler for every field, using the input's name attribute
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's default full-page form submit
    setTouched({ name: true, email: true, password: true }); // reveal all errors
    if (!isValid) return;
    setSubmitted(values);
    setValues(emptyForm);
    setTouched({});
  }

  // A small helper so each field's markup stays short
  function showError(field) {
    return touched[field] && errors[field] ? <small className="field-error">{errors[field]}</small> : null;
  }

  return (
    <form className="stack" onSubmit={handleSubmit} noValidate>
      <label htmlFor="signup-name">Name</label>
      <input id="signup-name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
      {showError("name")}

      <label htmlFor="signup-email">Email</label>
      <input id="signup-email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
      {showError("email")}

      <label htmlFor="signup-password">Password ({values.password.length}/8)</label>
      <input
        id="signup-password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {showError("password")}

      <div className="row">
        <button type="submit">Sign up</button>
      </div>
      {submitted && <p>✅ Signed up as {submitted.name} ({submitted.email})</p>}
    </form>
  );
}

export default SignupFormControlled;
