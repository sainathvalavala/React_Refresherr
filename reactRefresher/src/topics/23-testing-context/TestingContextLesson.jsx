import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ThemeProvider from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
// "?raw" is a Vite feature: it imports a file's text as a string instead of
// running it, so the lesson can show the real test files below.
import themeTestSource from "./ThemeToggle.test.jsx?raw";
import cartTestSource from "./Cart.test.jsx?raw";
import themeProviderCode from "./ThemeProvider.jsx?raw";
import themeToggleCode from "./ThemeToggle.jsx?raw";

function TestingContextLesson() {
  return (
    <Lesson
      number={23}
      title="Testing the context API"
      definition="To test a component that uses context, render it inside a provider in the test, either the real provider or a context with hand-made test values, and then check what appears on screen."
    >
      <Explain title="How it works">
        <p>
          A component that calls <code>useContext</code> depends on whatever
          provider is above it. In a test there is no app around it, so{" "}
          <strong>the test must supply the provider</strong>. There are three
          ways, each testing something different:
        </p>
        <table>
          <thead>
            <tr>
              <th>Render with...</th>
              <th>Tests</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No provider</td>
              <td>The createContext default value (or that your hook throws)</td>
            </tr>
            <tr>
              <td>The real provider</td>
              <td>The whole feature: component + provider state working together</td>
            </tr>
            <tr>
              <td>
                <code>{"<Ctx value={fake}>"}</code> with <code>vi.fn()</code>
              </td>
              <td>The component alone: does it show the value and call the functions?</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Test like a user.</strong> React Testing Library doesn't let
          you read state. You find elements by what a user sees (text, labels,
          roles), interact with them, and check the screen. So tests survive
          refactors of the internals.
        </p>
        <p>Every test follows the same three steps: Arrange, Act, Assert.</p>
        <CodeBlock
          code={`
it("toggles the theme", () => {
  render(<ThemeProvider><ThemeToggle /></ThemeProvider>); // Arrange
  fireEvent.click(screen.getByText("Toggle theme"));     // Act
  expect(screen.getByText("Current theme: dark")).toBeTruthy(); // Assert
});
`}
        />
      </Explain>

      <Example title="The component being tested" code={themeToggleCode}>
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
        <details>
          <summary>Show ThemeProvider.jsx</summary>
          <CodeBlock code={themeProviderCode} />
        </details>
      </Example>

      <Example title="Tools and queries">
        <ul>
          <li>
            <strong>Vitest</strong>: the test runner (<code>describe</code>,{" "}
            <code>it</code>, <code>expect</code>, <code>vi.fn</code> for mock
            functions, <code>vi.spyOn</code>).
          </li>
          <li>
            <strong>React Testing Library</strong>: <code>render</code>,{" "}
            <code>screen</code> queries, and <code>fireEvent</code> to click and type.
          </li>
          <li>
            <strong>jsdom</strong>: a fake browser so tests run in Node, set
            in <code>vite.config.js</code>.
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Query</th>
              <th>If not found</th>
              <th>Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>getByText / getByRole / getByLabelText</td>
              <td>throws</td>
              <td>something that should be there now</td>
            </tr>
            <tr>
              <td>queryByText</td>
              <td>returns null</td>
              <td>
                checking something is <em>not</em> there
              </td>
            </tr>
            <tr>
              <td>findByText</td>
              <td>waits, then throws</td>
              <td>something that appears later (after a fetch)</td>
            </tr>
            <tr>
              <td>getAllByText</td>
              <td>throws</td>
              <td>several matches, returned as an array</td>
            </tr>
          </tbody>
        </table>
        <CodeBlock code={"npm test        # watch mode: re-runs when you save\nnpx vitest run  # run once"} />
      </Example>

      <Example title="1. ThemeToggle.test.jsx: default, real provider, helper, mock value">
        <CodeBlock code={themeTestSource} />
      </Example>

      <Example title="2. Cart.test.jsx: testing a provider + custom hook (topic 22)">
        <CodeBlock code={cartTestSource} />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Rendering a context consumer without a provider and being surprised
            that it shows default values.
          </li>
          <li>
            Using <code>getByText</code> to check that something is gone. It
            throws before <code>expect</code> runs. Use{" "}
            <code>queryByText(...)</code> + <code>toBeNull()</code>.
          </li>
          <li>
            Testing implementation details (calling the provider's internal
            functions or reading its state). Test what the user sees.
          </li>
          <li>
            Repeating the same provider wrapper in every test. Write a helper
            like <code>renderWithTheme</code>.
          </li>
          <li>
            Forgetting that the test name should describe behavior: "adds items
            and totals the price", not "test 1".
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default TestingContextLesson;
