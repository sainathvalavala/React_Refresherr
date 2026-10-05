import { useId } from "react";

// useId(): a unique id string that is stable for this component instance.
// Hard-coding id="email" breaks as soon as the component is used twice on
// one page (duplicate ids confuse labels and screen readers). useId gives
// each instance its own id; derive several from it with suffixes.
function LabeledField({ label, hint }) {
  const id = useId();

  return (
    <div className="stack">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={`${id}-hint`} />
      <small id={`${id}-hint`}>
        {hint} <code>(id = {id})</code>
      </small>
    </div>
  );
}

export default LabeledField;
