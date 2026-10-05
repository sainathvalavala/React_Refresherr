import { useState } from "react";
import { Provider } from "react-redux";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import { makeStore } from "./store";
import ReduxCounter from "./ReduxCounter";
import ReduxTodos from "./ReduxTodos";
import ReduxUser from "./ReduxUser";
import storeCode from "./store.js?raw";
import counterSliceCode from "./counterSlice.js?raw";
import reduxCounterCode from "./ReduxCounter.jsx?raw";
import todosSliceCode from "./todosSlice.js?raw";
import reduxTodosCode from "./ReduxTodos.jsx?raw";
import userSliceCode from "./userSlice.js?raw";
import reduxUserCode from "./ReduxUser.jsx?raw";

function ReduxLesson() {
  // One store for this lesson, created once. Real apps create it in store.js
  // and wrap <App /> in <Provider store={store}> in main.jsx.
  const [store] = useState(makeStore);

  return (
    <Provider store={store}>
      <Lesson
        number={40}
        title="Redux Toolkit"
        definition="Redux keeps the whole app's shared state in a single store that changes only by dispatching actions to reducers. Redux Toolkit (RTK) is the official, modern way to write it, with far less boilerplate."
      >
        <Explain title="How it works">
          <p>Redux is the useReducer + context pattern (topic 29), scaled up to a whole app:</p>
          <CodeBlock
            code={`
 component ──dispatch(action)──> store ──reducer(state, action)──> new state
     ^                                                                  │
     └────────── useSelector re-renders components whose slice changed ┘
`}
          />
          <ul>
            <li>
              <strong>Store</strong>: one object holding all shared state, made by{" "}
              <code>configureStore</code>.
            </li>
            <li>
              <strong>Slice</strong>: one feature's state + reducers, made by{" "}
              <code>createSlice</code>, which also generates the action creators.
            </li>
            <li>
              <strong>Action</strong>: <code>{'{ type: "todos/todoAdded", payload: ... }'}</code>,
              a description of what happened.
            </li>
            <li>
              <strong>useSelector / useDispatch</strong>: read state and send actions
              from components.
            </li>
            <li>
              <strong>Thunks</strong> (<code>createAsyncThunk</code>): async logic
              that dispatches pending/fulfilled/rejected actions.
            </li>
          </ul>
          <p>
            <strong>Why still popular:</strong> a predictable structure for large
            teams, every change recorded as an action (Redux DevTools lets you
            "time travel" through them), and it's in a lot of company codebases. For
            server data, RTK also includes <strong>RTK Query</strong>, similar to
            TanStack Query (topic 37).
          </p>
          <CodeBlock code="npm install @reduxjs/toolkit react-redux" />
        </Explain>

        <Example title="1. A slice, a store, and a component" code={counterSliceCode}>
          <ReduxCounter />
          <details>
            <summary>Show store.js</summary>
            <CodeBlock code={storeCode} />
          </details>
          <details>
            <summary>Show ReduxCounter.jsx</summary>
            <CodeBlock code={reduxCounterCode} />
          </details>
        </Example>

        <Example title="2. Todos: Immer, prepare callbacks and selectors" code={todosSliceCode}>
          <ReduxTodos />
          <details>
            <summary>Show ReduxTodos.jsx</summary>
            <CodeBlock code={reduxTodosCode} />
          </details>
        </Example>

        <Example title="3. Async thunks: loading a user" code={userSliceCode}>
          <ReduxUser />
          <details>
            <summary>Show ReduxUser.jsx</summary>
            <CodeBlock code={reduxUserCode} />
          </details>
        </Example>

        <Explain title="Common mistakes" warning>
          <ul>
            <li>
              Writing "classic" Redux (switch statements, action type constants,{" "}
              <code>createStore</code>) from old tutorials. RTK's{" "}
              <code>createSlice</code> and <code>configureStore</code> replace all of it.
            </li>
            <li>
              Mutating state <em>outside</em> createSlice reducers, for example in a
              component. Immer only protects code inside the reducers.
            </li>
            <li>
              In an Immer reducer, BOTH mutating the draft AND returning a new value.
              Do one or the other (todoRemoved returns; todoToggled mutates).
            </li>
            <li>
              Putting every bit of state in Redux. Form inputs and toggles that only
              one component uses belong in useState.
            </li>
            <li>
              Selecting the whole state (<code>{"useSelector(s => s)"}</code>): the
              component re-renders on any change anywhere.
            </li>
          </ul>
        </Explain>
      </Lesson>
    </Provider>
  );
}

export default ReduxLesson;
