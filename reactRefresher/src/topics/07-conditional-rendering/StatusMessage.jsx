// Lookup object: when each value of a variable maps to its own UI, an object
// keyed by that value replaces a long if/else or switch. An unknown status
// falls back with ??.
const messages = {
  idle: <p>Press a button to start.</p>,
  loading: <p>⏳ Loading...</p>,
  success: <p>✅ Saved successfully!</p>,
  error: <p>❌ Something went wrong.</p>,
};

function StatusMessage({ status }) {
  return messages[status] ?? <p>Unknown status</p>;
}

export default StatusMessage;
