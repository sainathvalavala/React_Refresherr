import { useAtomValue } from "jotai";
import { userAtom } from "./userAtoms";

// No loading state, no useEffect: useAtomValue hands back the RESOLVED
// value. While the Promise is pending, the nearest <Suspense> shows its
// fallback instead of this component.
function UserCard() {
  const user = useAtomValue(userAtom);

  return (
    <p>
      #{user.id}: <strong>{user.name}</strong> from {user.city}
    </p>
  );
}

export default UserCard;
