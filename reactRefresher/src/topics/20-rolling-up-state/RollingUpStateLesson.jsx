import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import RenderStamp from "../../components/RenderStamp";
import SharedCounter from "./SharedCounter";
import TemperatureConverter from "./TemperatureConverter";
import Accordion from "./Accordion";
import TypingStateTooHigh from "./TypingStateTooHigh";
import TypingStateMovedDown from "./TypingStateMovedDown";
import ColorFrame from "./ColorFrame";
import sharedCounterCode from "./SharedCounter.jsx?raw";
import temperatureConverterCode from "./TemperatureConverter.jsx?raw";
import temperatureInputCode from "./TemperatureInput.jsx?raw";
import accordionCode from "./Accordion.jsx?raw";
import accordionPanelCode from "./AccordionPanel.jsx?raw";
import typingStateTooHighCode from "./TypingStateTooHigh.jsx?raw";
import typingStateMovedDownCode from "./TypingStateMovedDown.jsx?raw";
import colorFrameCode from "./ColorFrame.jsx?raw";

function RollingUpStateLesson() {
  return (
    <Lesson
      number={20}
      title="Rolling up the state, unoptimal re-renders"
      definition="Rolling up (lifting) state means moving it to the closest common parent of the components that share it. Lift it only as high as needed: state placed too high re-renders components that don't use it."
    >
      <Explain title="How it works">
        <p>
          Data only flows <strong>down</strong> in React. Siblings can't read
          each other's state. When two components need the same data:
        </p>
        <ol>
          <li>Remove the state from the children.</li>
          <li>
            Put it in their <strong>closest common parent</strong>.
          </li>
          <li>
            Pass the <strong>value</strong> down as a prop and a{" "}
            <strong>function to change it</strong> (setter or handler) down as
            another prop.
          </li>
        </ol>
        <p>
          The children become <strong>controlled</strong> components: the
          parent is the <em>single source of truth</em>, so they can never
          disagree. ("Data down, events up.")
        </p>
        <p>
          <strong>The cost:</strong> a state change re-renders the component
          that owns it <em>and everything below</em>. Lift state too high (say,
          to App) and a keystroke re-renders the whole app. So:
        </p>
        <ul>
          <li>
            <strong>Colocate</strong>: keep state as low as possible, in the
            lowest component that covers everyone who needs it.
          </li>
          <li>
            <strong>Move state down</strong> into a small component when only
            it uses the state (example 4).
          </li>
          <li>
            <strong>Pass unrelated parts as children</strong>: the stateful
            wrapper won't re-render elements its parent created (example 5).
          </li>
          <li>
            <code>memo()</code> (topic 4) as a last resort for expensive children.
          </li>
        </ul>
      </Explain>

      <Example title="1. Lifting state to share it between siblings" code={sharedCounterCode}>
        <SharedCounter />
      </Example>

      <Example title="2. Two inputs, one source of truth" code={temperatureConverterCode}>
        <TemperatureConverter />
        <details>
          <summary>Show TemperatureInput.jsx (controlled child)</summary>
          <CodeBlock code={temperatureInputCode} />
        </details>
      </Example>

      <Example title="3. Coordinating siblings: only one panel open" code={accordionCode}>
        <Accordion />
        <details>
          <summary>Show AccordionPanel.jsx</summary>
          <CodeBlock code={accordionPanelCode} />
        </details>
      </Example>

      <Example title="4. Fix: state too high vs state moved down">
        <div className="grid">
          <div>
            <p>
              <strong>Too high</strong>: sidebar re-renders on every key
            </p>
            <TypingStateTooHigh />
          </div>
          <div>
            <p>
              <strong>Moved down</strong>: sidebar never re-renders
            </p>
            <TypingStateMovedDown />
          </div>
        </div>
        <details>
          <summary>Show TypingStateTooHigh.jsx</summary>
          <CodeBlock code={typingStateTooHighCode} />
        </details>
        <details>
          <summary>Show TypingStateMovedDown.jsx</summary>
          <CodeBlock code={typingStateMovedDownCode} />
        </details>
      </Example>

      <Example title="5. Fix: pass the unrelated part as children" code={colorFrameCode}>
        <ColorFrame>
          <RenderStamp label="Passed in as children" />
        </ColorFrame>
        <p className="hint">
          Change the color: the frame re-renders, but the timestamp inside
          doesn't change.
        </p>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Keeping a copy of the same data in two siblings and trying to sync
            them with effects. Lift it to one place instead.
          </li>
          <li>
            Lifting everything to App "just in case". Every keystroke then
            re-renders the whole tree.
          </li>
          <li>
            Copying a prop into the child's own state (
            <code>useState(props.value)</code>). The child stops following the
            parent. A controlled child should read the prop directly.
          </li>
          <li>
            Passing the setter but forgetting the value, or the other way
            round. A controlled child needs both.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default RollingUpStateLesson;
