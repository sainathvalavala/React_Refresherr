import { useMemo, useState } from "react";
import { products, slowFilter } from "./products";

// useMemo(calculate, deps): React runs calculate on the first render, then
// REUSES the stored result until a dependency changes.
// Here, toggling the theme re-renders the component but doesn't change
// query, so with useMemo the slow filter is skipped. Without it, the filter
// runs again on every click, and the toggle feels laggy.
function SlowFilterList() {
  const [query, setQuery] = useState("7");
  const [isDark, setIsDark] = useState(false);
  const [useMemoOn, setUseMemoOn] = useState(true);

  const memoizedResult = useMemo(() => slowFilter(products, query), [query]);
  const visible = useMemoOn ? memoizedResult : slowFilter(products, query);

  return (
    <div
      className="stack"
      style={{ padding: 12, borderRadius: 8, background: isDark ? "#222" : "transparent", color: isDark ? "#eee" : "inherit" }}
    >
      <div className="row">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter products" />
        <button onClick={() => setIsDark(!isDark)}>Toggle theme (unrelated state)</button>
      </div>
      <label className="row">
        <input type="checkbox" checked={useMemoOn} onChange={(e) => setUseMemoOn(e.target.checked)} />
        Use useMemo
      </label>
      <p>
        {visible.length} matching products. First few:{" "}
        {visible
          .slice(0, 5)
          .map((p) => p.name)
          .join(", ")}
      </p>
    </div>
  );
}

export default SlowFilterList;
