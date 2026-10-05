import { create } from "zustand";
import { persist } from "zustand/middleware";

// Middleware wraps the store to add behavior. persist() saves the state to
// localStorage under `name` and restores it on page load, so the cart
// survives a refresh. `get` reads the current state inside actions.
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (name, price) => {
        const existing = get().items.find((item) => item.name === name);
        set({
          items: existing
            ? get().items.map((item) => (item.name === name ? { ...item, qty: item.qty + 1 } : item))
            : [...get().items, { name, price, qty: 1 }],
        });
      },
      removeItem: (name) => set({ items: get().items.filter((item) => item.name !== name) }),
      clear: () => set({ items: [] }),
    }),
    { name: "react-refresher-zustand-cart" },
  ),
);
