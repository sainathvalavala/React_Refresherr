import { useState } from "react";

// Why not use the array index as the key? Keys tell React WHICH item is
// which. If you delete the first todo, every index shifts down by one, so
// React matches the wrong items and typed text ends up in the wrong row.
// Try it: type in the inputs, then delete "Learn props". The index-keyed
// list mixes up the notes; the id-keyed list does not.
function TodoList({ useIndexAsKey }) {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn props" },
    { id: 2, text: "Learn state" },
    { id: 3, text: "Learn effects" },
  ]);

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={useIndexAsKey ? index : todo.id} className="row">
          <span>{todo.text}</span>
          <input placeholder="note" />
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
