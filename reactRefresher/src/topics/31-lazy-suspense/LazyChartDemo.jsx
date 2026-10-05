import { lazy, Suspense, useState } from "react";

// lazy() takes a function that returns a dynamic import(). The file is
// downloaded the first time <HeavyChart /> renders, not when the app starts.
// The fake 1.5s delay makes the loading visible; normally it's a network request.
// lazy() must be called at the top level of a module, never inside a component.
const HeavyChart = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 1500)).then(() => import("./HeavyChart")),
);

function LazyChartDemo() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setShowChart(!showChart)}>{showChart ? "Hide chart" : "Show chart"}</button>
      </div>
      {showChart && (
        // While the chart's code downloads, Suspense shows the fallback
        <Suspense fallback={<p className="skeleton">⏳ Loading chart code...</p>}>
          <HeavyChart />
        </Suspense>
      )}
      <p className="hint">
        Only the first "Show" waits. After that the code is cached, so hide and
        show it again: it's instant. Reload the page to see the loading again.
      </p>
    </div>
  );
}

export default LazyChartDemo;
