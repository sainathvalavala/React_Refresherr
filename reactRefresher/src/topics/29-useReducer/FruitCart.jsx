import { useContext } from "react";
import { CartDispatchContext, CartStateContext } from "./CartContexts";
import RenderStamp from "../../components/RenderStamp";

// Reads the state, so it re-renders on every cart change.
function FruitCart() {
  const cart = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);

  return (
    <div className="stack">
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.name} className="row">
              {item.name} x {item.qty}
              <button onClick={() => dispatch({ type: "removed", name: item.name })}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <RenderStamp label="FruitCart (reads state)" />
    </div>
  );
}

export default FruitCart;
