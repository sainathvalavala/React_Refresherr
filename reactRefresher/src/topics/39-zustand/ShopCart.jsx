import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "./useCartStore";

// Selecting SEVERAL values at once returns a new object every time, which
// Zustand would treat as "changed" on every check. useShallow compares the
// object's fields one by one instead, so the component only re-renders when
// one of them really changes.
function ShopCart() {
  const { items, removeItem, clear } = useCartStore(
    useShallow((state) => ({ items: state.items, removeItem: state.removeItem, clear: state.clear })),
  );

  // Derived values: computed from the selected state during render
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0) return <p>Cart is empty. It's saved in localStorage, so refresh to test.</p>;

  return (
    <div className="stack">
      <ul>
        {items.map((item) => (
          <li key={item.name} className="row">
            {item.name} x {item.qty}
            <button onClick={() => removeItem(item.name)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="row">
        <strong>Total: Rs. {total}</strong>
        <button onClick={clear}>Clear</button>
      </div>
    </div>
  );
}

export default ShopCart;
