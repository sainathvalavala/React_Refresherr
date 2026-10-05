import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import LazyChartDemo from "./LazyChartDemo";
import BoundariesDemo from "./BoundariesDemo";
import lazyChartDemoCode from "./LazyChartDemo.jsx?raw";
import boundariesDemoCode from "./BoundariesDemo.jsx?raw";
import delayedTextCode from "./DelayedText.jsx?raw";

function LazyLesson() {
  return (
    <Lesson
      number={31}
      title="lazy and Suspense"
      definition="lazy() lets you load a component's code only when it's first rendered (code splitting). <Suspense> shows a fallback while that code, or data, is still loading."
    >
      <Explain title="How it works">
        <p>
          By default Vite bundles every imported file into one JavaScript file,
          and the browser must download all of it before anything appears. As the
          app grows, the first load gets slower, even for pages the user never
          visits.
        </p>
        <p>
          <strong>Code splitting</strong> cuts the bundle into chunks. A dynamic{" "}
          <code>import("./File")</code> tells Vite "put this file in a separate
          chunk and fetch it when asked". <code>lazy()</code> turns that into a
          component, and <code>{"<Suspense fallback>"}</code> decides what to show
          while it downloads.
        </p>
        <CodeBlock
          code={`
import { lazy, Suspense } from "react";

const Settings = lazy(() => import("./Settings")); // top level, default export

<Suspense fallback={<Spinner />}>
  <Settings />            {/* first render: downloads Settings.js, shows Spinner */}
</Suspense>
`}
        />
        <p>
          <strong>This app does it for real:</strong>{" "}
          <code>src/topics/index.js</code> loads each of the 47 lessons with{" "}
          <code>lazy()</code>, and <code>App.jsx</code> wraps the lesson in{" "}
          <code>Suspense</code>. Open DevTools &gt; Network, switch to a lesson
          you haven't opened yet, and watch its chunk download.
        </p>
        <p>
          <strong>Suspense isn't only for code.</strong> Anything that
          "suspends" triggers the nearest boundary: <code>use(promise)</code>{" "}
          (topic 34), Jotai async atoms (topic 24), and TanStack Query's{" "}
          <code>useSuspenseQuery</code>.
        </p>
      </Explain>

      <Example title="1. Lazy-loading a heavy component" code={lazyChartDemoCode}>
        <LazyChartDemo />
      </Example>

      <Example title="2. Where to put Suspense boundaries" code={boundariesDemoCode}>
        <BoundariesDemo />
        <details>
          <summary>Show DelayedText.jsx</summary>
          <CodeBlock code={delayedTextCode} />
        </details>
      </Example>

      <Example title="3. Splitting by route (the most common place)">
        <CodeBlock
          code={`
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

<Suspense fallback={<PageSpinner />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
// Each page becomes its own chunk, downloaded on first visit.
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Calling <code>lazy()</code> inside a component. A new lazy component
            every render means the state resets and the code is re-requested.
            Always at module level.
          </li>
          <li>
            A lazy file without a <code>default</code> export. lazy() expects{" "}
            <code>export default</code>; for named exports use{" "}
            <code>{"import(...).then(m => ({ default: m.Named }))"}</code>.
          </li>
          <li>
            Rendering a lazy component with no <code>{"<Suspense>"}</code> above
            it. React has nowhere to show the loading state.
          </li>
          <li>
            Splitting tiny components. Each chunk is an extra request; split big
            pages and heavy libraries, not buttons.
          </li>
          <li>
            Creating the promise passed to <code>use()</code> during render. It is
            a new promise every time, so the component never finishes loading.
            Create it in an event handler, a loader, or cache it.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default LazyLesson;
