import { createSlice, nanoid } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [{ id: "t1", text: "Learn slices", done: false }],
  reducers: {
    // prepare: build the payload BEFORE the reducer runs. Reducers must be
    // pure, so random ids are generated here, not in the reducer.
    todoAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return { payload: { id: nanoid(), text, done: false } };
      },
    },
    todoToggled(state, action) {
      const todo = state.find((t) => t.id === action.payload);
      todo.done = !todo.done;
    },
    todoRemoved(state, action) {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { todoAdded, todoToggled, todoRemoved } = todosSlice.actions;
export default todosSlice.reducer;

// Selectors: functions that read from the whole store's state. Keeping
// them next to the slice means components don't depend on the state's shape.
export const selectTodos = (state) => state.todos;
export const selectRemainingCount = (state) => state.todos.filter((t) => !t.done).length;
