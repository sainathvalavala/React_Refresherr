import { useState } from "react";
import RenderStamp from "../../components/RenderStamp";
import MemoRenderStamp from "./MemoRenderStamp";

// When a parent re-renders, React re-renders ALL of its children by default,
// even if their props didn't change. memo() lets a child skip that, but only
// if every prop is the same as last time (compared with ===).
//   1. normal child                    -> re-renders every click
//   2. memo, same string prop          -> skipped
//   3. memo, prop that changes         -> re-renders (the prop is different)
//   4. memo, new {} object each render -> re-renders! {} === {} is false
function ParentChildDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="stack">
      <p>Parent count: {count}</p>
      <div className="row">
        <button onClick={() => setCount(count + 1)}>Re-render parent</button>
      </div>
      <RenderStamp label="1. Normal child" />
      <MemoRenderStamp label="2. memo child, same props" />
      <MemoRenderStamp label={`3. memo child, changing prop (${count})`} />
      <MemoRenderStamp label="4. memo child, new object prop" options={{ color: "red" }} />
    </div>
  );
}

export default ParentChildDemo;
