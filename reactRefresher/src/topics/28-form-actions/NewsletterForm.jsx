import { useActionState } from "react";
import { saveEmail } from "./fakeServer";
import SubmitButton from "./SubmitButton";

// The action: receives the PREVIOUS state and the submitted FormData, and
// returns the NEXT state. It can be async; React waits for it.
async function subscribe(previousState, formData) {
  const email = formData.get("email");
  if (!email.includes("@")) {
    // Return the typed value so the input can be refilled after React resets the form
    return { status: "error", message: "Please enter a valid email.", email };
  }
  await saveEmail(email);
  return { status: "success", message: `Subscribed ${email}!`, email: "" };
}

// useActionState(action, initialState) returns:
//   state      -> whatever the action last returned
//   formAction -> pass to <form action={...}>
//   isPending  -> true while the action is running
// No onSubmit, no preventDefault, no loading state of our own. React
// handles it, and resets the (uncontrolled) form when the action finishes.
function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribe, {
    status: "idle",
    message: "",
    email: "",
  });

  return (
    <form action={formAction} className="stack">
      <div className="row">
        <input name="email" placeholder="you@example.com" defaultValue={state.email} />
        <SubmitButton>Subscribe</SubmitButton>
      </div>
      {isPending && <p>Saving to the server...</p>}
      {!isPending && state.status === "error" && <p className="field-error">{state.message}</p>}
      {!isPending && state.status === "success" && <p>✅ {state.message}</p>}
    </form>
  );
}

export default NewsletterForm;
