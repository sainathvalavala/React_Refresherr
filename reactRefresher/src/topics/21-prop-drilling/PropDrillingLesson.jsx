import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import DrillingApp from "./DrillingApp";
import CompositionApp from "./CompositionApp";
import drillingAppCode from "./DrillingApp.jsx?raw";
import pageCode from "./Page.jsx?raw";
import headerCode from "./Header.jsx?raw";
import userGreetingCode from "./UserGreeting.jsx?raw";
import compositionAppCode from "./CompositionApp.jsx?raw";
import composedPageCode from "./ComposedPage.jsx?raw";
import composedHeaderCode from "./ComposedHeader.jsx?raw";

function PropDrillingLesson() {
  return (
    <Lesson
      number={21}
      title="Prop drilling"
      definition="Prop drilling is passing a prop through several layers of components that don't need it, just to reach a deeply nested one that does."
    >
      <Explain title="How it works">
        <p>
          It is a side effect of two good rules: state should live in the
          closest common parent (topic 20), and data flows down only through
          props. When the parent that owns the state and the child that uses
          it are far apart, every component in between must accept the prop
          and pass it on.
        </p>
        <CodeBlock
          code={`
App (user) ──> Page (user) ──> Header (user) ──> UserGreeting (uses user)
               ^ doesn't use it  ^ doesn't use it
`}
        />
        <p>
          Two or three levels is fine and perfectly normal React. It's explicit
          and easy to trace. It becomes a problem as the app grows:
        </p>
        <ul>
          <li>Middle components get props they never use, which adds noise.</li>
          <li>Adding or renaming a prop means editing every layer.</li>
          <li>Moving a component to another place breaks the chain.</li>
          <li>It's hard to see where a value actually comes from.</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Solution</th>
              <th>Idea</th>
              <th>Best when</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Composition (children)</td>
              <td>Build the deep element at the top, pass it down ready-made</td>
              <td>The layers in between are just layout</td>
            </tr>
            <tr>
              <td>Context API (topic 22)</td>
              <td>Provide a value once; any descendant reads it</td>
              <td>Many components at many depths need it (user, theme)</td>
            </tr>
            <tr>
              <td>State library (topic 24)</td>
              <td>Global atoms or stores outside the tree</td>
              <td>Lots of shared, frequently changing state</td>
            </tr>
          </tbody>
        </table>
      </Explain>

      <Example title="1. user drilled through Page and Header" code={drillingAppCode}>
        <DrillingApp />
        <details>
          <summary>Show Page.jsx</summary>
          <CodeBlock code={pageCode} />
        </details>
        <details>
          <summary>Show Header.jsx</summary>
          <CodeBlock code={headerCode} />
        </details>
        <details>
          <summary>Show UserGreeting.jsx</summary>
          <CodeBlock code={userGreetingCode} />
        </details>
      </Example>

      <Example title="2. The same tree solved with composition" code={compositionAppCode}>
        <CompositionApp />
        <details>
          <summary>Show ComposedPage.jsx</summary>
          <CodeBlock code={composedPageCode} />
        </details>
        <details>
          <summary>Show ComposedHeader.jsx</summary>
          <CodeBlock code={composedHeaderCode} />
        </details>
      </Example>

      <Example title="3. Functions get drilled too">
        <CodeBlock
          code={`
// Not only data: callbacks travel down the same way.
function App() {
  const [user, setUser] = useState(null);
  return <Page user={user} onLogout={() => setUser(null)} />;
}
function Page({ user, onLogout })   { return <Header user={user} onLogout={onLogout} />; }
function Header({ user, onLogout }) { return <LogoutButton onLogout={onLogout} />; }
function LogoutButton({ onLogout }) { return <button onClick={onLogout}>Log out</button>; }
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Reaching for context the moment a prop goes two levels deep. Plain
            props are simpler and easier to follow.
          </li>
          <li>
            Spreading all props down (<code>{"{...props}"}</code>) to "save
            typing". That hides what each component really needs.
          </li>
          <li>
            Moving state to App to avoid thinking about where it belongs, which
            causes both drilling and unneeded re-renders (topic 20).
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default PropDrillingLesson;
