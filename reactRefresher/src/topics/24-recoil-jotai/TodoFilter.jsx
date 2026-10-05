import { useAtom } from "jotai";
import { filterAtom } from "./todoAtoms";

// useAtom: read AND write, exactly like useState but shared.
// Recoil: const [filter, setFilter] = useRecoilState(filterAtom)
function TodoFilter() {
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <div className="row">
      Show:
      {["all", "active", "done"].map((option) => (
        <button
          key={option}
          onClick={() => setFilter(option)}
          style={{ fontWeight: filter === option ? 700 : 400 }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
