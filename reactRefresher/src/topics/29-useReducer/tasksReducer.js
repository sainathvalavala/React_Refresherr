// The reducer lives in its own file: it's plain JavaScript with no React,
// so it's easy to read, reuse and unit-test (call it with a state and an
// action, and check what it returns).
export const initialTasks = [
  { id: 1, text: "Read about reducers", done: true },
  { id: 2, text: "Write a reducer", done: false },
];

export function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added":
      return [...tasks, { id: action.id, text: action.text, done: false }];
    case "toggled":
      return tasks.map((task) => (task.id === action.id ? { ...task, done: !task.done } : task));
    case "edited":
      return tasks.map((task) => (task.id === action.id ? { ...task, text: action.text } : task));
    case "deleted":
      return tasks.filter((task) => task.id !== action.id);
    case "clearedDone":
      return tasks.filter((task) => !task.done);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
