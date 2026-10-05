import { useAtomValue } from "jotai";
import { statsAtom } from "./todoAtoms";

// Another derived atom. This component could sit anywhere in the app,
// even in a header far away, and still stay in sync.
function TodoStats() {
  const { total, done, left } = useAtomValue(statsAtom);

  return (
    <p>
      {total} total · {done} done · {left} left
    </p>
  );
}

export default TodoStats;
