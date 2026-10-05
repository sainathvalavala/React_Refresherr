import { useReducer } from "react";
import { CartDispatchContext, CartStateContext } from "./CartContexts";

function cartReducer(cart, action) {
  switch (action.type) {
    case "added": {
      const existing = cart.find((item) => item.name === action.name);
      if (existing) {
        return cart.map((item) => (item.name === action.name ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...cart, { name: action.name, qty: 1 }];
    }
    case "removed":
      return cart.filter((item) => item.name !== action.name);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// A "mini Redux" with no library: useReducer for the logic, context to
// share the state and dispatch with the whole tree below.
function ReducerCartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext value={cart}>
      <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>
    </CartStateContext>
  );
}

export default ReducerCartProvider;
