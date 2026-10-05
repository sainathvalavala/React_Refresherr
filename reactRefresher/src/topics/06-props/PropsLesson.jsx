import { useState } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import Student from "./Student";
import LikeButton from "./LikeButton";
import ProductCard from "./ProductCard";
import Badge from "./Badge";
import studentCode from "./Student.jsx?raw";
import likeButtonCode from "./LikeButton.jsx?raw";
import productCardCode from "./ProductCard.jsx?raw";
import badgeCode from "./Badge.jsx?raw";

// Spreading props: {...priya} passes every key of the object as its own
// prop, the same as name={priya.name} age={priya.age} isStudent={...}.
const priya = { name: "Priya", age: 30, isStudent: false };

function PropsLesson() {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes(likes + 1);
  }

  return (
    <Lesson
      number={6}
      title="Props"
      definition="Props are the inputs of a component: read-only values a parent passes to a child, written like HTML attributes."
    >
      <Explain title="How it works">
        <p>
          A component is a function, and props are its arguments. React
          collects every attribute you write into <strong>one object</strong>{" "}
          and passes it as the first parameter:
        </p>
        <CodeBlock
          code={`
<Student name="Arun" age={25} />

// React calls: Student({ name: "Arun", age: 25 })

function Student(props) { return <p>{props.name}</p>; }   // works
function Student({ name, age = 0 }) { return <p>{name}</p>; } // destructured + default
`}
        />
        <ul>
          <li>
            <strong>Props are read-only.</strong> A child must never change its
            props. If something needs to change, it should be state (owned by
            whoever changes it).
          </li>
          <li>
            <strong>Data flows one way, down the tree:</strong> parent to child.
            For a child to send something <em>up</em>, the parent passes a
            function and the child calls it (example 3).
          </li>
          <li>
            <strong>When the parent re-renders with new values</strong>, the
            child automatically re-renders with the new props.
          </li>
          <li>
            <code>key</code> is special: React uses it and doesn't pass it to
            your component.
          </li>
        </ul>
      </Explain>

      {/* Strings go in quotes; every other type (number, boolean, object) goes in {} */}
      <Example title="1. Passing data, with default values" code={studentCode}>
        <div className="grid">
          <Student name="Arun" age={25} isStudent={true} />
          <Student name="Priya" age={30} isStudent={false} />
          <Student />
        </div>
      </Example>

      <Example title="2. Arrays, objects and numbers as props" code={productCardCode}>
        <div className="grid">
          <ProductCard
            name="Notebook"
            price={120}
            tags={["paper", "A5"]}
            seller={{ name: "PaperCo", rating: 4.5 }}
            inStock={true}
          />
          <ProductCard name="Gel pen" price={35.5} seller={{ name: "InkWorks", rating: 4.1 }} />
        </div>
      </Example>

      <Example title="3. Passing functions as props" code={likeButtonCode}>
        <p>Total likes: {likes}</p>
        <div className="row">
          <LikeButton label="React" onLike={handleLike} />
          <LikeButton label="Vite" onLike={handleLike} />
        </div>
      </Example>

      <Example title="4. Boolean shorthand and JSX as a prop" code={badgeCode}>
        <div className="row">
          <Badge text="Normal" />
          <Badge text="Highlighted" highlighted />
          <Badge text="With icon" icon={<span>⭐</span>} />
        </div>
      </Example>

      <Example title="5. Spreading an object into props">
        <Student {...priya} />
        <CodeBlock
          code={`
const priya = { name: "Priya", age: 30, isStudent: false };
<Student {...priya} />
// same as <Student name="Priya" age={30} isStudent={false} />
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Changing a prop: <code>props.name = "x"</code>. Props are read-only.
            Ask the parent to change its state instead.
          </li>
          <li>
            <code>age="25"</code> passes the <em>string</em> "25". Use{" "}
            <code>{"age={25}"}</code> for a number. The same applies to{" "}
            <code>{'isStudent="false"'}</code>, which is a truthy string!
          </li>
          <li>
            <code>{"onLike={handleLike()}"}</code> calls the function during
            render. Pass the function itself: <code>{"onLike={handleLike}"}</code>.
          </li>
          <li>
            A typo in the prop name (<code>nmae</code>) gives{" "}
            <code>undefined</code> without any error. That's what PropTypes (or
            TypeScript) help catch.
          </li>
          <li>
            Copying a prop into state:{" "}
            <code>useState(props.name)</code>. State is only initialized once,
            so the child ignores later prop changes.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default PropsLesson;
