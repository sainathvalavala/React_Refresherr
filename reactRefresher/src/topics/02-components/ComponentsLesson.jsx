import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import Greeting from "./Greeting";
import WelcomeBanner from "./WelcomeBanner";
import JsxExpressions from "./JsxExpressions";
import SignupForm from "./SignupForm";
import greetingCode from "./Greeting.jsx?raw";
import welcomeBannerCode from "./WelcomeBanner.jsx?raw";
import jsxExpressionsCode from "./JsxExpressions.jsx?raw";
import signupFormCode from "./SignupForm.jsx?raw";

function ComponentsLesson() {
  return (
    <Lesson
      number={2}
      title="Components"
      definition="A component is a reusable, independent piece of UI: a capitalized JavaScript function that returns JSX."
    >
      <Explain title="How it works">
        <p>
          A React app is a <strong>tree of components</strong>. App is at the
          top and renders other components, which render others, all the way
          down to plain HTML elements like <code>{"<div>"}</code> and{" "}
          <code>{"<button>"}</code>. Splitting the UI this way means each piece
          can be understood, reused and changed on its own.
        </p>
        <p>
          <strong>JSX is not HTML.</strong> It is syntax sugar that Vite turns
          into ordinary function calls. <code>{'<h1 className="title">Hi</h1>'}</code>{" "}
          becomes something like{" "}
          <code>{'jsx("h1", { className: "title", children: "Hi" })'}</code>.
          That is why a component must return <em>one</em> root element (a
          function returns one value) and why attributes follow JavaScript naming.
        </p>
        <p>
          <strong>Components should be pure</strong>: given the same inputs,
          they return the same JSX and don't change anything outside
          themselves while rendering. React may call them many times.
        </p>
        <ul>
          <li>Names start with a capital letter: <code>Greeting</code>, not <code>greeting</code>.</li>
          <li>One component per file, exported with <code>export default</code>.</li>
          <li>Use it like a tag: <code>{"<Greeting />"}</code>.</li>
        </ul>
      </Explain>

      <Example title="1. A simple component" code={greetingCode}>
        <Greeting />
      </Example>

      {/* Reuse: write a component once, render it as many times as needed */}
      <Example title="2. Reusing a component">
        <Greeting />
        <Greeting />
        <Greeting />
      </Example>

      <Example title="3. Composing components" code={welcomeBannerCode}>
        <WelcomeBanner />
      </Example>

      <Example title="4. JSX expressions in {}" code={jsxExpressionsCode}>
        <JsxExpressions />
      </Example>

      <Example title="5. HTML attributes in JSX" code={signupFormCode}>
        <SignupForm />
      </Example>

      <Example title="6. Exporting and importing">
        <CodeBlock
          code={`
// Greeting.jsx: default export (one main thing per file)
function Greeting() { ... }
export default Greeting;

// Any name works when importing a default export
import Greeting from "./Greeting";

// utils.js: named exports (several things per file)
export const PI = 3.14;
export function double(n) { return n * 2; }

// Named imports must use the exact names, inside { }
import { PI, double } from "./utils";
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Lowercase component names: <code>{"<greeting />"}</code> is treated
            as an unknown HTML tag and renders nothing useful.
          </li>
          <li>
            Returning two siblings: <code>{"return <h1/><p/>"}</code> is a syntax
            error. Wrap them in a <code>{"<div>"}</code> or a Fragment{" "}
            <code>{"<>...</>"}</code> (topic 14).
          </li>
          <li>
            Putting the JSX on the line after <code>return</code> without
            parentheses. JavaScript inserts a semicolon after <code>return</code>,
            so the component returns <code>undefined</code>. Always write{" "}
            <code>{"return ("}</code> on the same line.
          </li>
          <li>
            Defining a component <em>inside</em> another component. It is
            recreated on every render, so its state resets each time. Keep
            components at the top level of their own file.
          </li>
          <li>
            Writing <code>if</code> or <code>for</code> inside <code>{"{}"}</code>.
            Only expressions are allowed there. Use a ternary, <code>&&</code>{" "}
            or <code>.map()</code> instead.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ComponentsLesson;
