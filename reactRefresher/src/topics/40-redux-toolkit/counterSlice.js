import { createSlice } from "@reduxjs/toolkit";

// A SLICE = one feature's state + the reducers that change it.
// createSlice generates the action creators for you: counterSlice.actions.incremented()
// returns { type: "counter/incremented" }.
//
// "state.value += 1" looks like mutation, but Redux Toolkit uses the Immer
// library: you write mutating code on a draft, and Immer produces a new
// immutable state from it. (This only works inside createSlice/createReducer.)
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    incremented(state) {
      state.value += 1;
    },
    decremented(state) {
      state.value -= 1;
    },
    // action.payload is whatever you pass: incrementedByAmount(5)
    incrementedByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const { incremented, decremented, incrementedByAmount } = counterSlice.actions;
export default counterSlice.reducer;
