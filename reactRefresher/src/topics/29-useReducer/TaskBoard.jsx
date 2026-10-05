import { useReducer, useState } from "react";
import { initialTasks, tasksReducer } from "./tasksReducer";

// With useState, the add/toggle/edit/delete logic would be spread across
// five event handlers. With a reducer, the handlers only describe what
// happened (dispatch an action), and every state change is in one place.
function TaskBoard() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [text, setText] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    dispatch({ type: "added", id: Date.now(), text: text.trim() });
    setText("");
  }

  return (
    <div className="stack">
      <form className="row" onSubmit={handleAdd}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task" />
        <button type="submit">Add</button>
        <button type="button" onClick={() => dispatch({ type: "clearedDone" })}>
          Clear done
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="row">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => dispatch({ type: "toggled", id: task.id })}
            />
            <input
              value={task.text}
              onChange={(e) => dispatch({ type: "edited", id: task.id, text: e.target.value })}
            />
            <button onClick={() => dispatch({ type: "deleted", id: task.id })}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskBoard;
