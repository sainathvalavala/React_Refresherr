import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import FocusInput from "./FocusInput";
import Stopwatch from "./Stopwatch";
import RefVsState from "./RefVsState";
import ScrollBox from "./ScrollBox";
import MeasureBox from "./MeasureBox";
import LoginFormFocus from "./LoginFormFocus";
import focusInputCode from "./FocusInput.jsx?raw";
import stopwatchCode from "./Stopwatch.jsx?raw";
import refVsStateCode from "./RefVsState.jsx?raw";
import scrollBoxCode from "./ScrollBox.jsx?raw";
import measureBoxCode from "./MeasureBox.jsx?raw";
import loginFormFocusCode from "./LoginFormFocus.jsx?raw";
import fancyInputCode from "./FancyInput.jsx?raw";

function UseRefLesson() {
  return (
    <Lesson
      number={18}
      title="useRef"
      definition="useRef returns a box, { current: value }, that survives re-renders. Changing it does not trigger a re-render. It is used to reach DOM elements and to store values the UI doesn't display."
    >
      <Explain title="How it works">
        <CodeBlock
          code={`
const ref = useRef(initialValue); // -> { current: initialValue }
ref.current = 42;                 // change it any time; no re-render
`}
        />
        <p>
          React gives you the <strong>same object on every render</strong>.
          Whatever you put in <code>.current</code> stays there until you
          change it. It works like an instance variable on a class.
        </p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>useState</th>
              <th>useRef</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Survives re-renders</td>
              <td>✅</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Changing it re-renders</td>
              <td>✅</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>How to change</td>
              <td>setter function</td>
              <td>
                assign <code>ref.current = x</code>
              </td>
            </tr>
            <tr>
              <td>Use for</td>
              <td>anything shown on screen</td>
              <td>DOM nodes, timer ids, values not shown</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>DOM refs:</strong> <code>{"<input ref={inputRef} />"}</code>{" "}
          tells React to put the real DOM node in <code>inputRef.current</code>{" "}
          after it mounts (and set it back to <code>null</code> when it
          unmounts). Use it for things React has no prop for: focus, scroll,
          measure, play or pause media, third-party libraries.
        </p>
        <p>
          <strong>Rule:</strong> don't read or write <code>ref.current</code>{" "}
          while rendering. Do it in event handlers and effects. During the
          first render a DOM ref is still <code>null</code>.
        </p>
      </Explain>

      <Example title="1. Accessing a DOM element: focus" code={focusInputCode}>
        <FocusInput />
      </Example>

      <Example title="2. Scrolling" code={scrollBoxCode}>
        <ScrollBox />
      </Example>

      <Example title="3. Measuring an element" code={measureBoxCode}>
        <MeasureBox />
      </Example>

      <Example title="4. Storing a value that isn't shown (interval id)" code={stopwatchCode}>
        <Stopwatch />
      </Example>

      <Example title="5. Ref vs state" code={refVsStateCode}>
        <RefVsState />
      </Example>

      <Example title="6. Passing a ref to your own component (React 19)" code={loginFormFocusCode}>
        <LoginFormFocus />
        <details>
          <summary>Show FancyInput.jsx</summary>
          <CodeBlock code={fancyInputCode} />
        </details>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Using a ref for something displayed on screen. Changing it won't
            update the UI. Use state.
          </li>
          <li>
            Reading <code>ref.current</code> during render (e.g.{" "}
            <code>{"<p>{ref.current}</p>"}</code>). It may be stale or{" "}
            <code>null</code>, and React doesn't know to update it.
          </li>
          <li>
            Calling <code>inputRef.current.focus()</code> before the element
            exists (during the first render, or while it's conditionally
            hidden). <code>current</code> is <code>null</code>.
          </li>
          <li>
            Writing <code>{"ref={inputRef.current}"}</code>. Pass the ref object
            itself: <code>{"ref={inputRef}"}</code>.
          </li>
          <li>
            Reaching for refs to change the DOM directly (setting{" "}
            <code>innerHTML</code> or styles). Let React render it from state
            instead.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default UseRefLesson;
