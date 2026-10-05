import { useState } from "react";
import TallyCounter from "./TallyCounter";

// "Reset everything" without writing reset code: bump a number and use it
// as the key. Every component inside is thrown away and rebuilt with its
// initial state, however much state it has.
function ResettableForm() {
  const [version, setVersion] = useState(0);

  return (
    <div className="stack">
      <div key={version} className="grid">
        <TallyCounter label="Apples" />
        <TallyCounter label="Oranges" />
        <input placeholder="Type something" />
      </div>
      <div className="row">
        <button onClick={() => setVersion(version + 1)}>Reset all (key = {version})</button>
      </div>
    </div>
  );
}

export default ResettableForm;
