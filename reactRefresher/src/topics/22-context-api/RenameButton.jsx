import { useContext } from "react";
import { UserContext } from "./UserContext";

// Putting the setter in the context lets a deep child UPDATE the shared value.
function RenameButton() {
  const { setUser } = useContext(UserContext);

  return (
    <div className="row">
      <button onClick={() => setUser("Priya")}>Rename to Priya (from deep inside)</button>
    </div>
  );
}

export default RenameButton;
