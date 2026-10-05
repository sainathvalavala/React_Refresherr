import { useState } from "react";
import RenderStamp from "../../components/RenderStamp";

// A state change re-renders the component that owns the state and the
// components inside it, but NOT its parent or siblings.
function SelfUpdatingChild() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="nested">
      <div className="row">
        <button onClick={() => setLikes(likes + 1)}>Like ({likes})</button>
      </div>
      <RenderStamp label="Inside the child with state" />
    </div>
  );
}

export default SelfUpdatingChild;
