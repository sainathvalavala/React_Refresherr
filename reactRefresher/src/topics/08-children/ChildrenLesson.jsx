import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import Card from "./Card";
import FancyButton from "./FancyButton";
import Panel from "./Panel";
import Collapsible from "./Collapsible";
import Greeting from "../02-components/Greeting";
import cardCode from "./Card.jsx?raw";
import fancyButtonCode from "./FancyButton.jsx?raw";
import panelCode from "./Panel.jsx?raw";
import collapsibleCode from "./Collapsible.jsx?raw";

function ChildrenLesson() {
  return (
    <Lesson
      number={8}
      title="children"
      definition="children is a special prop that holds the content nested between a component's tags. It lets you build wrapper components such as cards, modals and layouts."
    >
      <Explain title="How it works">
        <p>
          Whatever you write between the opening and closing tags is passed to
          the component as <code>props.children</code>. These two lines are
          identical:
        </p>
        <CodeBlock
          code={`
<Card title="Hi"><p>Hello</p></Card>
<Card title="Hi" children={<p>Hello</p>} />
`}
        />
        <ul>
          <li>
            children can be <strong>anything renderable</strong>: text, an
            element, several elements (an array), other components, or
            nothing (<code>undefined</code> when the tag is self-closing).
          </li>
          <li>
            The wrapper decides <strong>where</strong> (and whether) the
            children appear by placing <code>{"{children}"}</code> in its JSX.
          </li>
          <li>
            This is <strong>composition</strong>: build big UIs by nesting
            small generic pieces, instead of making one component with dozens
            of options. It also helps avoid prop drilling (topic 21).
          </li>
        </ul>
      </Explain>

      {/* The same Card wraps completely different content */}
      <Example title="1. One wrapper, any content" code={cardCode}>
        <div className="grid">
          <Card title="Text">Just a plain sentence.</Card>
          <Card title="Elements">
            <ul>
              <li>HTML elements</li>
              <li>work too</li>
            </ul>
          </Card>
          <Card title="Components">
            <Greeting />
          </Card>
        </div>
      </Example>

      <Example title="2. children as a label" code={fancyButtonCode}>
        <div className="row">
          <FancyButton onClick={() => alert("Saved!")}>Save</FancyButton>
          <FancyButton disabled>Disabled</FancyButton>
          <FancyButton>
            <strong>Bold</strong> label
          </FancyButton>
        </div>
      </Example>

      <Example title="3. Several slots: header, body, footer" code={panelCode}>
        <Panel
          header={<strong>Order #1024</strong>}
          footer={<button onClick={() => alert("Paid")}>Pay now</button>}
        >
          <p>2 x Notebook</p>
          <p>1 x Gel pen</p>
        </Panel>
        <Panel header={<strong>No footer this time</strong>}>
          <p>The footer slot is optional.</p>
        </Panel>
      </Example>

      <Example title="4. A wrapper with its own state" code={collapsibleCode}>
        <Collapsible title="What is JSX?">
          <p>HTML-like syntax that compiles to JavaScript function calls.</p>
        </Collapsible>
        <Collapsible title="What are props?">
          <p>Read-only inputs passed from a parent component.</p>
        </Collapsible>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Forgetting to render <code>{"{children}"}</code> in the wrapper. The
            nested content silently disappears.
          </li>
          <li>
            Misspelling it as <code>child</code> or <code>Children</code>. It is
            always lowercase <code>children</code>.
          </li>
          <li>
            Using a self-closing tag <code>{"<Card />"}</code> and then
            wondering why <code>children</code> is <code>undefined</code>.
          </li>
          <li>
            Passing the same content both ways (a <code>children</code>{" "}
            attribute <em>and</em> nested content). The nested content wins.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ChildrenLesson;
