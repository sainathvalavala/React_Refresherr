import { useState } from "react";

// Owns a draft message. Nothing here resets the draft when contact changes.
// That's exactly the bug in example 2 when no key is used.
function ChatBox({ contact }) {
  const [draft, setDraft] = useState("");

  return (
    <div className="stack">
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={2}
        placeholder={`Message ${contact.name}`}
      />
      <div className="row">
        <button onClick={() => alert(`Sent "${draft}" to ${contact.name}`)}>Send to {contact.name}</button>
      </div>
    </div>
  );
}

export default ChatBox;
