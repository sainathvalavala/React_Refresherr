import { useState } from "react";

// Errors in EVENT HANDLERS are not caught by error boundaries, because they
// happen outside rendering. Handle them yourself with try/catch, and put the
// message in state so the UI can show it.
function SafeSubmit() {
  const [error, setError] = useState(null);

  function handleClick() {
    try {
      setError(null);
      JSON.parse("{ this is not valid JSON"); // throws a SyntaxError
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="stack">
      <div className="row">
        <button onClick={handleClick}>Parse broken JSON</button>
      </div>
      {error && <p className="error-box">Handled in the click handler: {error}</p>}
    </div>
  );
}

export default SafeSubmit;
