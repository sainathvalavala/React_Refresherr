import { atom } from "jotai";

// The classic Recoil tutorial app (a todo list), written with Jotai atoms.

// Primitive atoms: the source data
export const todosAtom = atom([
  { id: 1, text: "Learn atoms", done: true },
  { id: 2, text: "Learn derived atoms", done: false },
  { id: 3, text: "Build something", done: false },
]);

export const filterAtom = atom("all"); // "all" | "active" | "done"

// Derived atoms (Recoil: selectors). Recalculated automatically when the
// atoms they get() change. Components using them never store copies.
export const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);
  if (filter === "active") return todos.filter((todo) => !todo.done);
  if (filter === "done") return todos.filter((todo) => todo.done);
  return todos;
});

export const statsAtom = atom((get) => {
  const todos = get(todosAtom);
  const done = todos.filter((todo) => todo.done).length;
  return { total: todos.length, done, left: todos.length - done };
});

// Write-only "action" atoms: the first argument is null (nothing to read),
// the second is a write function. They keep update logic next to the state,
// so components just call them: addTodo("text").
export const addTodoAtom = atom(null, (get, set, text) => {
  set(todosAtom, [...get(todosAtom), { id: Date.now(), text, done: false }]);
});

export const toggleTodoAtom = atom(null, (get, set, id) => {
  set(
    todosAtom,
    get(todosAtom).map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  );
});

export const removeTodoAtom = atom(null, (get, set, id) => {
  set(
    todosAtom,
    get(todosAtom).filter((todo) => todo.id !== id),
  );
});
