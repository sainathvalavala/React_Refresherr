import { Suspense } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import CountValue from "./CountValue";
import DoubledValue from "./DoubledValue";
import CountControls from "./CountControls";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import TodoItems from "./TodoItems";
import TodoStats from "./TodoStats";
import UserSwitcher from "./UserSwitcher";
import UserCard from "./UserCard";
import FontSizeControl from "./FontSizeControl";
import PreviewText from "./PreviewText";
import atomsCode from "./atoms.js?raw";
import countValueCode from "./CountValue.jsx?raw";
import countControlsCode from "./CountControls.jsx?raw";
import todoAtomsCode from "./todoAtoms.js?raw";
import todoItemsCode from "./TodoItems.jsx?raw";
import todoFilterCode from "./TodoFilter.jsx?raw";
import todoInputCode from "./TodoInput.jsx?raw";
import userAtomsCode from "./userAtoms.js?raw";
import userCardCode from "./UserCard.jsx?raw";
import settingsAtomsCode from "./settingsAtoms.js?raw";

function RecoilLesson() {
  return (
    <Lesson
      number={24}
      title="Introducing Recoil (with Jotai)"
      definition="Recoil is a state management library built around atoms (shared pieces of state) and selectors (values derived from them). Components subscribe only to the atoms they use, so only those components re-render."
    >
      <Explain title="Why this lesson uses Jotai">
        <p>
          Meta archived Recoil in 2025, and it does not work with React 19,
          which this project uses. Jotai is built on the same idea, atoms,
          with an almost identical API. Everything here maps one-to-one onto
          Recoil code you may read in tutorials (see the table at the end).
        </p>
      </Explain>

      <Explain title="How it works">
        <p>
          <strong>The problem with context for shared state:</strong> when the
          provider's value changes, <em>every</em> consumer re-renders, even
          ones that use a different part of the value. And each new piece of
          shared state needs its own context + provider + hook boilerplate.
        </p>
        <p>
          <strong>Atoms</strong> fix this. Each atom is a tiny, independent
          piece of global state, defined outside any component:
        </p>
        <ul>
          <li>
            Any component can read or write any atom, with no provider and no props.
          </li>
          <li>
            A component subscribes <strong>only to the atoms it uses</strong>,
            so changing one atom re-renders only its readers.
          </li>
          <li>
            <strong>Derived atoms</strong> (Recoil: selectors) compute values
            from other atoms and update automatically.
          </li>
          <li>
            <strong>Write-only atoms</strong> hold update logic ("actions"), so
            components just call <code>addTodo(text)</code>.
          </li>
          <li>
            <strong>Async atoms</strong> return a Promise and work with{" "}
            <code>{"<Suspense>"}</code>: no loading flags or effects in components.
          </li>
        </ul>
        <CodeBlock
          code={`
const countAtom = atom(0);                         // primitive atom
const doubledAtom = atom((get) => get(countAtom) * 2); // derived (read-only)
const resetAtom = atom(null, (get, set) => set(countAtom, 0)); // write-only

const [count, setCount] = useAtom(countAtom);      // read + write
const doubled = useAtomValue(doubledAtom);         // read only
const reset = useSetAtom(resetAtom);               // write only (no re-render on change)
`}
        />
      </Explain>

      {/* These three components share state with no common parent state and no props */}
      <Example title="1. Atoms shared by separate components" code={atomsCode}>
        <div className="grid">
          <CountValue />
          <div className="stack">
            <DoubledValue />
            <CountControls />
          </div>
        </div>
        <p className="hint">
          Click +1: CountValue re-renders (its time changes) but CountControls
          doesn't, because it only writes the atom. Switch to another topic
          and back: the count is still there, since atoms live outside components.
        </p>
        <details>
          <summary>Show CountValue.jsx (useAtomValue)</summary>
          <CodeBlock code={countValueCode} />
        </details>
        <details>
          <summary>Show CountControls.jsx (useSetAtom)</summary>
          <CodeBlock code={countControlsCode} />
        </details>
      </Example>

      <Example title="2. A todo app: derived atoms and action atoms" code={todoAtomsCode}>
        <TodoInput />
        <TodoFilter />
        <TodoItems />
        <TodoStats />
        <p className="hint">
          Four sibling components with no props between them, all in sync.
        </p>
        <details>
          <summary>Show TodoItems.jsx</summary>
          <CodeBlock code={todoItemsCode} />
        </details>
        <details>
          <summary>Show TodoFilter.jsx</summary>
          <CodeBlock code={todoFilterCode} />
        </details>
        <details>
          <summary>Show TodoInput.jsx</summary>
          <CodeBlock code={todoInputCode} />
        </details>
      </Example>

      <Example title="3. Async atoms with Suspense" code={userAtomsCode}>
        <UserSwitcher />
        <Suspense fallback={<p>⏳ Loading user...</p>}>
          <UserCard />
        </Suspense>
        <details>
          <summary>Show UserCard.jsx</summary>
          <CodeBlock code={userCardCode} />
        </details>
      </Example>

      <Example title="4. Persisted atoms (localStorage)" code={settingsAtomsCode}>
        <FontSizeControl />
        <PreviewText />
      </Example>

      <Example title="5. Recoil vs Jotai">
        <table>
          <thead>
            <tr>
              <th>Concept</th>
              <th>Recoil</th>
              <th>Jotai</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Create state</td>
              <td>atom({"{ key, default }"})</td>
              <td>atom(initialValue)</td>
            </tr>
            <tr>
              <td>Derived state</td>
              <td>selector({"{ key, get }"})</td>
              <td>atom((get) =&gt; ...)</td>
            </tr>
            <tr>
              <td>Async derived state</td>
              <td>selector with async get</td>
              <td>atom(async (get) =&gt; ...)</td>
            </tr>
            <tr>
              <td>Writable derived state</td>
              <td>selector with set</td>
              <td>atom(read, (get, set, arg) =&gt; ...)</td>
            </tr>
            <tr>
              <td>Read + write</td>
              <td>useRecoilState</td>
              <td>useAtom</td>
            </tr>
            <tr>
              <td>Read only</td>
              <td>useRecoilValue</td>
              <td>useAtomValue</td>
            </tr>
            <tr>
              <td>Write only</td>
              <td>useSetRecoilState</td>
              <td>useSetAtom</td>
            </tr>
            <tr>
              <td>Persistence</td>
              <td>atom effects</td>
              <td>atomWithStorage (jotai/utils)</td>
            </tr>
            <tr>
              <td>Root wrapper</td>
              <td>{"<RecoilRoot>"} required</td>
              <td>{"<Provider>"} optional</td>
            </tr>
          </tbody>
        </table>
        <CodeBlock code="npm install jotai" />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Creating atoms inside a component (<code>const a = atom(0)</code>{" "}
            in the function body). That makes a new atom every render. Define
            atoms at module level.
          </li>
          <li>
            Putting everything in global atoms. State only one component uses
            (like half-typed input text) should stay in useState.
          </li>
          <li>
            Using <code>useAtom</code> when you only write. The component then
            re-renders on every change. Use <code>useSetAtom</code>.
          </li>
          <li>
            Reading an async atom without a <code>{"<Suspense>"}</code> above it:
            React has nowhere to show the loading state.
          </li>
          <li>
            Recoil only: forgetting the unique <code>key</code> string, or
            reusing the same key for two atoms.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default RecoilLesson;
