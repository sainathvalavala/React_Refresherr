import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// createAsyncThunk: an action for async work. Dispatching fetchUser(3)
// automatically dispatches three actions in turn:
//   user/fetch/pending -> user/fetch/fulfilled (with the data) or user/fetch/rejected
export const fetchUser = createAsyncThunk("user/fetch", async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: { status: "idle", data: null, error: null },
  reducers: {},
  // extraReducers: respond to actions defined OUTSIDE this slice (the thunk's)
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
