import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import PositionDemo from "./PositionDemo";
import ChatDemo from "./ChatDemo";
import ResettableForm from "./ResettableForm";
import positionDemoCode from "./PositionDemo.jsx?raw";
import chatDemoCode from "./ChatDemo.jsx?raw";
import chatBoxCode from "./ChatBox.jsx?raw";
import resettableFormCode from "./ResettableForm.jsx?raw";

function KeysIdentityLesson() {
  return (
    <Lesson
      number={35}
      title="Keys and component identity"
      definition="React decides whether to keep or reset a component's state by its identity: its type, its position in the tree, and its key. Change any of them and React treats it as a brand new component."
    >
      <Explain title="How it works">
        <p>
          State doesn't live "inside" your function. React stores it in the tree,
          at the spot where the component is rendered. On each render React
          compares the new tree with the old one, slot by slot:
        </p>
        <ul>
          <li>
            <strong>Same type at the same position</strong>: it's the same
            component. React keeps its state and just passes the new props.
          </li>
          <li>
            <strong>Different type at that position</strong> (TallyCounter becomes
            a <code>{"<p>"}</code>, or a <code>{"<div>"}</code> becomes a{" "}
            <code>{"<section>"}</code>): the old one is unmounted with all of its
            children's state, and the new one starts fresh.
          </li>
          <li>
            <strong>Different key</strong>: also a different component, even if the
            type and position match.
          </li>
        </ul>
        <p>
          You met keys in lists (topic 9), where they identify items among
          siblings. The same tool works <em>outside</em> lists: give a component a
          key to say "this one represents a different thing now, so start over".
        </p>
      </Explain>

      <Example title="1. Position, type and state" code={positionDemoCode}>
        <PositionDemo />
      </Example>

      <Example title="2. The stale draft bug, fixed with a key" code={chatDemoCode}>
        <ChatDemo />
        <p className="hint">
          With the checkbox off: type a message for Arun, then click Priya. The
          message is still there, addressed to the wrong person. Turn the key on and try again.
        </p>
        <details>
          <summary>Show ChatBox.jsx</summary>
          <CodeBlock code={chatBoxCode} />
        </details>
      </Example>

      <Example title="3. Reset a whole section with a key" code={resettableFormCode}>
        <ResettableForm />
      </Example>

      <Example title="4. Better than syncing state with an effect">
        <CodeBlock
          code={`
// ❌ Resetting state when a prop changes, with an effect: an extra render
//    with stale data, and easy to forget a field
function Profile({ userId }) {
  const [comment, setComment] = useState("");
  useEffect(() => { setComment(""); }, [userId]);
}

// ✅ Let identity do it: a new userId means a new Profile
<Profile key={userId} userId={userId} />
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Defining a component inside another component. It's a new type on
            every render, so its state resets every time (the reason for the topic
            2 rule).
          </li>
          <li>
            Changing a wrapper element conditionally (
            <code>{"isWide ? <div>... : <section>..."}</code>). Everything inside
            loses its state.
          </li>
          <li>
            Writing effects that reset state when an id prop changes. Use{" "}
            <code>key</code> instead (example 4).
          </li>
          <li>
            Using a key that changes every render (<code>Math.random()</code>).
            The component remounts constantly and can never keep state.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default KeysIdentityLesson;
