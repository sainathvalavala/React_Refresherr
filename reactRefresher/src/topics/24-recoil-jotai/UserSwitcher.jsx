import { useAtom } from "jotai";
import { userIdAtom } from "./userAtoms";

function UserSwitcher() {
  const [userId, setUserId] = useAtom(userIdAtom);

  return (
    <div className="row">
      {[1, 2, 3].map((id) => (
        <button key={id} onClick={() => setUserId(id)} disabled={id === userId}>
          User {id}
        </button>
      ))}
    </div>
  );
}

export default UserSwitcher;
