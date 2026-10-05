import { addTenLater, useCounterStore } from "./useCounterStore";
import RenderStamp from "../../components/RenderStamp";

// Selects only the ACTIONS. Actions never change, so this component never
// re-renders when count changes. No provider, no props, no context.
function CounterButtons() {
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={decrement}>-1</button>
        <button onClick={increment}>+1</button>
        <button onClick={reset}>Reset</button>
        <button onClick={addTenLater}>+10 in 1s (from outside React)</button>
      </div>
      <RenderStamp label="CounterButtons (selects actions)" />
    </div>
  );
}

export default CounterButtons;
