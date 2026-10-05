import { useContext } from "react";
import { CartContext } from "./CartContext";

// A custom hook (topic 19) wrapping useContext. Components write useCart()
// instead of importing both useContext and CartContext, and get a clear
// error if they forgot the provider.
export default function useCart() {
  const cart = useContext(CartContext);
  if (cart === null) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return cart;
}
