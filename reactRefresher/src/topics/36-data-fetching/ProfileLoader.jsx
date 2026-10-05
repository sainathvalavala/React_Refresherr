import { useState } from "react";
import { loadProfile } from "./fakeApi";

// One "status" value instead of separate isLoading / isError / data flags.
// Separate booleans allow impossible combinations (isLoading AND isError
// both true). A single status can only be one thing at a time:
//   "idle" -> "loading" -> "success" | "error"
// Here the request starts from a click (an event handler), which is often
// simpler than an effect: no dependency array and no cleanup timing.
function ProfileLoader() {
  const [state, setState] = useState({ status: "idle" });
  const [shouldFail, setShouldFail] = useState(false);

  async function handleLoad() {
    setState({ status: "loading" });
    try {
      const profile = await loadProfile({ shouldFail });
      setState({ status: "success", profile });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  }

  return (
    <div className="stack">
      <div className="row">
        <button onClick={handleLoad} disabled={state.status === "loading"}>
          Load profile
        </button>
        <label className="row">
          <input type="checkbox" checked={shouldFail} onChange={(e) => setShouldFail(e.target.checked)} />
          Make the server fail
        </label>
      </div>
      {state.status === "idle" && <p>Nothing loaded yet.</p>}
      {state.status === "loading" && <p className="skeleton">⏳ Loading profile...</p>}
      {state.status === "error" && (
        <div className="error-box">
          <p>Couldn't load the profile: {state.error}</p>
          <button onClick={handleLoad}>Retry</button>
        </div>
      )}
      {state.status === "success" && (
        <p className="card">
          {state.profile.name}: {state.profile.plan} plan, member since {state.profile.joined}
        </p>
      )}
    </div>
  );
}

export default ProfileLoader;
