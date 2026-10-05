import { memo } from "react";
import RenderStamp from "../../components/RenderStamp";

// A memo() child (topic 4): it skips re-rendering only if ALL its props
// are the same as last time, compared with ===.
function MemoButton({ label, onClick }) {
  return (
    <div className="stack">
      <div className="row">
        <button onClick={onClick}>{label}</button>
      </div>
      <RenderStamp label={label} />
    </div>
  );
}

export default memo(MemoButton);
