import { useSetAtom } from "jotai";
import { countAtom } from "./atoms";
import RenderStamp from "../../components/RenderStamp";

// useSetAtom: write only. This component never reads count, so it does NOT
// re-render when count changes. Watch its render time stay frozen.
// Compare with useState lifted to a parent (topic 20), where the buttons
// would re-render too.
// Recoil: useSetRecoilState(countAtom)
function CountControls() {
  const setCount = useSetAtom(countAtom);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <RenderStamp label="CountControls" />
    </div>
  );
}

export default CountControls;
