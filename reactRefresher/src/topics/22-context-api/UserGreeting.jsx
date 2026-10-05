import { useContext } from "react";
import { UserContext } from "./UserContext";

// Step 3, read the context. useContext gives the value from the nearest
// provider above, with no props needed. When that value changes, every
// component reading it re-renders.
function UserGreeting() {
  const { user } = useContext(UserContext);

  return (
    <p className="nested">
      UserGreeting: Hello, <strong>{user}</strong>!
    </p>
  );
}

export default UserGreeting;
