import { memo } from "react";
import SlowItem from "./SlowItem";

// memo() matters here: with useDeferredValue, the parent re-renders twice
// (urgent + deferred). memo lets the urgent render skip this slow list,
// because its text prop hasn't changed yet.
function SlowList({ text }) {
  const items = Array.from({ length: 250 }, (_, i) => `${text || "Item"} result #${i + 1}`);

  return (
    <ul className="scroll-box">
      {items.map((item) => (
        <SlowItem key={item} text={item} />
      ))}
    </ul>
  );
}

export default memo(SlowList);
