import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ParentChildDemo from "./ParentChildDemo";
import OwnStateDemo from "./OwnStateDemo";
import DomPatchDemo from "./DomPatchDemo";
import parentChildDemoCode from "./ParentChildDemo.jsx?raw";
import memoRenderStampCode from "./MemoRenderStamp.jsx?raw";
import selfUpdatingChildCode from "./SelfUpdatingChild.jsx?raw";
import domPatchDemoCode from "./DomPatchDemo.jsx?raw";
import renderStampCode from "../../components/RenderStamp.jsx?raw";

function ReRendersLesson() {
  return (
    <Lesson
      number={4}
      title="Tracking re-renders"
      definition="A re-render is React calling your component function again to work out the new JSX. React then updates only the parts of the real page that changed."
    >
      <Explain title="How it works">
        <p>Every update goes through two phases:</p>
        <ol>
          <li>
            <strong>Render:</strong> React calls your component functions to
            get the new JSX. This is just JavaScript and doesn't touch the page.
          </li>
          <li>
            <strong>Commit:</strong> React compares the new JSX with the
            previous one and applies only the differences to the real DOM.
          </li>
        </ol>
        <p>A component re-renders when:</p>
        <ul>
          <li>its own state changes (useState setter called with a new value)</li>
          <li>its parent re-renders (by default, even if the props are identical)</li>
          <li>a context it reads changes (topic 22)</li>
        </ul>
        <p>
          Props changing is <em>not</em> a separate trigger. Props only change
          because the parent re-rendered. Re-renders are usually cheap; you
          only need to care when something is visibly slow.{" "}
          <code>memo()</code> lets a child skip re-rendering if all its props
          are unchanged.
        </p>
      </Explain>

      <Example title="The tool used on this page: RenderStamp" code={renderStampCode}>
        <p>
          It prints the time it was rendered. If the time changes, the
          component re-rendered. Each render is also logged in the browser console.
        </p>
      </Example>

      <Example title="1. Parent re-renders all children (and how memo helps)" code={parentChildDemoCode}>
        <ParentChildDemo />
        <details>
          <summary>Show MemoRenderStamp.jsx</summary>
          <CodeBlock code={memoRenderStampCode} />
        </details>
      </Example>

      <Example title="2. State only re-renders its owner and below" code={selfUpdatingChildCode}>
        <OwnStateDemo />
      </Example>

      <Example title="3. A re-render only patches what changed" code={domPatchDemoCode}>
        <DomPatchDemo />
      </Example>

      <Explain title="Other ways to track re-renders">
        <ul>
          <li>
            Put <code>console.log("render")</code> in the component body. It
            runs on every render.
          </li>
          <li>
            Install the React Developer Tools browser extension. In the
            Components tab settings, turn on "Highlight updates when
            components render". The Profiler tab records how long each render took.
          </li>
          <li>
            Remember that StrictMode renders twice in development (topic 1), so
            each log appears twice.
          </li>
        </ul>
      </Explain>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Thinking a re-render rebuilds the DOM. It doesn't; only changed
            parts are updated (example 3).
          </li>
          <li>
            Wrapping every component in <code>memo()</code> "just in case". It
            adds comparison work and complexity. Use it when you have measured
            a real slowdown.
          </li>
          <li>
            Passing new objects, arrays or functions to a memo component
            (<code>{"options={{...}}"}</code>, <code>{"onClick={() => ...}"}</code>).
            They are new every render, so memo never skips (example 1, child 4).
          </li>
          <li>
            Panicking about double logs in development: that's StrictMode, not
            a bug.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ReRendersLesson;
