import { useState } from "react";
import Modal from "./Modal";

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Arun");

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setIsOpen(true)}>Open modal</button>
        <span>Name: {name}</span>
      </div>
      {isOpen && (
        <Modal title="Edit your name" onClose={() => setIsOpen(false)}>
          {/* Lives in document.body, yet it reads and sets this component's state */}
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <p className="hint">Press Escape, click outside, or use Close.</p>
        </Modal>
      )}
    </div>
  );
}

export default ModalDemo;
