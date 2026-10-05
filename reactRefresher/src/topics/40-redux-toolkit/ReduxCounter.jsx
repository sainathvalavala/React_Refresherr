import { useDispatch, useSelector } from "react-redux";
import { decremented, incremented, incrementedByAmount } from "./counterSlice";

// useSelector(fn): read from the store; re-renders when the selected value changes.
// useDispatch(): get dispatch, then send actions: dispatch(incremented()).
function ReduxCounter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="stack">
      <p className="big">{value}</p>
      <div className="row">
        <button onClick={() => dispatch(decremented())}>-1</button>
        <button onClick={() => dispatch(incremented())}>+1</button>
        <button onClick={() => dispatch(incrementedByAmount(10))}>+10</button>
      </div>
    </div>
  );
}

export default ReduxCounter;
