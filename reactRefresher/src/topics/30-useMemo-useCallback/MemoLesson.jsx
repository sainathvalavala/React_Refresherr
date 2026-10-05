import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import SlowFilterList from "./SlowFilterList";
import CallbackDemo from "./CallbackDemo";
import slowFilterListCode from "./SlowFilterList.jsx?raw";
import productsCode from "./products.js?raw";
import callbackDemoCode from "./CallbackDemo.jsx?raw";
import memoButtonCode from "./MemoButton.jsx?raw";

function MemoLesson() {
  return (
    <Lesson
      number={30}
      title="useMemo and useCallback"
      definition="useMemo caches the result of a calculation between renders, and useCallback caches a function. Both return the cached value until one of their dependencies changes."
    >
      <Explain title="How it works">
        <p>
          Every render re-runs the whole component function, so every
          calculation runs again and every object and function inside it is
          created fresh. Usually that's fine. These hooks help in two specific
          situations:
        </p>
        <ol>
          <li>
            <strong>Skipping expensive work</strong>: <code>useMemo</code> keeps
            a slow calculation's result while its inputs haven't changed.
          </li>
          <li>
            <strong>Keeping the same reference</strong>: a memo() child (topic 4)
            or an effect dependency compares with <code>===</code>, and a new{" "}
            <code>{"{}"}</code>, <code>[]</code> or <code>{"() => {}"}</code>{" "}
            is never equal to the old one. <code>useMemo</code> (objects) and{" "}
            <code>useCallback</code> (functions) keep the old reference.
          </li>
        </ol>
        <CodeBlock
          code={`
const visible = useMemo(() => filterTodos(todos, tab), [todos, tab]);
//                       ^ calculate              ^ re-run only when these change

const handleClick = useCallback(() => save(id), [id]);
// is the same as:
const handleClick = useMemo(() => () => save(id), [id]);
`}
        />
        <p>
          <strong>React Compiler:</strong> a build-time plugin
          (babel-plugin-react-compiler) that adds this memoization
          automatically, so new code rarely needs these hooks by hand. It isn't
          enabled in this project because it would hide the re-render behavior the
          lessons demonstrate. You still need to understand them to read
          existing code.
        </p>
      </Explain>

      <Example title="1. useMemo: skip an expensive calculation" code={slowFilterListCode}>
        <SlowFilterList />
        <p className="hint">
          Click "Toggle theme" a few times with useMemo on, then off: you'll
          feel the lag. The console shows when slowFilter runs.
        </p>
        <details>
          <summary>Show products.js (the slow filter)</summary>
          <CodeBlock code={productsCode} />
        </details>
      </Example>

      <Example title="2. useCallback: keep memo() children from re-rendering" code={callbackDemoCode}>
        <CallbackDemo />
        <p className="hint">
          Type in the box: the inline-function button's time changes on every
          key, the useCallback one stays frozen. Both buttons still work.
        </p>
        <details>
          <summary>Show MemoButton.jsx</summary>
          <CodeBlock code={memoButtonCode} />
        </details>
      </Example>

      <Example title="3. useMemo for a stable object (effect dependency)">
        <CodeBlock
          code={`
// ❌ options is a new object every render, so the effect re-connects every render
const options = { roomId, serverUrl };
useEffect(() => connect(options), [options]);

// ✅ same object until roomId or serverUrl changes
const options = useMemo(() => ({ roomId, serverUrl }), [roomId, serverUrl]);
useEffect(() => connect(options), [options]);

// ✅✅ often simplest: create the object INSIDE the effect, depend on the primitives
useEffect(() => connect({ roomId, serverUrl }), [roomId, serverUrl]);
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Wrapping everything "for performance". Each hook has its own cost and
            makes code harder to read. Measure first (topic 45).
          </li>
          <li>
            <code>useCallback</code> for a function passed to a normal (non-memo)
            child or a plain <code>{"<button>"}</code>. Nothing compares it, so it
            gains nothing.
          </li>
          <li>
            Missing dependencies: the cached function keeps using old values (a
            stale closure). Let the lint rule fill them in, or use the updater
            form like <code>setClicks(c =&gt; c + 1)</code>.
          </li>
          <li>
            Putting side effects in <code>useMemo</code>. It's for pure
            calculations during render; effects go in useEffect.
          </li>
          <li>
            Relying on useMemo for correctness. React may throw the cache away;
            your code must still work, just slower.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default MemoLesson;
