import { createContext } from "react";

// Reducer + context: two contexts, one for the state and one for dispatch.
// Components that only dispatch (buttons) read CartDispatchContext. dispatch
// never changes, so they don't re-render when the cart changes.
export const CartStateContext = createContext(null);
export const CartDispatchContext = createContext(null);
