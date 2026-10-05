import { create } from "zustand";

// create() makes a store AND returns a hook for it in one step.
// The function receives `set` and returns the initial state, with the
// actions (functions that change it) living right next to the data.
// set() MERGES the object you give it into the state (like class setState).
export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// The store also works OUTSIDE React: getState() reads it, and actions are
// plain functions. Handy in API helpers, timers or event listeners.
export function addTenLater() {
  setTimeout(() => {
    const { count } = useCounterStore.getState();
    useCounterStore.setState({ count: count + 10 });
  }, 1000);
}
