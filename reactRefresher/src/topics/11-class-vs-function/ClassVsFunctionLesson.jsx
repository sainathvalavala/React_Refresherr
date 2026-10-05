import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ClassCounter from "./ClassCounter";
import FunctionCounter from "./FunctionCounter";
import ClassGreeting from "./ClassGreeting";
import ClassProfile from "./ClassProfile";
import FunctionProfile from "./FunctionProfile";
import classCounterCode from "./ClassCounter.jsx?raw";
import functionCounterCode from "./FunctionCounter.jsx?raw";
import classGreetingCode from "./ClassGreeting.jsx?raw";
import classProfileCode from "./ClassProfile.jsx?raw";
import functionProfileCode from "./FunctionProfile.jsx?raw";

function ClassVsFunctionLesson() {
  return (
    <Lesson
      number={11}
      title="Class based vs functional components"
      definition="Class components are ES6 classes with a render() method and lifecycle methods. Function components are plain functions that use hooks. New code uses function components; you will still meet classes in older codebases."
    >
      <Explain title="How it works">
        <p>
          Before React 16.8 (2019), only class components could have state or
          lifecycle logic. Function components were "dumb" and could only
          display props. <strong>Hooks</strong> gave functions state and
          effects, and since then function components have been the standard.
        </p>
        <ul>
          <li>
            A class extends <code>Component</code> and must have a{" "}
            <code>render()</code> method that returns JSX.
          </li>
          <li>
            Props are on <code>this.props</code>, state is one object on{" "}
            <code>this.state</code>, and updates go through{" "}
            <code>this.setState()</code>.
          </li>
          <li>
            Logic for mount, update and unmount is split across lifecycle
            methods (topic 12), whereas a function keeps related logic
            together in one <code>useEffect</code>.
          </li>
          <li>
            Logic reuse: classes need patterns like higher-order components;
            functions just share a custom hook (topic 19).
          </li>
        </ul>
        <p>
          You still need classes for <strong>error boundaries</strong> (topic
          13), and you'll read them in older code and tutorials.
        </p>
      </Explain>

      <Example title="1. The simplest class component" code={classGreetingCode}>
        <ClassGreeting name="Priya" />
        <ClassGreeting />
      </Example>

      <Example title="2. The same counter, written both ways">
        <div className="grid">
          <ClassCounter label="Class counter" />
          <FunctionCounter label="Function counter" />
        </div>
        <details>
          <summary>Show ClassCounter.jsx</summary>
          <CodeBlock code={classCounterCode} />
        </details>
        <details>
          <summary>Show FunctionCounter.jsx</summary>
          <CodeBlock code={functionCounterCode} />
        </details>
      </Example>

      <Example title="3. setState merges, useState replaces">
        <div className="grid">
          <ClassProfile />
          <FunctionProfile />
        </div>
        <details>
          <summary>Show ClassProfile.jsx</summary>
          <CodeBlock code={classProfileCode} />
        </details>
        <details>
          <summary>Show FunctionProfile.jsx</summary>
          <CodeBlock code={functionProfileCode} />
        </details>
      </Example>

      <Example title="4. The 'this' problem in classes">
        <CodeBlock
          code={`
class Broken extends Component {
  state = { count: 0 };

  // A normal method: when React calls it from onClick, "this" is undefined
  increment() {
    this.setState({ count: this.state.count + 1 }); // TypeError!
  }

  render() {
    return <button onClick={this.increment}>+1</button>;
  }
}

// Fix 1: bind in the constructor
constructor(props) {
  super(props);
  this.increment = this.increment.bind(this);
}

// Fix 2 (modern): an arrow function class field keeps "this"
increment = () => { this.setState({ count: this.state.count + 1 }); };
`}
        />
      </Example>

      <Example title="5. Side by side">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Class</th>
              <th>Function</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Define</td>
              <td>class X extends Component + render()</td>
              <td>function X() {"{ return ... }"}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>this.state + this.setState() (merges)</td>
              <td>useState() (replaces)</td>
            </tr>
            <tr>
              <td>Props</td>
              <td>this.props.label</td>
              <td>function argument ({"{ label }"})</td>
            </tr>
            <tr>
              <td>Default props</td>
              <td>static defaultProps</td>
              <td>destructuring defaults</td>
            </tr>
            <tr>
              <td>Side effects</td>
              <td>lifecycle methods (topic 12)</td>
              <td>useEffect()</td>
            </tr>
            <tr>
              <td>Reuse logic</td>
              <td>higher-order components, render props</td>
              <td>custom hooks</td>
            </tr>
            <tr>
              <td>Only possible here</td>
              <td>error boundaries (topic 13)</td>
              <td>hooks</td>
            </tr>
          </tbody>
        </table>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Forgetting <code>super(props)</code> in a constructor:{" "}
            <code>this</code> can't be used before it.
          </li>
          <li>
            Passing an unbound method to <code>onClick</code>:{" "}
            <code>this</code> is undefined (example 4).
          </li>
          <li>
            Changing state directly: <code>this.state.count = 5</code>. Always
            use <code>this.setState()</code>.
          </li>
          <li>
            Calling hooks inside a class. Hooks only work in function
            components and custom hooks.
          </li>
          <li>
            Expecting <code>useState</code> to merge objects like{" "}
            <code>setState</code> does (example 3).
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ClassVsFunctionLesson;
