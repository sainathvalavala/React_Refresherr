import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import LoginForm from "./LoginForm";
import { fakeLogin } from "./loginApi";
import loginFormCode from "./LoginForm.jsx?raw";
import loginApiCode from "./loginApi.js?raw";
import loginFormTestCode from "./LoginForm.test.jsx?raw";
import useCounterTestCode from "./useCounter.test.js?raw";
import tasksReducerTestCode from "./tasksReducer.test.js?raw";

function TestingDeeperLesson() {
  return (
    <Lesson
      number={41}
      title="Testing, deeper"
      definition="Beyond basic render-and-click tests: simulate real user input with user-event, wait for async UI with findBy, fake the network with MSW, test hooks with renderHook, and unit-test pure logic directly."
    >
      <Explain title="How it works">
        <p>
          <strong>Kinds of tests, from fastest to most realistic:</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>Kind</th>
              <th>Tests</th>
              <th>Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unit</td>
              <td>a pure function: reducer, formatter, validator</td>
              <td>Vitest alone</td>
            </tr>
            <tr>
              <td>Hook</td>
              <td>a custom hook's behavior</td>
              <td>renderHook</td>
            </tr>
            <tr>
              <td>Component / integration</td>
              <td>components + state + (mocked) network, like a user would</td>
              <td>Testing Library + user-event + MSW</td>
            </tr>
            <tr>
              <td>End-to-end (E2E)</td>
              <td>the real app in a real browser</td>
              <td>Playwright, Cypress</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Query priority</strong> (closest to how users and assistive tech
          find things):
        </p>
        <ol>
          <li>
            <code>{'getByRole("button", { name: "Log in" })'}</code>: best, and it
            also checks accessibility
          </li>
          <li>
            <code>getByLabelText("Email")</code>: form fields
          </li>
          <li>
            <code>getByPlaceholderText</code>, <code>getByText</code>,{" "}
            <code>getByDisplayValue</code>
          </li>
          <li>
            <code>getByTestId</code>: last resort (users can't see test ids)
          </li>
        </ol>
        <ul>
          <li>
            <strong>user-event vs fireEvent</strong>: <code>fireEvent.change</code>{" "}
            sets a value in one jump. <code>user.type</code> focuses, then fires
            keydown/keypress/input/keyup per character, like a real user. Prefer
            user-event, and always <code>await</code> it.
          </li>
          <li>
            <strong>Async</strong>: <code>findBy*</code> retries until the element
            appears (default 1 s). <code>{"await waitFor(() => expect(...))"}</code>{" "}
            retries any assertion.
          </li>
          <li>
            <strong>Faking dependencies</strong>: MSW fakes the network; a{" "}
            <code>vi.fn()</code> prop fakes a function; <code>vi.mock("./module")</code>{" "}
            replaces a whole import.
          </li>
        </ul>
        <CodeBlock
          code={`
npm install -D @testing-library/user-event msw
npm test                          # watch mode
npx vitest run                    # once (CI)
npx vitest run src/topics/41-testing-deeper   # just one folder
`}
        />
      </Explain>

      <Example title="The component under test (try it: password is 'react')" code={loginFormCode}>
        <LoginForm login={fakeLogin} />
        <details>
          <summary>Show loginApi.js</summary>
          <CodeBlock code={loginApiCode} />
        </details>
      </Example>

      <Example title="1. user-event + MSW + findBy: LoginForm.test.jsx">
        <CodeBlock code={loginFormTestCode} />
      </Example>

      <Example title="2. renderHook: useCounter.test.js">
        <CodeBlock code={useCounterTestCode} />
      </Example>

      <Example title="3. Pure unit tests: tasksReducer.test.js">
        <CodeBlock code={tasksReducerTestCode} />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Forgetting <code>await</code> before <code>user.type</code> /{" "}
            <code>user.click</code>, so assertions run before the events happen.
          </li>
          <li>
            Using <code>getBy</code> for something that appears after a request. It
            fails immediately; use <code>findBy</code>.
          </li>
          <li>
            Hitting the real network in tests. Tests become slow and flaky. MSW with{" "}
            <code>onUnhandledRequest: "error"</code> catches any request you didn't
            mock.
          </li>
          <li>
            Not resetting MSW handlers between tests (<code>server.resetHandlers()</code>),
            so one test's override leaks into the next.
          </li>
          <li>
            Testing implementation details (state values, internal function names)
            instead of what the user sees. Refactors then break tests for no reason.
          </li>
          <li>
            Chasing 100% coverage. Test the important behavior and the tricky edge
            cases.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default TestingDeeperLesson;
