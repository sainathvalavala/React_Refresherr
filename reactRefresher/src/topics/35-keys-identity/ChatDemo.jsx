import { useState } from "react";
import ChatBox from "./ChatBox";

const contacts = [
  { id: 1, name: "Arun" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Kiran" },
];

// Resetting state with a key: <ChatBox key={contact.id} /> tells React
// "a different contact is a different ChatBox". Changing the key unmounts
// the old one and mounts a fresh one, so the draft starts empty.
// Without the key it's the same ChatBox at the same position, so the draft
// you typed for Arun is still there when you switch to Priya!
function ChatDemo() {
  const [selected, setSelected] = useState(contacts[0]);
  const [useKey, setUseKey] = useState(false);

  return (
    <div className="stack">
      <label className="row">
        <input type="checkbox" checked={useKey} onChange={(e) => setUseKey(e.target.checked)} />
        Use key={"{contact.id}"}
      </label>
      <div className="row">
        {contacts.map((contact) => (
          <button key={contact.id} onClick={() => setSelected(contact)} disabled={contact.id === selected.id}>
            {contact.name}
          </button>
        ))}
      </div>
      {useKey ? <ChatBox key={selected.id} contact={selected} /> : <ChatBox contact={selected} />}
    </div>
  );
}

export default ChatDemo;
