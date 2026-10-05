import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import HookCounter from "./HookCounter";
import WindowWidth from "./WindowWidth";
import DebouncedSearch from "./DebouncedSearch";
import ToggleDemo from "./ToggleDemo";
import PersistentNote from "./PersistentNote";
import PostViewer from "./PostViewer";
import useCounterCode from "./useCounter.js?raw";
import useWindowWidthCode from "./useWindowWidth.js?raw";
import useDebounceCode from "./useDebounce.js?raw";
import useToggleCode from "./useToggle.js?raw";
import useLocalStorageCode from "./useLocalStorage.js?raw";
import useFetchCode from "./useFetch.js?raw";
import postViewerCode from "./PostViewer.jsx?raw";

function CustomHooksLesson() {
  return (
    <Lesson
      number={19}
      title="Custom hooks"
      definition="A custom hook is your own function, named useSomething, that uses React's hooks inside it. It shares stateful LOGIC between components; each caller still gets its own independent state."
    >
      <Explain title="How it works">
        <p>
          When two components need the same stateful behavior (a toggle, a
          fetch, a timer, a window listener), you'd otherwise copy and paste the{" "}
          <code>useState</code> + <code>useEffect</code> code. A custom hook
          moves that code into a function:
        </p>
        <CodeBlock
          code={`
// Before: logic inside the component
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => { /* add + remove resize listener */ }, []);
  return <p>{width}</p>;
}

// After: logic in a hook, the component just uses the result
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => { /* add + remove resize listener */ }, []);
  return width;
}

function WindowWidth() {
  const width = useWindowWidth();
  return <p>{width}</p>;
}
`}
        />
        <ul>
          <li>
            The name <strong>must start with use</strong>. That's how React and
            the lint rules know the rules of hooks apply inside it.
          </li>
          <li>
            It's a normal function: it can take <strong>any arguments</strong>{" "}
            and return <strong>anything</strong> (a value, an array like
            useState, or an object).
          </li>
          <li>
            <strong>It shares logic, not state.</strong> Every component that
            calls it gets its own copy of the state inside.
          </li>
          <li>
            Hooks can call other hooks, including other custom hooks, so they
            compose.
          </li>
          <li>
            The same rules apply: call it at the top level, never inside if
            statements or loops.
          </li>
        </ul>
      </Explain>

      {/* Same hook, two components: the logic is shared, the state is not */}
      <Example title="1. useCounter: reusable state logic, returning an object" code={useCounterCode}>
        <div className="grid">
          <HookCounter label="Counter by 1" step={1} />
          <HookCounter label="Counter by 5" step={5} />
        </div>
      </Example>

      <Example title="2. useToggle: returning an array like useState" code={useToggleCode}>
        <ToggleDemo />
      </Example>

      <Example title="3. useWindowWidth: a hook wrapping an effect" code={useWindowWidthCode}>
        <WindowWidth />
      </Example>

      <Example title="4. useDebounce: wait until typing stops" code={useDebounceCode}>
        <DebouncedSearch />
      </Example>

      <Example title="5. useLocalStorage: state that survives a refresh" code={useLocalStorageCode}>
        <PersistentNote />
      </Example>

      <Example title="6. useFetch: data loading in one line" code={useFetchCode}>
        <PostViewer />
        <details>
          <summary>Show PostViewer.jsx (the component using it)</summary>
          <CodeBlock code={postViewerCode} />
        </details>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Naming it <code>getCounter</code> or <code>counterHook</code>.
            Without the <code>use</code> prefix, the rules of hooks can't be
            checked.
          </li>
          <li>
            Expecting two components using <code>useCounter()</code> to share
            one count. They don't. To share state, lift it up (topic 20) or
            use context (topic 22).
          </li>
          <li>
            Making a "hook" that doesn't call any hooks. That's just a normal
            helper function; name it without <code>use</code>.
          </li>
          <li>
            Calling a custom hook conditionally:{" "}
            <code>{"if (loggedIn) useFetch(url)"}</code>. Call it every render,
            and handle the condition inside (e.g. skip when url is null).
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default CustomHooksLesson;
