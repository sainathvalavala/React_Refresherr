import { useReducer } from "react";

// A reducer is a PURE function: (currentState, action) => nextState.
// An action is a plain object describing WHAT happened, e.g.
// { type: "incremented" } or { type: "set", value: 10 }.
// The reducer decides HOW the state changes. It never mutates; it returns new state.
function counterReducer(state, action) {
  switch (action.type) {
    // ...state keeps the other fields (step); without it they'd be lost
    case "incremented":
      return { ...state, count: state.count + state.step };
    case "decremented":
      return { ...state, count: state.count - state.step };
    case "stepChanged":
      return { ...state, step: action.step };
    case "reset":
      return { count: 0, step: 1 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// useReducer(reducer, initialState) returns [state, dispatch].
// dispatch(action) sends an action to the reducer; React re-renders with
// whatever it returns.
function CounterReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

  return (
    <div className="stack">
      <p className="big">{state.count}</p>
      <div className="row">
        <button onClick={() => dispatch({ type: "decremented" })}>-{state.step}</button>
        <button onClick={() => dispatch({ type: "incremented" })}>+{state.step}</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <label className="row">
          Step
          <select value={state.step} onChange={(e) => dispatch({ type: "stepChanged", step: Number(e.target.value) })}>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default CounterReducer;
