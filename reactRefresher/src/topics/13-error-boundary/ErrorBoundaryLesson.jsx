import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ErrorBoundary from "./ErrorBoundary";
import BuggyCounter from "./BuggyCounter";
import SafeSubmit from "./SafeSubmit";
import errorBoundaryCode from "./ErrorBoundary.jsx?raw";
import buggyCounterCode from "./BuggyCounter.jsx?raw";
import safeSubmitCode from "./SafeSubmit.jsx?raw";

function ErrorBoundaryLesson() {
  return (
    <Lesson
      number={13}
      title="Error boundary"
      definition="An error boundary is a component that catches rendering errors in its children and shows a fallback UI, so one broken part doesn't take down the whole page."
    >
      <Explain title="How it works">
        <p>
          If any component throws an error while rendering and nothing catches
          it, React <strong>unmounts the entire app</strong> and you get a
          blank page. React prefers no UI to a broken, half-updated UI. An
          error boundary is a <code>try/catch</code> for a part of the
          component tree.
        </p>
        <table>
          <thead>
            <tr>
              <th>Caught ✅</th>
              <th>Not caught ❌</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Errors during rendering of children</td>
              <td>Errors in event handlers (onClick...)</td>
            </tr>
            <tr>
              <td>Errors in children's lifecycle methods and effects</td>
              <td>Async code: setTimeout, fetch().then, promises</td>
            </tr>
            <tr>
              <td>Errors in children's constructors</td>
              <td>Errors in the boundary component itself</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>
            It must be a class with <code>static getDerivedStateFromError</code>{" "}
            (and optionally <code>componentDidCatch</code> for logging).
          </li>
          <li>
            <strong>Where to place them</strong>: one near the top of the app
            as a last resort, plus smaller ones around independent widgets
            (sidebar, chart, comments) so one failure stays contained.
          </li>
          <li>
            In development, React still logs caught errors to the console. That
            is normal.
          </li>
        </ul>
      </Explain>

      <Example title="The ErrorBoundary and BuggyCounter used below" code={errorBoundaryCode}>
        <p>BuggyCounter throws during render when its count reaches 3.</p>
        <details>
          <summary>Show BuggyCounter.jsx</summary>
          <CodeBlock code={buggyCounterCode} />
        </details>
      </Example>

      {/* Each boundary isolates its own children: one crash leaves the other working */}
      <Example title="1. One boundary per widget">
        <ErrorBoundary>
          <BuggyCounter label="Counter A" />
        </ErrorBoundary>
        <ErrorBoundary>
          <BuggyCounter label="Counter B" />
        </ErrorBoundary>
        <p className="hint">Count A up to 3: only A is replaced, and B keeps working.</p>
      </Example>

      <Example title="2. One boundary around a group">
        <ErrorBoundary>
          <BuggyCounter label="Counter C" />
          <BuggyCounter label="Counter D" />
        </ErrorBoundary>
        <p className="hint">
          Count either one to 3: the whole group is replaced, because the
          nearest boundary holds both.
        </p>
      </Example>

      <Example title="3. A custom fallback">
        <ErrorBoundary
          fallback={(error, reset) => (
            <div className="error-box">
              <p>😵 The chart widget failed ({error.message}).</p>
              <button onClick={reset}>Reload widget</button>
            </div>
          )}
        >
          <BuggyCounter label="Chart widget" />
        </ErrorBoundary>
      </Example>

      <Example title="4. Event handler errors: use try/catch" code={safeSubmitCode}>
        <SafeSubmit />
      </Example>

      <Example title="5. In real projects: react-error-boundary">
        <CodeBlock
          code={`
// npm install react-error-boundary  (a ready-made, well-tested boundary)
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary
  fallbackRender={({ error, resetErrorBoundary }) => (
    <p>Failed: {error.message} <button onClick={resetErrorBoundary}>Retry</button></p>
  )}
  onError={(error) => sendToLoggingService(error)}
>
  <Dashboard />
</ErrorBoundary>
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Expecting a boundary to catch errors from <code>onClick</code> or a{" "}
            <code>fetch</code> callback. Use try/catch there (example 4).
          </li>
          <li>
            Trying to write a boundary as a function component. There is no
            hook for it; it must be a class (or use react-error-boundary).
          </li>
          <li>
            Having only one boundary at the very top. Any error then replaces
            the whole page with the fallback.
          </li>
          <li>
            A fallback that throws an error itself. The boundary can't catch
            its own errors, so the next boundary up has to.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ErrorBoundaryLesson;
