import useLocalStorage from "./useLocalStorage";

// Exactly like useState, but the note survives a page refresh.
function PersistentNote() {
  const [note, setNote] = useLocalStorage("react-refresher-note", "");

  return (
    <div className="stack">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="Type a note, then refresh the page"
      />
      <div className="row">
        <span>{note.length} characters saved</span>
        <button onClick={() => setNote("")}>Clear</button>
      </div>
    </div>
  );
}

export default PersistentNote;
