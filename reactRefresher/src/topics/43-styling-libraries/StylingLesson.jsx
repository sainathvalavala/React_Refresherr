import { useState } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import Button from "./Button";
import cx from "./cx";
import buttonCode from "./Button.jsx?raw";
import cxCode from "./cx.js?raw";

function StylingLesson() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Lesson
      number={43}
      title="Styling and UI libraries"
      definition="Beyond plain CSS and inline styles (topic 10), React apps are usually styled with utility-first CSS (Tailwind), CSS-in-JS, or a component library that provides ready-made, accessible building blocks."
    >
      <Explain title="How it works">
        <table>
          <thead>
            <tr>
              <th>Approach</th>
              <th>What you write</th>
              <th>Trade-offs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Plain CSS / CSS Modules</td>
              <td>
                <code>.card {"{ padding: 16px }"}</code> + <code>className</code>
              </td>
              <td>no tooling, full CSS; naming and organizing is on you</td>
            </tr>
            <tr>
              <td>Tailwind CSS</td>
              <td>
                <code>{'className="p-4 rounded-lg bg-white shadow"'}</code>
              </td>
              <td>very fast to build, consistent spacing and colors; long class lists</td>
            </tr>
            <tr>
              <td>CSS-in-JS (styled-components, Emotion)</td>
              <td>
                <code>{"const Card = styled.div`padding: 16px`"}</code>
              </td>
              <td>styles next to components, props in CSS; runtime cost, less used with Server Components</td>
            </tr>
            <tr>
              <td>Headless UI (Radix, Headless UI, React Aria)</td>
              <td>accessible behavior with no styles; you add the CSS</td>
              <td>accessibility done for you, total visual control</td>
            </tr>
            <tr>
              <td>Component libraries (MUI, Chakra, Mantine, Ant Design)</td>
              <td>
                <code>{'<Button variant="contained">'}</code>
              </td>
              <td>a whole design system instantly; looks "like MUI", heavier bundle</td>
            </tr>
            <tr>
              <td>shadcn/ui</td>
              <td>copies Radix + Tailwind component source into your project</td>
              <td>you own and edit the code; very popular in recent years</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Why Tailwind isn't installed here:</strong> its base stylesheet
          resets every element (headings, buttons, lists), which would restyle this
          whole app. In a new project, add it from the start (setup below).
        </p>
      </Explain>

      <Example title="1. Conditional classes with a cx() helper" code={cxCode}>
        <div className="row">
          <span className={cx("badge", isActive && "highlighted")}>
            {isActive ? "Active badge" : "Normal badge"}
          </span>
          <button onClick={() => setIsActive(!isActive)}>Toggle</button>
        </div>
        <CodeBlock code={`<span className={cx("badge", isActive && "highlighted")}>`} />
      </Example>

      <Example title="2. A variant-based Button component" code={buttonCode}>
        <div className="row">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <Button variant="outline" fullWidth onClick={() => alert("Clicked!")}>
          Full width, with onClick
        </Button>
      </Example>

      <Example title="3. Tailwind CSS setup (Vite) and usage">
        <CodeBlock
          code={`
npm install tailwindcss @tailwindcss/vite

// vite.config.js
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });

/* src/index.css */
@import "tailwindcss";

// Any component: utility classes for each CSS property
function ProfileCard({ name, role }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-md
                    hover:shadow-lg dark:bg-slate-800 md:p-8">
      <img className="size-12 rounded-full" src="/avatar.png" alt="" />
      <div>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  );
}
// hover:, dark:, md: are variants: states, dark mode, breakpoints
`}
        />
      </Example>

      <Example title="4. CSS-in-JS and a component library">
        <CodeBlock
          code={`
// styled-components: CSS written in JS, with access to props
import styled from "styled-components";

const Alert = styled.div\`
  padding: 12px;
  border-left: 4px solid \${(props) => (props.$danger ? "tomato" : "steelblue")};
\`;
<Alert $danger>Something broke</Alert>

// MUI (Material UI): ready-made, themed components
import { Button, TextField, Stack } from "@mui/material";

<Stack spacing={2}>
  <TextField label="Email" />
  <Button variant="contained">Sign up</Button>
</Stack>

// shadcn/ui: "npx shadcn@latest add button" copies the source into src/components/ui
import { Button } from "@/components/ui/button";
<Button variant="destructive" size="sm">Delete</Button>
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Building interactive widgets (menus, dialogs, comboboxes) from scratch.
            Keyboard and screen-reader support is hard; headless libraries solve it
            (topic 44).
          </li>
          <li>
            Concatenating class strings by hand (<code>{'"btn " + (a ? "x" : "")'}</code>),
            which leaves stray spaces and "undefined". Use a helper like cx/clsx.
          </li>
          <li>
            Building Tailwind class names dynamically (<code>{"`bg-${color}-500`"}</code>).
            Tailwind only generates classes it finds written out in full in your code.
          </li>
          <li>
            Mixing several styling systems in one app. Pick one main approach.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default StylingLesson;
