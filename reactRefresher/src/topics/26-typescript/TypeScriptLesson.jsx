import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import TypeScriptDemo from "./TypeScriptDemo";
import TypedCounter from "./TypedCounter";
import typedProductCardCode from "./TypedProductCard.tsx?raw";
import typedCounterCode from "./TypedCounter.tsx?raw";
import typedListCode from "./TypedList.tsx?raw";
import typeScriptDemoCode from "./TypeScriptDemo.tsx?raw";

function TypeScriptLesson() {
  return (
    <Lesson
      number={26}
      title="TypeScript with React"
      definition="TypeScript is JavaScript plus type annotations. A compiler checks that every value is used correctly before the code runs, so typos, wrong prop types and missing null checks show up as errors in your editor."
    >
      <Explain title="How it works">
        <p>
          You write <code>.ts</code> / <code>.tsx</code> files with types. Two
          separate tools handle them:
        </p>
        <ul>
          <li>
            <strong>Vite</strong> simply <em>strips</em> the types and runs the
            JavaScript. That's fast, but it never reports type errors.
          </li>
          <li>
            <strong>tsc</strong> (the TypeScript compiler) <em>checks</em> the
            types. Your editor runs it live (red squiggles), and{" "}
            <code>npm run typecheck</code> runs it on the whole project, which
            is useful before committing or in CI.
          </li>
        </ul>
        <p>
          This lesson's demos are real <code>.tsx</code> files, imported by a
          normal <code>.jsx</code> lesson. JS and TS can live side by side, so
          a project can migrate one file at a time.
        </p>
        <CodeBlock
          code={`
// Start a new TypeScript React project:
npm create vite@latest my-app -- --template react-ts

// In this project (only the .ts/.tsx files are checked):
npm run typecheck
`}
        />
        <table>
          <thead>
            <tr>
              <th>What</th>
              <th>How to type it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Props</td>
              <td>
                <code>{"function C({ a }: CProps)"}</code> with{" "}
                <code>{"type CProps = { a: string }"}</code>
              </td>
            </tr>
            <tr>
              <td>Optional prop</td>
              <td>
                <code>{"a?: string"}</code>
              </td>
            </tr>
            <tr>
              <td>children</td>
              <td>
                <code>children: ReactNode</code>
              </td>
            </tr>
            <tr>
              <td>State</td>
              <td>
                inferred: <code>useState(0)</code>; explicit:{" "}
                <code>{"useState<User | null>(null)"}</code>
              </td>
            </tr>
            <tr>
              <td>Events</td>
              <td>
                <code>{"ChangeEvent<HTMLInputElement>"}</code>,{" "}
                <code>{"MouseEvent<HTMLButtonElement>"}</code>,{" "}
                <code>{"FormEvent<HTMLFormElement>"}</code>
              </td>
            </tr>
            <tr>
              <td>DOM refs</td>
              <td>
                <code>{"useRef<HTMLInputElement>(null)"}</code>
              </td>
            </tr>
            <tr>
              <td>Function props</td>
              <td>
                <code>{"onAdd: (id: number) => void"}</code>
              </td>
            </tr>
            <tr>
              <td>All props of an HTML element</td>
              <td>
                <code>{'ComponentProps<"button">'}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </Explain>

      <Example title="1. Typed props, unions and function props" code={typedProductCardCode}>
        <TypeScriptDemo />
        <details>
          <summary>Show TypeScriptDemo.tsx (with the commented-out errors)</summary>
          <CodeBlock code={typeScriptDemoCode} />
        </details>
      </Example>

      <Example title="2. Typed state, events and refs" code={typedCounterCode}>
        <TypedCounter />
      </Example>

      <Example title="3. A generic component" code={typedListCode}>
        <p>
          The user list in example 1 is <code>TypedList</code>. Its{" "}
          <code>renderItem</code> knows each item is a <code>User</code>,
          because TypeScript infers <code>T</code> from <code>items</code>.
        </p>
      </Example>

      <Example title="4. Extending HTML element props">
        <CodeBlock
          code={`
import type { ComponentProps } from "react";

// Accept every normal <button> prop (onClick, disabled, type...) plus our own
type FancyButtonProps = ComponentProps<"button"> & { variant?: "primary" | "ghost" };

function FancyButton({ variant = "primary", ...rest }: FancyButtonProps) {
  return <button className={variant} {...rest} />;
}
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Using <code>any</code> to silence errors. It switches checking off
            for that value. Prefer a real type, or <code>unknown</code> and
            narrow it.
          </li>
          <li>
            Forgetting that refs and fetched data start as <code>null</code>.
            TypeScript forces you to handle it (<code>ref.current?.focus()</code>).
            Don't paper over it with <code>!</code> everywhere.
          </li>
          <li>
            Thinking Vite will catch type errors. It won't; run{" "}
            <code>npm run typecheck</code> (or watch your editor).
          </li>
          <li>
            Typing what TypeScript already infers (
            <code>{"useState<number>(0)"}</code>). Only add types where inference
            falls short (empty arrays, null initial values).
          </li>
          <li>
            Using <code>React.FC</code> for every component out of habit. Typing the
            props parameter directly is simpler and is the current recommendation.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default TypeScriptLesson;
