import { useState } from "react";
import PropTypes from "prop-types";
import UserProfile from "./UserProfile";
import ErrorBoundary from "../13-error-boundary/ErrorBoundary";

const cases = [
  {
    label: "Valid props",
    props: { name: "Arun", age: 25, role: "admin", tags: ["react", "js"], address: { city: "Hyderabad" }, rating: 4 },
  },
  { label: "Missing required name", props: { age: 25 } },
  { label: "Wrong types", props: { name: 42, age: "25", tags: "react" } },
  { label: "Bad enum and shape", props: { name: "Priya", role: "owner", address: { pin: 500001 } } },
  { label: "Custom validator fails", props: { name: "Kiran", rating: 9 } },
];

// React 19 no longer runs propTypes, so here we call the checker ourselves.
// checkPropTypes reports problems with console.error, so we temporarily
// capture console.error to show the messages on screen.
// (prop-types skips all checks in production builds.)
function runPropTypeChecks(props) {
  const messages = [];
  const originalError = console.error;
  console.error = (message) => messages.push(String(message));
  try {
    PropTypes.resetWarningCache(); // otherwise each message is only reported once
    PropTypes.checkPropTypes(UserProfile.propTypes, props, "prop", "UserProfile");
  } finally {
    console.error = originalError;
  }
  return messages;
}

function PropTypesPlayground() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [messages, setMessages] = useState(() => runPropTypeChecks(cases[0].props));
  const current = cases[caseIndex];

  function selectCase(index) {
    setCaseIndex(index);
    setMessages(runPropTypeChecks(cases[index].props));
  }

  return (
    <div className="stack">
      <div className="row">
        {cases.map((c, index) => (
          <button key={c.label} onClick={() => selectCase(index)} disabled={index === caseIndex}>
            {c.label}
          </button>
        ))}
      </div>
      <code>{`<UserProfile ${JSON.stringify(current.props)} />`}</code>
      <div className="grid">
        <div className="stack">
          <strong>PropTypes warnings</strong>
          {messages.length === 0 ? (
            <p>✅ No warnings</p>
          ) : (
            <ul className="log">
              {messages.map((message) => (
                <li key={message}>{message.replace("Warning: ", "")}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="stack">
          <strong>What still renders</strong>
          {/* Wrong props can still crash; the boundary from topic 13 catches it.
              key resets the boundary when you pick another case. */}
          <ErrorBoundary key={caseIndex}>
            <UserProfile {...current.props} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default PropTypesPlayground;
