// Refs to your own components: in React 19, ref is a normal prop for
// function components. FancyInput takes it and attaches it to its inner
// <input>, so a parent can focus it.
// (Before React 19 you had to wrap the component in forwardRef() for this.)
function FancyInput({ label, ref }) {
  return (
    <label className="row">
      {label}
      <input ref={ref} placeholder={label} />
    </label>
  );
}

export default FancyInput;
