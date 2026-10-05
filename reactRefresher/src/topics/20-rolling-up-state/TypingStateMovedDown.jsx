import RenderStamp from "../../components/RenderStamp";
import NameInput from "./NameInput";

// The fix: this parent has no state any more, so typing in NameInput never
// re-renders it, and the sidebar stays untouched. No memo() needed.
function TypingStateMovedDown() {
  return (
    <div className="stack">
      <NameInput />
      <RenderStamp label="Unrelated sidebar" />
    </div>
  );
}

export default TypingStateMovedDown;
