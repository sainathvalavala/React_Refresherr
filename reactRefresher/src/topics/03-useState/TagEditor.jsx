import { useState } from "react";

// Array state: like objects, arrays must be replaced, not changed.
// push, pop, splice, sort and reverse modify the original array, so React
// doesn't see a change. Create a new array instead:
//   add    -> [...tags, newTag]
//   remove -> tags.filter(...)
//   update -> tags.map(...)
function TagEditor() {
  const [tags, setTags] = useState(["react", "hooks"]);
  const [input, setInput] = useState("");

  function addTag() {
    const newTag = input.trim();
    // Skip empty or duplicate tags (tags are used as keys, which must be unique)
    if (newTag === "" || tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) return;
    setTags([...tags, newTag]);
    setInput("");
  }

  function removeTag(tagToRemove) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  function shoutAll() {
    setTags(tags.map((tag) => tag.toUpperCase()));
  }

  return (
    <div className="stack">
      <div className="row">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="New tag" />
        <button onClick={addTag}>Add</button>
        <button onClick={shoutAll}>UPPERCASE all</button>
      </div>
      <div className="row">
        {tags.map((tag) => (
          <button key={tag} onClick={() => removeTag(tag)}>
            {tag} ✕
          </button>
        ))}
      </div>
    </div>
  );
}

export default TagEditor;
