import { useAtomValue, useSetAtom } from "jotai";
import { filteredTodosAtom, removeTodoAtom, toggleTodoAtom } from "./todoAtoms";

// Reads the DERIVED list, so it automatically reflects both the todos and
// the filter, without knowing how filtering works.
function TodoItems() {
  const todos = useAtomValue(filteredTodosAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  const removeTodo = useSetAtom(removeTodoAtom);

  if (todos.length === 0) {
    return <p>Nothing here.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="row">
          <label className="row">
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</span>
          </label>
          <button onClick={() => removeTodo(todo.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoItems;
