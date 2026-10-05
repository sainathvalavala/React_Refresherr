import { useState } from "react";

// State: data a component owns and can change over time. Unlike props
// (passed in by the parent, read-only), state lives inside the component.
// When state changes, React re-renders the component with the new value.
//
// useState(initialValue) returns an array of two things, which we destructure:
//   count    -> the current value
//   setCount -> a function to update it (never assign count = ... directly)
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Guest");
  const [isOnline, setIsOnline] = useState(false);

  // Updater function: when the new value depends on the old one, pass a
  // function. React gives it the latest value, so repeated calls stack correctly.
  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  // When the new value doesn't depend on the old one, pass it directly.
  function reset() {
    setCount(0);
  }

  return (
    <div className="counter">
      <p className="count">{count}</p>
      <div className="row">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>

      <hr />
      <p>Name: {name}</p>
      <div className="row">
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <hr />
      <p>Status: {isOnline ? "Online" : "Offline"}</p>
      <div className="row">
        <button onClick={() => setIsOnline(!isOnline)}>Toggle status</button>
      </div>
    </div>
  );
}

export default Counter;
