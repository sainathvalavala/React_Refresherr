import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import todosReducer from "./todosSlice";
import userReducer from "./userSlice";

// configureStore combines the slice reducers into one store:
//   state = { counter: {...}, todos: [...], user: {...} }
// It also sets up thunks (async actions) and the Redux DevTools browser
// extension automatically.
// A function, so each lesson mount (and each test) gets a fresh store.
export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      todos: todosReducer,
      user: userReducer,
    },
  });
}
