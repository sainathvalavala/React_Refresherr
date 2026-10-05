import { createContext } from "react";

// Default value null: it means "no CartProvider above". useCart checks for
// it and throws a helpful error instead of failing somewhere obscure.
export const CartContext = createContext(null);
