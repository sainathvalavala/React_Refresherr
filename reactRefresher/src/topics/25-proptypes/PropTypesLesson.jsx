import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import PropTypesPlayground from "./PropTypesPlayground";
import userProfileCode from "./UserProfile.jsx?raw";
import playgroundCode from "./PropTypesPlayground.jsx?raw";

function PropTypesLesson() {
  return (
    <Lesson
      number={25}
      title="PropTypes in depth"
      definition="PropTypes is a library for declaring the expected type of each prop. In development it prints a console warning when a component receives a prop of the wrong type or is missing a required one."
    >
      <Explain title="How it works">
        <p>
          JavaScript doesn't check types, so <code>{'<Student age="25" />'}</code>{" "}
          silently passes a string. PropTypes adds a <strong>runtime check</strong>:
          you attach a <code>propTypes</code> object to the component, and in
          development a check runs on every render, warning about mismatches.
          Warnings never stop rendering. The component runs with the wrong
          props anyway, and in production the checks are skipped entirely.
        </p>
        <p>
          <strong>React 19 change:</strong> React no longer runs{" "}
          <code>propTypes</code> by itself, so in this project they are
          documentation only. The playground below calls the checker manually so
          you can still see the warnings. The modern replacement is{" "}
          <strong>TypeScript</strong> (topic 26), which catches these mistakes in
          your editor before the code even runs.
        </p>
        <table>
          <thead>
            <tr>
              <th>Validator</th>
              <th>Accepts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>string, number, bool, func, object, array, symbol, bigint</td>
              <td>that JavaScript type</td>
            </tr>
            <tr>
              <td>node</td>
              <td>anything renderable: text, numbers, elements, arrays of them</td>
            </tr>
            <tr>
              <td>element / elementType</td>
              <td>
                one React element (<code>{"<Icon />"}</code>) / a component itself (
                <code>Icon</code>)
              </td>
            </tr>
            <tr>
              <td>oneOf([...])</td>
              <td>one of these exact values</td>
            </tr>
            <tr>
              <td>oneOfType([...])</td>
              <td>any of these types</td>
            </tr>
            <tr>
              <td>arrayOf(type) / objectOf(type)</td>
              <td>an array / object whose values are all that type</td>
            </tr>
            <tr>
              <td>shape({"{...}"}) / exact({"{...}"})</td>
              <td>an object with these keys (exact: and no others)</td>
            </tr>
            <tr>
              <td>instanceOf(Class)</td>
              <td>an instance of a class, e.g. Date</td>
            </tr>
            <tr>
              <td>.isRequired</td>
              <td>added to any of the above: warns if missing</td>
            </tr>
            <tr>
              <td>custom function</td>
              <td>your own rule; return an Error to fail</td>
            </tr>
          </tbody>
        </table>
      </Explain>

      <Example title="1. A full PropTypes specification" code={userProfileCode}>
        <p>
          <code>UserProfile</code> uses almost every validator. Open "Show code"
          to read the spec.
        </p>
      </Example>

      <Example title="2. Playground: see the warnings" code={playgroundCode}>
        <PropTypesPlayground />
        <p className="hint">
          "Wrong types" shows the key lesson: PropTypes warns, but the
          component still crashes on <code>tags.join</code>. Warnings are not
          protection.
        </p>
      </Example>

      <Example title="3. The same contract in TypeScript">
        <CodeBlock
          code={`
// TypeScript checks this at compile time, in your editor, with zero runtime cost
type Address = { city: string; pin?: string };

type UserProfileProps = {
  name: string;                            // required by default
  age?: number;                            // ? = optional
  role?: "admin" | "member" | "guest";     // oneOf
  tags?: string[];                         // arrayOf(string)
  address?: Address;                       // shape
  id?: string | number;                    // oneOfType
  onContact?: (email: string) => void;     // func, with its argument types
  children?: React.ReactNode;              // node
};

function UserProfile({ name, role = "member" }: UserProfileProps) { ... }

<UserProfile name={42} />  // ❌ red squiggle: number is not assignable to string
`}
        />
      </Example>

      <Explain title="When PropTypes is still worth it">
        <ul>
          <li>Plain-JavaScript projects that won't adopt TypeScript: it's living documentation.</li>
          <li>Projects on React 18 or older, where the warnings do appear automatically.</li>
          <li>Published component libraries used by JavaScript apps.</li>
        </ul>
      </Explain>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Writing <code>propTypes</code> wrong. The property on the component
            is lowercase <code>propTypes</code>; the import is{" "}
            <code>PropTypes</code>.
          </li>
          <li>
            Expecting warnings in React 19. They don't appear unless you call
            the checker yourself.
          </li>
          <li>
            Treating warnings as validation of user input. They're for
            developers and are removed in production. Validate real data
            separately.
          </li>
          <li>
            <code>PropTypes.array</code> / <code>PropTypes.object</code>{" "}
            everywhere. They say almost nothing; prefer <code>arrayOf</code> and{" "}
            <code>shape</code>.
          </li>
          <li>
            Using <code>defaultProps</code> for defaults. React 19 removed it
            for function components; use destructuring defaults.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default PropTypesLesson;
