import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import HmrDemo from "./HmrDemo";
import hmrDemoCode from "./HmrDemo.jsx?raw";

// Topic 1: what React and Vite are, and how the browser ends up showing App.
function SetupLesson() {
  return (
    <Lesson
      number={1}
      title="Starting a React project locally"
      definition="React is a JavaScript library for building user interfaces out of components. Vite is the build tool that runs a dev server and bundles the code for production."
    >
      <Explain title="How it works">
        <p>
          <strong>React is declarative.</strong> You describe what the UI should
          look like for the current data, and React works out which DOM
          changes are needed. With plain JavaScript you are <em>imperative</em>:
          you write every step yourself (find the element, change its text,
          add a class...).
        </p>
        <p>
          <strong>React keeps a description of the UI in memory</strong> (often
          called the virtual DOM). When data changes, it calls your components
          again, compares the new description with the previous one
          (reconciliation) and changes only the parts of the real DOM that differ.
        </p>
        <p>
          <strong>Why a build tool?</strong> Browsers can't read JSX, and loading
          hundreds of files from <code>node_modules</code> would be slow. Vite
          converts JSX to plain JavaScript, serves files instantly during
          development with hot reloading, and bundles and minifies everything
          for production.
        </p>
      </Explain>

      {/* Creating the project: Vite generates the folder, config and starter files */}
      <Example title="1. Create and run a project">
        <CodeBlock
          code={`
npm create vite@latest reactRefresher -- --template react
cd reactRefresher
npm install      # download dependencies into node_modules/
npm run dev      # start the dev server at http://localhost:5173
`}
        />
      </Example>

      <Example title="2. What's in the folder">
        <CodeBlock
          code={`
reactRefresher/
├── node_modules/     installed packages (never edit; never commit)
├── public/           files copied as-is (favicon, robots.txt)
├── src/              YOUR code
│   ├── main.jsx      entry point: mounts React into the page
│   ├── App.jsx       root component
│   └── *.css         styles
├── index.html        the single HTML page
├── package.json      dependencies + npm scripts
└── vite.config.js    Vite settings (plugins, test setup)
`}
        />
      </Example>

      <Example title="3. npm scripts (package.json)">
        <CodeBlock
          code={`
"scripts": {
  "dev": "vite",            // npm run dev     -> dev server with HMR
  "build": "vite build",    // npm run build   -> optimized files in dist/
  "preview": "vite preview",// npm run preview -> serve dist/ locally
  "lint": "eslint .",       // npm run lint    -> find code problems
  "test": "vitest"          // npm test        -> run *.test.jsx files
}
`}
        />
      </Example>

      {/* The chain from HTML to your components */}
      <Example title="4. How the page gets rendered">
        <ol>
          <li>
            <code>index.html</code> has one empty <code>{'<div id="root">'}</code>{" "}
            and loads <code>src/main.jsx</code>.
          </li>
          <li>
            <code>main.jsx</code> calls <code>createRoot()</code> on that div
            and renders <code>{"<App />"}</code> into it.
          </li>
          <li>
            <code>App.jsx</code> is the root component; every other component
            is rendered from inside it.
          </li>
        </ol>
        <CodeBlock
          code={`
<!-- index.html -->
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>

// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`}
        />
      </Example>

      {/* Imperative vs declarative: the core idea behind React */}
      <Example title="5. Imperative (plain JS) vs declarative (React)">
        <CodeBlock
          code={`
// Plain JavaScript: you write every DOM step yourself
let count = 0;
const button = document.createElement("button");
button.textContent = "Clicked 0 times";
button.addEventListener("click", () => {
  count++;
  button.textContent = \`Clicked \${count} times\`; // must remember to update!
});
document.body.appendChild(button);

// React: describe the result; React keeps the DOM in sync
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
`}
        />
      </Example>

      <Example title="6. Hot Module Replacement (try it)" code={hmrDemoCode}>
        <HmrDemo />
      </Example>

      {/* StrictMode: a development-only helper, which explains some "double" logs later */}
      <Example title="7. StrictMode">
        <p>
          <code>{"<StrictMode>"}</code> adds extra checks in development only.
          It renders every component twice and runs effects twice
          (mount, unmount, mount) to expose bugs such as missing cleanup code.
          So console logs appear twice. That is expected, and it does not
          happen in the production build.
        </p>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Running <code>npm run dev</code> outside the project folder: "Missing
            script" or "Could not read package.json". <code>cd</code> into the
            folder that holds <code>package.json</code> first.
          </li>
          <li>
            Forgetting <code>npm install</code> after cloning a project: "vite is
            not recognized". <code>node_modules</code> is never committed, so
            it has to be reinstalled.
          </li>
          <li>
            Writing JSX in a <code>.js</code> file. Vite expects JSX in
            <code>.jsx</code> files.
          </li>
          <li>
            Editing files in <code>dist/</code>. It is regenerated on every build,
            so the changes get wiped.
          </li>
          <li>
            Getting the import path's capitalization wrong (<code>./app</code>{" "}
            vs <code>./App</code>). It works on Windows but fails on Linux servers.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default SetupLesson;
