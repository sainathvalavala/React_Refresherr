import { useContext } from "react";
import { CartDispatchContext } from "./CartContexts";
import RenderStamp from "../../components/RenderStamp";

// Only reads dispatch, so this component never re-renders when the cart
// changes. Its render time stays frozen.
function FruitButtons() {
  const dispatch = useContext(CartDispatchContext);

  return (
    <div className="stack">
      <div className="row">
        {["Mango", "Banana", "Apple"].map((name) => (
          <button key={name} onClick={() => dispatch({ type: "added", name })}>
            Add {name}
          </button>
        ))}
      </div>
      <RenderStamp label="FruitButtons (dispatch only)" />
    </div>
  );
}

export default FruitButtons;
