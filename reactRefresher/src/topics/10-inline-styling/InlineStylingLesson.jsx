import { useState } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ProgressBar from "./ProgressBar";
import Alert from "./Alert";
import HoverBoxes from "./HoverBoxes";
import progressBarCode from "./ProgressBar.jsx?raw";
import alertCode from "./Alert.jsx?raw";
import alertCssCode from "./Alert.module.css?raw";
import hoverBoxesCode from "./HoverBoxes.jsx?raw";

// A style object can live in a variable and be reused.
// CSS property names become camelCase: background-color -> backgroundColor.
// Plain numbers mean pixels: padding: 12 is the same as padding: "12px".
const boxStyle = {
  padding: 12,
  borderRadius: 8,
  border: "2px dashed var(--accent)",
  backgroundColor: "var(--accent-bg)",
};

function InlineStylingLesson() {
  const [isActive, setIsActive] = useState(false);
  const [percent, setPercent] = useState(30);

  return (
    <Lesson
      number={10}
      title="Inline styling"
      definition="Inline styles are passed to the style prop as a JavaScript object, not a string. They suit dynamic values; for everything else, CSS classes (className) are usually cleaner."
    >
      <Explain title="How it works">
        <CodeBlock
          code={`
<!-- HTML -->
<p style="background-color: red; font-size: 20px">Hi</p>

// JSX: an object, camelCase keys, values are strings or numbers
<p style={{ backgroundColor: "red", fontSize: 20 }}>Hi</p>
`}
        />
        <ul>
          <li>
            <strong>Double braces</strong>: the outer <code>{"{}"}</code> means
            "JavaScript here", the inner <code>{"{}"}</code> is the object itself.
          </li>
          <li>
            <strong>camelCase keys</strong>: <code>font-size</code> becomes{" "}
            <code>fontSize</code>, <code>z-index</code> becomes{" "}
            <code>zIndex</code>. Vendor prefixes start with a capital:{" "}
            <code>WebkitTransition</code>.
          </li>
          <li>
            <strong>Numbers become px</strong> (<code>width: 100</code> is
            100px). A few properties are unitless and stay plain numbers:{" "}
            <code>opacity</code>, <code>zIndex</code>, <code>flex</code>,{" "}
            <code>fontWeight</code>, <code>lineHeight</code>. For any other unit
            (%, rem, vh) use a string: <code>{'width: "50%"'}</code>.
          </li>
          <li>
            <strong>Limits</strong>: no <code>:hover</code>, <code>:focus</code>,
            pseudo-elements, media queries or animations with keyframes.
          </li>
        </ul>
        <p>Ways to style React, from simplest to most structured:</p>
        <table>
          <thead>
            <tr>
              <th>Approach</th>
              <th>Good for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Inline <code>style</code>
              </td>
              <td>Values computed at runtime (widths, colors from data)</td>
            </tr>
            <tr>
              <td>
                CSS file + <code>className</code>
              </td>
              <td>Most styling; full CSS power (this app's App.css)</td>
            </tr>
            <tr>
              <td>CSS Modules</td>
              <td>CSS scoped to one component, so names never clash</td>
            </tr>
            <tr>
              <td>Tailwind / CSS-in-JS libraries</td>
              <td>Larger projects and teams (need extra setup)</td>
            </tr>
          </tbody>
        </table>
      </Explain>

      {/* Double braces: the outer {} enters JavaScript, the inner {} is the object */}
      <Example title="1. Style object written inline">
        <p style={{ color: "tomato", fontWeight: "bold", fontSize: 20 }}>
          This text is styled inline.
        </p>
        <CodeBlock code={`<p style={{ color: "tomato", fontWeight: "bold", fontSize: 20 }}>`} />
      </Example>

      <Example title="2. Style object stored in a variable">
        <div style={boxStyle}>This box uses the boxStyle variable.</div>
        <CodeBlock
          code={`
const boxStyle = { padding: 12, borderRadius: 8, border: "2px dashed var(--accent)" };
<div style={boxStyle}>...</div>
`}
        />
      </Example>

      {/* Dynamic styles: values computed from state, which CSS files can't do directly */}
      <Example title="3. Styles that depend on state (merging objects)">
        <div
          style={{
            ...boxStyle,
            backgroundColor: isActive ? "seagreen" : "gray",
            color: "white",
            transform: isActive ? "scale(1.03)" : "none",
            transition: "all 0.2s",
          }}
        >
          {isActive ? "Active" : "Inactive"}
        </div>
        <div className="row">
          <button onClick={() => setIsActive(!isActive)}>Toggle</button>
        </div>
        <CodeBlock
          code={`
// ...boxStyle copies the base styles; later keys override earlier ones
style={{ ...boxStyle, backgroundColor: isActive ? "seagreen" : "gray" }}
`}
        />
      </Example>

      <Example title="4. A value from props: progress bar" code={progressBarCode}>
        <ProgressBar percent={percent} />
        <label className="row">
          {percent}%
          <input
            type="range"
            min="0"
            max="100"
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
          />
        </label>
      </Example>

      <Example title="5. CSS Modules (scoped class names)" code={alertCode}>
        <Alert type="info">Info: CSS Modules keep class names local.</Alert>
        <Alert type="success">Success: the style comes from Alert.module.css.</Alert>
        <Alert type="danger">Danger: styles[type] picks the class.</Alert>
        <details>
          <summary>Show Alert.module.css</summary>
          <CodeBlock code={alertCssCode} />
        </details>
      </Example>

      <Example title="6. :hover needs CSS" code={hoverBoxesCode}>
        <HoverBoxes />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            <code>{'style="color: red"'}</code>: a string is an error in React.
            It must be an object.
          </li>
          <li>
            Kebab-case keys: <code>{'{ "font-size": 20 }'}</code> doesn't work.
            Use <code>fontSize</code>.
          </li>
          <li>
            <code>width: 50</code> when you meant 50%. Numbers are px; write{" "}
            <code>{'"50%"'}</code>.
          </li>
          <li>
            Putting all styling inline. It can't do hover or responsive
            layouts, and it clutters the JSX. Use classes for static styles.
          </li>
          <li>
            Writing <code>class=</code> instead of <code>className=</code> when
            switching to CSS classes.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default InlineStylingLesson;
