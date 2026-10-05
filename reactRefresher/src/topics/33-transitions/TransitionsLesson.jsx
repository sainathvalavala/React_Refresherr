import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import TransitionTabs from "./TransitionTabs";
import DeferredSearch from "./DeferredSearch";
import transitionTabsCode from "./TransitionTabs.jsx?raw";
import deferredSearchCode from "./DeferredSearch.jsx?raw";
import slowListCode from "./SlowList.jsx?raw";
import slowItemCode from "./SlowItem.jsx?raw";

function TransitionsLesson() {
  return (
    <Lesson
      number={33}
      title="Transitions: useTransition and useDeferredValue"
      definition="Transitions let you mark some updates as non-urgent. React keeps the UI responsive to typing and clicks, and renders the slow, non-urgent part in the background, where it can be interrupted."
    >
      <Explain title="How it works">
        <p>
          Normally a render can't be interrupted: if updating a big list takes
          300 ms, the page is frozen for 300 ms and keystrokes feel stuck.
          React 18+ has <strong>concurrent rendering</strong>, which splits
          updates into two kinds:
        </p>
        <ul>
          <li>
            <strong>Urgent</strong>: typing, clicking, pressing. The user expects
            immediate feedback.
          </li>
          <li>
            <strong>Transition</strong>: the results of that input (a filtered
            list, a new tab, a chart). These can wait a moment, and React can pause or
            abandon them if a newer urgent update arrives.
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>useTransition</th>
              <th>useDeferredValue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>You control</td>
              <td>the state update (wrap the setter)</td>
              <td>a value you receive (e.g. a prop or state)</td>
            </tr>
            <tr>
              <td>Gives you</td>
              <td>
                <code>[isPending, startTransition]</code>
              </td>
              <td>a lagging copy of the value</td>
            </tr>
            <tr>
              <td>Typical use</td>
              <td>switching tabs or pages</td>
              <td>search box + slow results</td>
            </tr>
          </tbody>
        </table>
        <p>
          Neither hook makes the slow component faster. They make it{" "}
          <strong>not block</strong> the parts that should feel instant. Form
          Actions (topic 28) and React Router navigations use transitions
          internally.
        </p>
      </Explain>

      <Example title="1. useTransition: switching to a slow tab" code={transitionTabsCode}>
        <TransitionTabs />
        <p className="hint">
          With the checkbox off, clicking "posts" freezes the buttons. With it
          on, you can click "contact" right away.
        </p>
      </Example>

      <Example title="2. useDeferredValue: a responsive search box" code={deferredSearchCode}>
        <DeferredSearch />
        <p className="hint">
          Type fast with it on (the input keeps up, the list catches up), then
          turn it off (every key waits for the whole list).
        </p>
        <details>
          <summary>Show SlowList.jsx</summary>
          <CodeBlock code={slowListCode} />
        </details>
        <details>
          <summary>Show SlowItem.jsx</summary>
          <CodeBlock code={slowItemCode} />
        </details>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Wrapping the <em>input's own</em> state in a transition (
            <code>{"startTransition(() => setText(e.target.value))"}</code>). The
            input must update urgently, or typing lags. Defer the results instead.
          </li>
          <li>
            Using <code>useDeferredValue</code> without <code>memo()</code> on the
            slow child. The urgent render still re-renders the slow list, so nothing
            improves.
          </li>
          <li>
            Expecting transitions to debounce network requests. They're about
            rendering; use a debounce (topic 19) or a data library for requests.
          </li>
          <li>
            Setting state after an <code>await</code> inside{" "}
            <code>startTransition</code>. That update is no longer part of the
            transition; wrap it in another <code>startTransition</code>.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default TransitionsLesson;
