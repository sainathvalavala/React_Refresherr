import { Fragment } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import TableColumns from "./TableColumns";
import NameFields from "./NameFields";
import ShowMore from "./ShowMore";
import tableColumnsCode from "./TableColumns.jsx?raw";
import nameFieldsCode from "./NameFields.jsx?raw";
import showMoreCode from "./ShowMore.jsx?raw";

const terms = [
  { id: 1, word: "JSX", meaning: "HTML-like syntax for describing UI" },
  { id: 2, word: "Props", meaning: "Inputs passed from parent to child" },
  { id: 3, word: "State", meaning: "Data a component remembers and can change" },
];

function FragmentLesson() {
  return (
    <Lesson
      number={14}
      title="Fragment"
      definition="A Fragment groups several elements without adding an extra node to the DOM. A component must return one parent, and a Fragment lets that parent be invisible."
    >
      <Explain title="How it works">
        <p>
          JSX compiles to a function call, and a function can return only{" "}
          <strong>one value</strong>, so a component can't return two
          siblings. Wrapping them in a <code>{"<div>"}</code> works, but adds
          a real element to the page ("div soup"). That extra element can:
        </p>
        <ul>
          <li>
            produce invalid HTML: a <code>{"<div>"}</code> inside{" "}
            <code>{"<tr>"}</code>, <code>{"<ul>"}</code> or{" "}
            <code>{"<dl>"}</code> is not allowed
          </li>
          <li>break flexbox or grid layouts, which style only direct children</li>
          <li>clutter the DOM and break CSS selectors like <code>ul &gt; li</code></li>
        </ul>
        <p>
          A Fragment groups the children for React, and then{" "}
          <strong>disappears</strong>: nothing appears in the DOM.
        </p>
        <CodeBlock
          code={`
import { Fragment } from "react";

<>...</>                          // short syntax: no props allowed
<Fragment>...</Fragment>          // long syntax: same thing
<Fragment key={id}>...</Fragment> // the long form can take a key (in lists)
`}
        />
      </Explain>

      <Example title="1. Short syntax <>...</> inside a table" code={tableColumnsCode}>
        <table>
          <tbody>
            <tr>
              <TableColumns name="Arun" score={90} />
            </tr>
            <tr>
              <TableColumns name="Priya" score={85} />
            </tr>
          </tbody>
        </table>
      </Example>

      <Example title="2. Fragment vs div in a CSS grid" code={nameFieldsCode}>
        <div className="grid">
          <div>
            <strong>Fragment</strong>
            <div className="form-grid">
              <NameFields wrapper="fragment" />
              <NameFields wrapper="fragment" />
            </div>
          </div>
          <div>
            <strong>div wrapper (broken)</strong>
            <div className="form-grid">
              <NameFields wrapper="div" />
              <NameFields wrapper="div" />
            </div>
          </div>
        </div>
      </Example>

      {/* The short syntax can't take props. In a list you need a key, so write <Fragment key> */}
      <Example title="3. <Fragment key> in a list">
        <dl>
          {terms.map((term) => (
            <Fragment key={term.id}>
              <dt>
                <strong>{term.word}</strong>
              </dt>
              <dd>{term.meaning}</dd>
            </Fragment>
          ))}
        </dl>
        <CodeBlock
          code={`
{terms.map((term) => (
  <Fragment key={term.id}>
    <dt>{term.word}</dt>
    <dd>{term.meaning}</dd>
  </Fragment>
))}
`}
        />
      </Example>

      <Example title="4. Grouping elements for a condition" code={showMoreCode}>
        <ShowMore />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            <code>{"<key={id}>"}</code> is not valid. The short syntax can't take
            a key. Import <code>Fragment</code> and use the long form.
          </li>
          <li>
            Trying to style a Fragment (<code>{'<Fragment className="x">'}</code>).
            It isn't an element, so if you need a class or style, use a real{" "}
            <code>{"<div>"}</code>.
          </li>
          <li>
            Reaching for a <code>{"<div>"}</code> by habit inside tables, lists and
            grid or flex parents, where it breaks the HTML or the layout.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default FragmentLesson;
