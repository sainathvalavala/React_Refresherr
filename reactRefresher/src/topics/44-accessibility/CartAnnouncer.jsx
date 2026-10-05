import { useState } from "react";

// Live regions: when content changes WITHOUT the user moving focus there
// (a toast, "Saved!", a cart count), screen-reader users don't notice.
// role="status" (same as aria-live="polite") makes the screen reader read
// out any change to this element when it's next idle.
// The region must already be on the page; only its text changes.
function CartAnnouncer() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  function addToCart() {
    const next = count + 1;
    setCount(next);
    setMessage(`Added to cart. ${next} ${next === 1 ? "item" : "items"} in your cart.`);
  }

  return (
    <div className="stack">
      <div className="row">
        <button onClick={addToCart}>Add notebook to cart</button>
        <span aria-hidden="true">🛒 {count}</span>
      </div>
      <p role="status" className="card">
        {message || "(status region: screen readers announce changes here)"}
      </p>
    </div>
  );
}

export default CartAnnouncer;
