import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import Counter from "./Counter";
import ProfileForm from "./ProfileForm";
import SnapshotDemo from "./SnapshotDemo";
import TagEditor from "./TagEditor";
import ClickCounter from "./ClickCounter";
import counterCode from "./Counter.jsx?raw";
import profileFormCode from "./ProfileForm.jsx?raw";
import snapshotDemoCode from "./SnapshotDemo.jsx?raw";
import tagEditorCode from "./TagEditor.jsx?raw";
import clickCounterCode from "./ClickCounter.jsx?raw";

function UseStateLesson() {
  return (
    <Lesson
      number={3}
      title="useState"
      definition="useState is a hook that gives a component its own memory: a value plus a setter function. Calling the setter updates the value and re-renders the component."
    >
      <Explain title="How it works">
        <p>
          A normal variable inside a component is recreated every render, and
          changing it doesn't tell React to redraw anything.{" "}
          <code>useState</code> fixes both problems: React{" "}
          <strong>stores the value between renders</strong> and{" "}
          <strong>re-renders when you call the setter</strong>.
        </p>
        <CodeBlock
          code={`
const [count, setCount] = useState(0);
//     ^value  ^setter            ^initial value (used on the FIRST render only)
`}
        />
        <ul>
          <li>
            <strong>Hooks</strong> are functions whose names start with{" "}
            <code>use</code>. Call them only at the top level of a component
            or custom hook, never inside if statements, loops or nested
            functions. React identifies each hook by its call order.
          </li>
          <li>
            <strong>Each instance has its own state.</strong> Two{" "}
            <code>{"<Counter />"}</code>s keep two separate counts.
          </li>
          <li>
            <strong>State is a snapshot.</strong> Inside one render the value
            never changes. The new value appears on the <em>next</em> render.
          </li>
          <li>
            <strong>Updates are batched.</strong> Several setter calls in one
            event handler cause a single re-render.
          </li>
          <li>
            <strong>Treat state as read-only.</strong> For objects and arrays,
            create a new copy instead of changing the old one.
          </li>
        </ul>
      </Explain>

      <Example title="1. Numbers, strings and booleans" code={counterCode}>
        <Counter />
      </Example>

      <Example title="2. State is a snapshot (updater functions)" code={snapshotDemoCode}>
        <SnapshotDemo />
      </Example>

      <Example title="3. Each instance has its own state" code={clickCounterCode}>
        <div className="row">
          <ClickCounter />
          <ClickCounter />
          <ClickCounter />
        </div>
      </Example>

      <Example title="4. Objects (update immutably)" code={profileFormCode}>
        <ProfileForm />
      </Example>

      <Example title="5. Arrays (add, remove, update)" code={tagEditorCode}>
        <TagEditor />
      </Example>

      <Example title="6. Lazy initial state">
        <CodeBlock
          code={`
// The initial value expression runs on EVERY render (and is then ignored):
const [todos, setTodos] = useState(loadTodosFromStorage());

// Passing a function makes React call it only once, on the first render:
const [todos, setTodos] = useState(() => loadTodosFromStorage());
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Changing state directly: <code>count++</code>,{" "}
            <code>user.name = "x"</code>, <code>items.push(x)</code>. React
            doesn't notice, so the screen doesn't update. Always use the setter
            with a new value.
          </li>
          <li>
            Reading state right after setting it:{" "}
            <code>setCount(5); console.log(count)</code> still logs the old value.
          </li>
          <li>
            Repeating <code>setCount(count + 1)</code> when the next value
            depends on the previous one. Use <code>setCount(c =&gt; c + 1)</code>.
          </li>
          <li>
            Calling the setter during render, e.g. <code>setCount(1)</code> in
            the function body. That causes a re-render, which calls it again,
            and so on forever.
          </li>
          <li>
            Writing <code>{"onClick={setCount(count + 1)}"}</code>. That runs
            immediately on every render. Pass a function:{" "}
            <code>{"onClick={() => setCount(count + 1)}"}</code>.
          </li>
          <li>
            Storing values that can be calculated, such as{" "}
            <code>fullName</code> from <code>first</code> + <code>last</code>.
            Compute them during render instead, so they can't get out of sync.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default UseStateLesson;
