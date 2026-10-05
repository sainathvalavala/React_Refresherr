import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ModalDemo from "./ModalDemo";
import ClippingDemo from "./ClippingDemo";
import BubblingDemo from "./BubblingDemo";
import modalCode from "./Modal.jsx?raw";
import modalDemoCode from "./ModalDemo.jsx?raw";
import clippingDemoCode from "./ClippingDemo.jsx?raw";
import bubblingDemoCode from "./BubblingDemo.jsx?raw";

function PortalsLesson() {
  return (
    <Lesson
      number={32}
      title="Portals"
      definition="A portal renders a component's DOM output into a different DOM node, such as document.body, while it stays in the same place in the React tree."
    >
      <Explain title="How it works">
        <CodeBlock
          code={`
import { createPortal } from "react-dom";

return createPortal(<div className="modal">...</div>, document.body);
//                  ^ what to render              ^ where in the DOM
`}
        />
        <p>
          Normally a component's HTML lands inside its parent's HTML. That's a
          problem for UI that must sit <strong>on top of everything</strong>:
          modals, tooltips, dropdowns, toasts. A parent's{" "}
          <code>overflow: hidden</code>, <code>z-index</code> or{" "}
          <code>transform</code> can clip or bury them.
        </p>
        <p>A portal moves only the DOM output. Everything React-related stays put:</p>
        <ul>
          <li>props and state flow exactly as before</li>
          <li>context from providers above still works</li>
          <li>events bubble to the React parent (example 3)</li>
        </ul>
      </Explain>

      <Example title="1. A modal dialog" code={modalCode}>
        <ModalDemo />
        <details>
          <summary>Show ModalDemo.jsx</summary>
          <CodeBlock code={modalDemoCode} />
        </details>
      </Example>

      <Example title="2. Inline vs portal: escaping a clipping parent" code={clippingDemoCode}>
        <ClippingDemo />
      </Example>

      <Example title="3. Events bubble through the React tree" code={bubblingDemoCode}>
        <BubblingDemo />
        <p className="hint">
          Click the purple button at the bottom right of the page: the count
          here goes up, even though the button isn't inside this box in the DOM.
        </p>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Using a portal and forgetting <code>position: fixed</code> plus a
            high <code>z-index</code>. A portal moves the element; CSS still
            decides where it appears.
          </li>
          <li>
            Being surprised that a click in a portal triggers a parent's{" "}
            <code>onClick</code>. Call <code>e.stopPropagation()</code> if you
            don't want that.
          </li>
          <li>
            Skipping accessibility: modals need <code>role="dialog"</code>, a
            label, Escape to close, and focus moved inside. Or use the native{" "}
            <code>{"<dialog>"}</code> element, or a library like Radix.
          </li>
          <li>
            Rendering to a node that doesn't exist yet (e.g. a{" "}
            <code>#modal-root</code> that isn't in index.html):{" "}
            <code>createPortal</code> throws.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default PortalsLesson;
