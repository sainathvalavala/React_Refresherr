import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRemainingCount, selectTodos, todoAdded, todoRemoved, todoToggled } from "./todosSlice";

function ReduxTodos() {
  const todos = useSelector(selectTodos);
  const remaining = useSelector(selectRemainingCount);
  const dispatch = useDispatch();
  const [text, setText] = useState(""); // half-typed text stays local state

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    dispatch(todoAdded(text.trim())); // prepare() adds the id
    setText("");
  }

  return (
    <div className="stack">
      <form className="row" onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="row">
            <label className="row">
              <input type="checkbox" checked={todo.done} onChange={() => dispatch(todoToggled(todo.id))} />
              {todo.text}
            </label>
            <button onClick={() => dispatch(todoRemoved(todo.id))}>✕</button>
          </li>
        ))}
      </ul>
      <p>{remaining} left</p>
    </div>
  );
}

export default ReduxTodos;
