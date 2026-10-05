import { useState } from "react";

// You might not need an effect: if a value can be CALCULATED from props or
// state, calculate it during render. Don't sync it with an effect.
//
// Avoid this. It renders once with a stale fullName, then the effect fixes
// it and triggers a second render:
//   const [fullName, setFullName] = useState("");
//   useEffect(() => { setFullName(first + " " + last); }, [first, last]);
//
// Do this instead: a plain variable, always correct, one render.
function FullNameForm() {
  const [first, setFirst] = useState("Arun");
  const [last, setLast] = useState("Kumar");

  const fullName = `${first} ${last}`;

  return (
    <div className="stack">
      <div className="row">
        <input value={first} onChange={(e) => setFirst(e.target.value)} />
        <input value={last} onChange={(e) => setLast(e.target.value)} />
      </div>
      <p>Full name: {fullName}</p>
    </div>
  );
}

export default FullNameForm;
