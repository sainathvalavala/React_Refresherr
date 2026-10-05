// JSX expressions: anything inside {} must be an EXPRESSION, meaning code
// that produces a value. Statements such as if, for or const can't go
// inside {}. Put them above the return instead.
function JsxExpressions() {
  const user = { first: "Priya", last: "Sharma" };
  const skills = ["HTML", "CSS", "JavaScript"];
  const hour = 9;

  function fullName(u) {
    return `${u.first} ${u.last}`;
  }

  return (
    <ul>
      <li>Object property: {user.first}</li>
      <li>Function call: {fullName(user)}</li>
      <li>Maths: 7 x 6 = {7 * 6}</li>
      <li>Ternary: {hour < 12 ? "Good morning" : "Good evening"}</li>
      <li>Array method: {skills.join(", ")}</li>
      <li>Template literal: {`${skills.length} skills`}</li>
      {/* This is how you write a comment inside JSX */}
      <li>
        Attributes take expressions too: <input placeholder={user.last} readOnly />
      </li>
      <li>
        Ignored values: [{true}{false}{null}{undefined}] render nothing.
      </li>
    </ul>
  );
}

export default JsxExpressions;
