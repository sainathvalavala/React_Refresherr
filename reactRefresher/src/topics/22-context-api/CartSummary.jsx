import useCart from "./useCart";

// A sibling of ProductShelf, with no props between them. Both read the
// same cart from context, so they stay in sync.
function CartSummary() {
  const { items, totalCount, totalPrice, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="stack">
      <ul>
        {items.map((item) => (
          <li key={item.id} className="row">
            {item.name} x {item.quantity}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>
        <strong>
          {totalCount} items, total Rs. {totalPrice}
        </strong>
      </p>
      <div className="row">
        <button onClick={clearCart}>Clear cart</button>
      </div>
    </div>
  );
}

export default CartSummary;
