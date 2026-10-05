import { useFormStatus } from "react-dom";

// useFormStatus: reads the status of the PARENT <form>, so it must be
// used in a component rendered inside that form, not in the component that
// renders the <form> itself. Any button can know "is my form submitting?"
// without props.
function SubmitButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "⏳ Working..." : children}
    </button>
  );
}

export default SubmitButton;
