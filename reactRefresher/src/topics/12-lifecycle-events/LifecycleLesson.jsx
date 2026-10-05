import { useState } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import LifecycleClass from "./LifecycleClass";
import LifecycleFunction from "./LifecycleFunction";
import LifecycleLogDemo from "./LifecycleLogDemo";
import lifecycleClassCode from "./LifecycleClass.jsx?raw";
import lifecycleFunctionCode from "./LifecycleFunction.jsx?raw";
import loggedParentCode from "./LoggedParent.jsx?raw";
import loggedChildCode from "./LoggedChild.jsx?raw";

function LifecycleLesson() {
  const [isMounted, setIsMounted] = useState(true);
  const [count, setCount] = useState(0);

  return (
    <Lesson
      number={12}
      title="Lifecycle events"
      definition="Every component goes through three phases: mounting (added to the page), updating (re-rendered with new props or state) and unmounting (removed). Lifecycle events let you run code in each phase."
    >
      <Explain title="How it works">
        <ol>
          <li>
            <strong>Mounting</strong>: the component appears for the first time.
            Its state is created, it renders, React inserts its DOM nodes, then
            "did mount" code runs. Use this to start fetching, timers and subscriptions.
          </li>
          <li>
            <strong>Updating</strong>: state, props or context changed. It
            re-renders, React patches the DOM, then "did update" code runs.
            Use this to react to a changed value (refetch when an id changes).
          </li>
          <li>
            <strong>Unmounting</strong>: the component is removed (a condition
            turned false, a route changed, a list item was deleted). Its
            "cleanup" code runs and its state is thrown away. Use this to stop
            whatever mounting started.
          </li>
        </ol>
        <p>
          Classes have one method per phase. Function components express all
          three with <code>useEffect</code>: the effect body is mount/update,
          the dependency array says <em>which</em> updates, and the returned
          function is the cleanup.
        </p>
      </Explain>

      <Example title="1. Lifecycle log on screen (parent + child)">
        <LifecycleLogDemo />
        <p className="hint">
          The first entries appear twice in development: StrictMode mounts,
          unmounts and mounts again to test your cleanup. Notice the child
          mounts before the parent.
        </p>
        <details>
          <summary>Show LoggedParent.jsx</summary>
          <CodeBlock code={loggedParentCode} />
        </details>
        <details>
          <summary>Show LoggedChild.jsx</summary>
          <CodeBlock code={loggedChildCode} />
        </details>
      </Example>

      <Example title="2. Class methods vs useEffect (watch the console)">
        <div className="row">
          <button onClick={() => setIsMounted(!isMounted)}>
            {isMounted ? "Unmount both" : "Mount both"}
          </button>
          <button onClick={() => setCount(count + 1)} disabled={!isMounted}>
            Update (count + 1)
          </button>
        </div>
        {isMounted && (
          <>
            <LifecycleClass count={count} />
            <LifecycleFunction count={count} />
          </>
        )}
        <details>
          <summary>Show LifecycleClass.jsx</summary>
          <CodeBlock code={lifecycleClassCode} />
        </details>
        <details>
          <summary>Show LifecycleFunction.jsx</summary>
          <CodeBlock code={lifecycleFunctionCode} />
        </details>
      </Example>

      <Example title="3. Every class lifecycle method and its hook equivalent">
        <table>
          <thead>
            <tr>
              <th>Class method</th>
              <th>When</th>
              <th>Function equivalent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>constructor</td>
              <td>before first render</td>
              <td>useState(initial)</td>
            </tr>
            <tr>
              <td>render</td>
              <td>every render</td>
              <td>the function body</td>
            </tr>
            <tr>
              <td>componentDidMount</td>
              <td>after first render</td>
              <td>useEffect(fn, [])</td>
            </tr>
            <tr>
              <td>componentDidUpdate</td>
              <td>after later renders</td>
              <td>useEffect(fn, [deps])</td>
            </tr>
            <tr>
              <td>componentWillUnmount</td>
              <td>before removal</td>
              <td>cleanup returned from useEffect</td>
            </tr>
            <tr>
              <td>shouldComponentUpdate</td>
              <td>decide whether to re-render</td>
              <td>memo() (topic 4)</td>
            </tr>
            <tr>
              <td>componentDidCatch / getDerivedStateFromError</td>
              <td>a child threw an error</td>
              <td>none: still needs a class (topic 13)</td>
            </tr>
          </tbody>
        </table>
      </Example>

      <Example title="4. One effect = setup + cleanup together">
        <CodeBlock
          code={`
// Class: the setup and cleanup for ONE feature live in two methods
componentDidMount()    { window.addEventListener("resize", this.onResize); }
componentWillUnmount() { window.removeEventListener("resize", this.onResize); }

// Function: both halves sit side by side, so they can't get out of sync
useEffect(() => {
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            No cleanup: timers keep firing and listeners keep running after the
            component is gone (memory leaks, "state update on unmounted component").
          </li>
          <li>
            Calling <code>setState</code> in <code>componentDidUpdate</code>{" "}
            without comparing to <code>prevProps</code> or{" "}
            <code>prevState</code>: an infinite update loop.
          </li>
          <li>
            Assuming an effect with <code>[count]</code> skips the first render.
            It runs on mount too (see the log in example 1).
          </li>
          <li>
            Expecting "mounted" to log once in development. StrictMode
            intentionally mounts twice.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default LifecycleLesson;
