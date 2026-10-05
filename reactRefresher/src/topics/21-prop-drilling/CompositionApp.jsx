import { useState } from "react";
import ComposedPage from "./ComposedPage";
import ComposedHeader from "./ComposedHeader";
import UserGreeting from "./UserGreeting";

// Solving prop drilling WITHOUT context: the top component, which owns user,
// builds <UserGreeting user={user} /> itself and passes the finished element
// down through children/props. The middle components only place it, so the
// data skips the layers in between.
function CompositionApp() {
  const [user, setUser] = useState("Arun");

  return (
    <div className="stack">
      <input value={user} onChange={(e) => setUser(e.target.value)} />
      <div className="nested">
        CompositionApp (owns user, builds UserGreeting directly)
        <ComposedPage
          header={
            <ComposedHeader>
              <UserGreeting user={user} />
            </ComposedHeader>
          }
        />
      </div>
    </div>
  );
}

export default CompositionApp;
