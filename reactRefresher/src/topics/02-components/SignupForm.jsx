// HTML vs JSX: JSX looks like HTML but follows JavaScript rules, so a few
// attribute names change:
//   class    -> className   ("class" is a reserved word in JavaScript)
//   for      -> htmlFor     ("for" is a loop keyword)
//   onclick  -> onClick     (event names are camelCase)
//   tabindex -> tabIndex    (multi-word attributes are camelCase)
// Every tag must be closed: <input />, <br />, <img />.
function SignupForm() {
  return (
    <form className="stack" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" tabIndex={1} placeholder="you@example.com" />
      <br />
      <button type="submit" onClick={() => console.log("Submitted")}>
        Sign up
      </button>
    </form>
  );
}

export default SignupForm;
