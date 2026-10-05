import { useState } from "react";
import { UserContext } from "./UserContext";
import Page from "./Page";

// Step 2, provide the context. Everything inside <UserContext value={...}>
// can read that value, however deep it is.
// React 19 lets you render the context itself. Older versions (and many
// tutorials) write <UserContext.Provider value={...}>, which still works.
function ContextApp() {
  const [user, setUser] = useState("Arun");

  return (
    <UserContext value={{ user, setUser }}>
      <div className="stack">
        <input value={user} onChange={(e) => setUser(e.target.value)} />
        <div className="nested">
          ContextApp (owns user state, provides it)
          <Page />
        </div>
      </div>
    </UserContext>
  );
}

export default ContextApp;
