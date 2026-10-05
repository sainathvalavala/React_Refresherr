import { useCounterStore } from "./useCounterStore";
import RenderStamp from "../../components/RenderStamp";

// A SELECTOR picks the slice this component needs: (state) => state.count.
// The component re-renders only when that slice changes.
function CounterDisplay() {
  const count = useCounterStore((state) => state.count);

  return (
    <div className="stack">
      <p className="big">{count}</p>
      <RenderStamp label="CounterDisplay (selects count)" />
    </div>
  );
}

export default CounterDisplay;
