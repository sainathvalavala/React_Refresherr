// && (logical AND): renders the right side only if the left side is truthy.
// Gotcha: with a NUMBER on the left, 0 is falsy but React still prints it,
// so {count && <p>...</p>} shows a stray "0". Compare explicitly: count > 0.
function Notifications({ count }) {
  return (
    <div className="stack">
      {count > 0 && <p>You have {count} new messages.</p>}
      <p className="hint">
        Buggy version shows: [{count && <span>{count} new messages</span>}]
      </p>
    </div>
  );
}

export default Notifications;
