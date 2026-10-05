import useCounter from "./useCounter";

function HookCounter({ label, step }) {
  const { count, increment, decrement, reset } = useCounter(0, step);

  return (
    <div className="stack">
      <p>
        {label}: {count}
      </p>
      <div className="row">
        <button onClick={decrement}>-{step}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+{step}</button>
      </div>
    </div>
  );
}

export default HookCounter;
