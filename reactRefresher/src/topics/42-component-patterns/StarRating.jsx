import { useState } from "react";

// A component that can be controlled OR uncontrolled, just like <input>:
//   <StarRating defaultValue={3} />                     -> uncontrolled: keeps its own state
//   <StarRating value={x} onChange={setX} />            -> controlled: the parent owns the value
// If `value` is passed, the component obeys it; otherwise it uses internal state.
function StarRating({ value, defaultValue = 0, onChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;

  function select(stars) {
    if (!isControlled) setInternalValue(stars);
    onChange?.(stars); // tell the parent either way, if it's listening
  }

  return (
    <div className="row" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((stars) => (
        <button
          key={stars}
          role="radio"
          aria-checked={current === stars}
          aria-label={`${stars} stars`}
          onClick={() => select(stars)}
        >
          {stars <= current ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

export default StarRating;
