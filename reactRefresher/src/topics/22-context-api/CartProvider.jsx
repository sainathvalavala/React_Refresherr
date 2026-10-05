import { useState } from "react";
import { CartContext } from "./CartContext";

// The "provider component" pattern: one component owns the state and the
// functions that change it, and provides them all through context.
// The rest of the app just wraps itself in <CartProvider> and calls useCart().
function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  // Derived values are calculated here once, so consumers don't repeat the maths
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext value={{ items, totalCount, totalPrice, addItem, removeItem, clearCart }}>
      {children}
    </CartContext>
  );
}

export default CartProvider;
