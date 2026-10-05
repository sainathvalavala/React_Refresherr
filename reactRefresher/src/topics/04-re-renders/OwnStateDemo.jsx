import RenderStamp from "../../components/RenderStamp";
import SelfUpdatingChild from "./SelfUpdatingChild";

// This parent has no state, so clicking Like inside the child never
// re-renders the parent or the sibling below.
function OwnStateDemo() {
  return (
    <div className="stack">
      <SelfUpdatingChild />
      <RenderStamp label="Sibling (not affected)" />
    </div>
  );
}

export default OwnStateDemo;
