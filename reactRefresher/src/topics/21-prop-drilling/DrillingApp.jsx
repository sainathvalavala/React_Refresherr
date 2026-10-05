import { useState } from "react";
import Page from "./Page";

// The state lives at the top, but the component that needs it is at the
// bottom, so it is passed through Page and Header, which don't care about it.
function DrillingApp() {
  const [user, setUser] = useState("Arun");

  return (
    <div className="stack">
      <input value={user} onChange={(e) => setUser(e.target.value)} />
      <div className="nested">
        DrillingApp (owns user state)
        <Page user={user} />
      </div>
    </div>
  );
}

export default DrillingApp;
