import { useAtomValue } from "jotai";
import { countAtom } from "./atoms";
import RenderStamp from "../../components/RenderStamp";

// useAtomValue: read only. Re-renders when countAtom changes.
// Recoil: useRecoilValue(countAtom)
function CountValue() {
  const count = useAtomValue(countAtom);

  return (
    <div className="stack">
      <p className="big">{count}</p>
      <RenderStamp label="CountValue" />
    </div>
  );
}

export default CountValue;
