import { useState } from "react";
import { useSetAtom } from "jotai";
import { addTodoAtom } from "./todoAtoms";

// Local state (the half-typed text) stays in useState: only this component
// cares about it. Only the finished todo goes into global state.
function TodoInput() {
  const [text, setText] = useState("");
  const addTodo = useSetAtom(addTodoAtom);

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    addTodo(text.trim());
    setText("");
  }

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo" />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoInput;
