import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import CounterReducer from "./CounterReducer";
import TaskBoard from "./TaskBoard";
import ReducerCartProvider from "./ReducerCartProvider";
import FruitButtons from "./FruitButtons";
import FruitCart from "./FruitCart";
import counterReducerCode from "./CounterReducer.jsx?raw";
import taskBoardCode from "./TaskBoard.jsx?raw";
import tasksReducerCode from "./tasksReducer.js?raw";
import providerCode from "./ReducerCartProvider.jsx?raw";
import contextsCode from "./CartContexts.js?raw";
import fruitButtonsCode from "./FruitButtons.jsx?raw";

function UseReducerLesson() {
  return (
    <Lesson
      number={29}
      title="useReducer"
      definition="useReducer manages state through a reducer function: components dispatch actions describing what happened, and the reducer computes the next state from the current state and the action."
    >
      <Explain title="How it works">
        <CodeBlock
          code={`
function reducer(state, action) {      // pure: no side effects, no mutation
  switch (action.type) {
    case "incremented": return { ...state, count: state.count + 1 };
    default: throw new Error("Unknown action");
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: "incremented" });     // -> reducer(state, action) -> new state
`}
        />
        <p>
          It's the same idea as <code>useState</code>, but instead of calling{" "}
          <code>setX(newValue)</code> from many places, you{" "}
          <strong>describe events</strong> and keep <strong>all update logic
          in one function</strong>.
        </p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>useState</th>
              <th>useReducer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Best for</td>
              <td>independent, simple values</td>
              <td>related values updated in many ways</td>
            </tr>
            <tr>
              <td>Update logic lives in</td>
              <td>each event handler</td>
              <td>one reducer function</td>
            </tr>
            <tr>
              <td>Testing the logic</td>
              <td>render the component</td>
              <td>call the reducer directly, no React needed</td>
            </tr>
            <tr>
              <td>Debugging</td>
              <td>"who called setTasks?"</td>
              <td>log every action: a readable history</td>
            </tr>
          </tbody>
        </table>
        <p>
          Name actions in the <strong>past tense</strong> after what happened (
          <code>added</code>, <code>toggled</code>), not as commands. This is
          exactly how Redux works (topic 40).
        </p>
      </Explain>

      <Example title="1. A counter reducer" code={counterReducerCode}>
        <CounterReducer />
      </Example>

      <Example title="2. A task list: many update types, one reducer" code={taskBoardCode}>
        <TaskBoard />
        <details>
          <summary>Show tasksReducer.js</summary>
          <CodeBlock code={tasksReducerCode} />
        </details>
      </Example>

      <Example title="3. Reducer + context: shared app state without a library" code={providerCode}>
        <ReducerCartProvider>
          <FruitButtons />
          <FruitCart />
        </ReducerCartProvider>
        <p className="hint">
          Add fruit: FruitCart's time changes, FruitButtons' doesn't, because it
          only uses dispatch, which is stable.
        </p>
        <details>
          <summary>Show CartContexts.js</summary>
          <CodeBlock code={contextsCode} />
        </details>
        <details>
          <summary>Show FruitButtons.jsx</summary>
          <CodeBlock code={fruitButtonsCode} />
        </details>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Mutating in the reducer: <code>state.count++; return state;</code>.
            React sees the same object and skips the update. Return a new object.
          </li>
          <li>
            Forgetting <code>...state</code> and losing the other fields (the
            counter's step would vanish).
          </li>
          <li>
            Side effects in the reducer (fetch, random ids, Date.now()). It must
            be pure; StrictMode calls it twice. Create ids in the event handler
            and put them in the action (example 2).
          </li>
          <li>
            Not handling unknown action types. Throwing in{" "}
            <code>default</code> catches typos like <code>"ad"</code> straight away.
          </li>
          <li>
            Expecting <code>state</code> to change right after{" "}
            <code>dispatch()</code>. Like setState, it's a snapshot until the next render.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default UseReducerLesson;
