import { Suspense, useState } from "react";
import DelayedText from "./DelayedText";

function delay(ms, text) {
  return new Promise((resolve) => setTimeout(() => resolve(text), ms));
}

function makePromises(loadNumber) {
  return {
    loadNumber,
    fast: delay(500, `Fast part (0.5s), load #${loadNumber}`),
    slow: delay(2500, `Slow part (2.5s), load #${loadNumber}`),
  };
}

// Where you put <Suspense> decides what waits for what.
//   One boundary around both -> nothing shows until the SLOWEST part is ready
//   One boundary each        -> each part appears as soon as it's ready
// The promises are created in an event handler and kept in state, so every
// render reads the same promise (a new promise each render would suspend forever).
function BoundariesDemo() {
  const [promises, setPromises] = useState(null);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setPromises(makePromises((promises?.loadNumber ?? 0) + 1))}>Load both</button>
      </div>
      {/* key: a new load mounts fresh boundaries, so the fallbacks show again */}
      {promises && (
        <div className="grid" key={promises.loadNumber}>
          <div className="stack">
            <strong>One shared boundary</strong>
            <Suspense fallback={<p className="skeleton">⏳ Waiting for everything...</p>}>
              <DelayedText promise={promises.fast} />
              <DelayedText promise={promises.slow} />
            </Suspense>
          </div>
          <div className="stack">
            <strong>A boundary each</strong>
            <Suspense fallback={<p className="skeleton">⏳ Fast part...</p>}>
              <DelayedText promise={promises.fast} />
            </Suspense>
            <Suspense fallback={<p className="skeleton">⏳ Slow part...</p>}>
              <DelayedText promise={promises.slow} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoundariesDemo;
