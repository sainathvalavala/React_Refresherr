// The panel doesn't own "am I open?". The parent tells it (isActive) and
// it asks the parent to change (onShow). Compare with Collapsible in topic 8,
// which kept its own state, so several could be open at once.
function AccordionPanel({ title, isActive, onShow, children }) {
  return (
    <div className="card">
      <button onClick={onShow}>
        {isActive ? "▼" : "▶"} {title}
      </button>
      {isActive && <div>{children}</div>}
    </div>
  );
}

export default AccordionPanel;
