import { useId, useState } from "react";
import { login as realLogin } from "./loginApi";

// Written to be TESTABLE:
//   - real <label>s, so tests can find inputs with getByLabelText("Email")
//   - role="alert" on errors, so tests (and screen readers) can find them
//   - `login` is a prop with a default: tests can pass a fake (dependency
//     injection) OR keep the real one and mock the network with MSW
function LoginForm({ login = realLogin }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({ status: "idle" });

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ status: "submitting" });
    try {
      const user = await login(email, password);
      setState({ status: "success", name: user.name });
    } catch (err) {
      setState({ status: "error", message: err.message });
    }
  }

  if (state.status === "success") {
    return <p className="card">Welcome, {state.name}!</p>;
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <label htmlFor={`${id}-email`}>Email</label>
      <input id={`${id}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor={`${id}-password`}>Password</label>
      <input
        id={`${id}-password`}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {state.status === "error" && (
        <p role="alert" className="field-error">
          {state.message}
        </p>
      )}
      <div className="row">
        <button type="submit" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
