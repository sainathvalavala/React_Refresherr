import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ProfilerDemo from "./ProfilerDemo";
import profilerDemoCode from "./ProfilerDemo.jsx?raw";
import profilerLogCode from "./profilerLog.js?raw";

function PerformanceLesson() {
  return (
    <Lesson
      number={45}
      title="Performance profiling"
      definition="Profiling means measuring which components render, how often, and how long they take, so you fix the real bottleneck instead of guessing. React DevTools' Profiler and the <Profiler> API do the measuring."
    >
      <Explain title="How it works">
        <p>
          <strong>Rule one: measure before optimizing.</strong> Most re-renders
          are cheap (topic 4). Slowness usually comes from a few specific places,
          and profiling shows you which.
        </p>
        <ol>
          <li>
            <strong>React DevTools &gt; Profiler tab</strong>: press record, use
            the slow feature, stop. The <em>flamegraph</em> shows every component
            that rendered and how long it took; <em>Ranked</em> sorts them by cost.
            In the settings, enable "Record why each component rendered".
          </li>
          <li>
            <strong>Components tab &gt; "Highlight updates when components
            render"</strong>: flashes everything that re-renders, which makes
            unnecessary renders easy to spot.
          </li>
          <li>
            <strong>
              <code>{"<Profiler>"}</code> API
            </strong>{" "}
            (example 1): measure a subtree in code, e.g. to log slow renders.
          </li>
          <li>
            <strong>Lighthouse / Web Vitals</strong>: whole-page user experience,
            including LCP (load), INP (responsiveness) and CLS (layout shift).
          </li>
        </ol>
        <p>
          Measure the <strong>production build</strong> (<code>npm run build</code>{" "}
          + <code>npm run preview</code>) for real numbers. Development mode adds
          checks and StrictMode double renders, so it is slower.
        </p>
      </Explain>

      <Example title="1. Measuring renders with <Profiler>" code={profilerDemoCode}>
        <ProfilerDemo />
        <details>
          <summary>Show profilerLog.js (why it isn't useState)</summary>
          <CodeBlock code={profilerLogCode} />
        </details>
      </Example>

      <Example title="2. Once you've found the slow part: the toolbox">
        <table>
          <thead>
            <tr>
              <th>Symptom</th>
              <th>Fix</th>
              <th>Topic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Typing re-renders a big unrelated area</td>
              <td>move state down, or pass the area as children</td>
              <td>20</td>
            </tr>
            <tr>
              <td>A child re-renders with identical props</td>
              <td>memo() + stable props (useMemo/useCallback)</td>
              <td>4, 30</td>
            </tr>
            <tr>
              <td>An expensive calculation runs every render</td>
              <td>useMemo</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Input lags while results render</td>
              <td>useDeferredValue / useTransition</td>
              <td>33</td>
            </tr>
            <tr>
              <td>Every context consumer re-renders</td>
              <td>split contexts, or use a selector-based store</td>
              <td>22, 39</td>
            </tr>
            <tr>
              <td>Big first load</td>
              <td>lazy() + code splitting</td>
              <td>31</td>
            </tr>
            <tr>
              <td>Rendering thousands of rows</td>
              <td>virtualization: only render the visible rows</td>
              <td>below</td>
            </tr>
            <tr>
              <td>All of the above, automatically</td>
              <td>React Compiler (auto-memoization)</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
      </Example>

      <Example title="3. Virtualizing long lists">
        <CodeBlock
          code={`
// 10,000 <li>s is slow to render and scroll. A virtualized list renders only
// the ~20 rows in view and swaps them as you scroll.
npm install @tanstack/react-virtual

const parentRef = useRef(null);
const virtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 36,          // row height in px
});

<div ref={parentRef} style={{ height: 400, overflow: "auto" }}>
  <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
    {virtualizer.getVirtualItems().map((item) => (
      <div key={item.key}
           style={{ position: "absolute", top: 0, transform: \`translateY(\${item.start}px)\` }}>
        {rows[item.index].name}
      </div>
    ))}
  </div>
</div>
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Optimizing without measuring: adding memo/useCallback everywhere makes
            code harder to read and often isn't any faster.
          </li>
          <li>
            Judging speed in development mode, which is much slower than production.
          </li>
          <li>
            Leaving <code>{"<Profiler>"}</code> in the app and expecting numbers in
            production. It's disabled in normal production builds.
          </li>
          <li>
            Fixing render time when the real problem is the network (slow API,
            request waterfalls). Check the Network tab too.
          </li>
          <li>
            Giant images and bundles. Often the biggest win is a smaller download,
            not fewer renders.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default PerformanceLesson;
