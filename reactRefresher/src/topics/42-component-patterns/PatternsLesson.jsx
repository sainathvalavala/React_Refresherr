import { useState } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import Tabs from "./Tabs";
import Toggle from "./Toggle";
import HocDemo from "./HocDemo";
import StarRating from "./StarRating";
import tabsCode from "./Tabs.jsx?raw";
import tabCode from "./Tab.jsx?raw";
import tabPanelCode from "./TabPanel.jsx?raw";
import toggleCode from "./Toggle.jsx?raw";
import hocDemoCode from "./HocDemo.jsx?raw";
import starRatingCode from "./StarRating.jsx?raw";

function PatternsLesson() {
  const [rating, setRating] = useState(4);

  return (
    <Lesson
      number={42}
      title="Component patterns"
      definition="Component patterns are reusable ways of structuring components so they're flexible to use: compound components, render props, higher-order components, and controlled or uncontrolled APIs."
    >
      <Explain title="How it works">
        <table>
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Idea</th>
              <th>Seen in</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Compound components</td>
              <td>a parent + parts sharing state through context</td>
              <td>Radix, Headless UI, shadcn/ui (Tabs, Menu, Accordion)</td>
            </tr>
            <tr>
              <td>Render props</td>
              <td>pass a function that decides what to render</td>
              <td>older libraries; Formik, React Router's old Route render</td>
            </tr>
            <tr>
              <td>Higher-order component</td>
              <td>a function that wraps a component with extra behavior</td>
              <td>old Redux connect(), withRouter(), withStyles()</td>
            </tr>
            <tr>
              <td>Controlled / uncontrolled</td>
              <td>support both value+onChange and defaultValue</td>
              <td>every input, select and most UI-library components</td>
            </tr>
            <tr>
              <td>Custom hooks (topic 19)</td>
              <td>share logic as a function</td>
              <td>the modern replacement for most render props and HOCs</td>
            </tr>
          </tbody>
        </table>
        <p>
          Composition with <code>children</code> (topic 8) and custom hooks cover
          most needs. These patterns matter when you build <strong>reusable
          components</strong> for others, and when you read library code.
        </p>
      </Explain>

      <Example title="1. Compound components: Tabs" code={tabsCode}>
        <Tabs defaultValue="html">
          <div className="row" role="tablist">
            <Tabs.Tab value="html">HTML</Tabs.Tab>
            <Tabs.Tab value="css">CSS</Tabs.Tab>
            <Tabs.Tab value="js">JavaScript</Tabs.Tab>
          </div>
          <Tabs.Panel value="html">
            <p>HTML gives the page its structure.</p>
          </Tabs.Panel>
          <Tabs.Panel value="css">
            <p>CSS makes it look good.</p>
          </Tabs.Panel>
          <Tabs.Panel value="js">
            <p>JavaScript makes it interactive.</p>
          </Tabs.Panel>
        </Tabs>
        <details>
          <summary>Show Tab.jsx</summary>
          <CodeBlock code={tabCode} />
        </details>
        <details>
          <summary>Show TabPanel.jsx</summary>
          <CodeBlock code={tabPanelCode} />
        </details>
      </Example>

      <Example title="2. Render props: children as a function" code={toggleCode}>
        <div className="row">
          <Toggle>{({ on, toggle }) => <button onClick={toggle}>{on ? "💡 Light ON" : "Light off"}</button>}</Toggle>
          <Toggle initial>
            {({ on, toggle }) => (
              <label className="row">
                <input type="checkbox" checked={on} onChange={toggle} /> Same logic, different UI ({on ? "on" : "off"})
              </label>
            )}
          </Toggle>
        </div>
      </Example>

      <Example title="3. Higher-order component" code={hocDemoCode}>
        <HocDemo />
      </Example>

      <Example title="4. Controlled or uncontrolled, like a native input" code={starRatingCode}>
        <div className="grid">
          <div className="stack">
            <strong>Uncontrolled (defaultValue=2)</strong>
            <StarRating defaultValue={2} />
          </div>
          <div className="stack">
            <strong>Controlled (parent state: {rating})</strong>
            <StarRating value={rating} onChange={setRating} />
            <div className="row">
              <button onClick={() => setRating(0)}>Clear from parent</button>
            </div>
          </div>
        </div>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Using a compound part outside its parent (<code>{"<Tabs.Tab>"}</code>{" "}
            without <code>{"<Tabs>"}</code>): the context is null and it crashes.
            Throw a clear error in a custom hook (as useCart does, topic 22).
          </li>
          <li>
            Creating HOC-wrapped components inside render. That's a new component
            type every render, so state resets (topic 35).
          </li>
          <li>
            HOCs that don't pass through the other props (<code>{"{...props}"}</code>),
            so the wrapped component silently loses them.
          </li>
          <li>
            Switching a component between controlled and uncontrolled during its
            lifetime (value starts undefined, then becomes a number).
          </li>
          <li>
            Reaching for render props or HOCs in new code when a custom hook would
            be simpler.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default PatternsLesson;
