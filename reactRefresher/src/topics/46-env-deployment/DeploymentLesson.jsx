import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import EnvInfo from "./EnvInfo";
import envInfoCode from "./EnvInfo.jsx?raw";

// A copy of reactRefresher/.env. It can't be imported with ?raw like the other
// files: Vite refuses to serve .env files to the browser (server.fs.deny), a
// safety net so their contents can't leak through the dev server.
const envFileCode = `
VITE_APP_TITLE=React Refresher
VITE_API_URL=https://jsonplaceholder.typicode.com
`;

function DeploymentLesson() {
  return (
    <Lesson
      number={46}
      title="Environment variables and deployment"
      definition="Environment variables configure an app per environment (local, staging, production) without changing code. Deployment means building the app into static files and serving them from a host."
    >
      <Explain title="How it works">
        <p>
          <strong>Environment variables</strong> keep settings like API URLs out of
          your code, so the same code can point at a local server in development
          and the real one in production. Vite reads them from <code>.env</code>{" "}
          files in the project root:
        </p>
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Loaded</th>
              <th>Commit it?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>.env</td>
              <td>always</td>
              <td>yes (no secrets)</td>
            </tr>
            <tr>
              <td>.env.local</td>
              <td>always, overrides .env</td>
              <td>no (ignored by *.local)</td>
            </tr>
            <tr>
              <td>.env.development / .env.production</td>
              <td>only in that mode</td>
              <td>yes</td>
            </tr>
            <tr>
              <td>.env.production.local</td>
              <td>production mode, overrides the rest</td>
              <td>no</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>Critical:</strong> a frontend has no secrets. Every{" "}
          <code>VITE_</code> value is pasted into the JavaScript the browser
          downloads, where anyone can read it. API keys that must stay private
          belong on a server (your backend, or a serverless function) that the
          frontend calls.
        </p>
        <p>
          <strong>Deployment:</strong> <code>npm run build</code> compiles everything
          into plain static files in <code>dist/</code> (index.html + hashed JS and
          CSS). Any static host can serve them. Since this is a single page app,
          the host must answer <em>every</em> path with <code>index.html</code>{" "}
          (topic 15), or refreshing on <code>/about</code> gives a 404.
        </p>
      </Explain>

      <Example title="1. Reading environment variables" code={envInfoCode}>
        <EnvInfo />
        <details>
          <summary>Show this project's .env file</summary>
          <CodeBlock code={envFileCode} />
          <p className="hint">
            Vite won't serve .env files to the browser at all; only the VITE_
            values get copied into your code.
          </p>
        </details>
      </Example>

      <Example title="2. Build and preview locally">
        <CodeBlock
          code={`
npm run build     # -> dist/index.html, dist/assets/index-[hash].js ...
npm run preview   # serve dist/ at http://localhost:4173 to check it

# The [hash] in file names changes whenever the content changes, so browsers
# can cache them forever and still get new versions after each deploy.
`}
        />
      </Example>

      <Example title="3. Deploying to common hosts">
        <CodeBlock
          code={`
# Vercel / Netlify (easiest): connect the GitHub repo in their dashboard.
#   Build command:     npm run build
#   Output directory:  dist
#   Root directory:    reactRefresher     (this repo keeps the app in a subfolder)
#   Env variables:     set VITE_API_URL etc. in the dashboard, per environment
# Every push to main deploys; every pull request gets a preview URL.

# SPA fallback, so deep links like /about don't 404:
# vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }

# Netlify: public/_redirects
/*    /index.html   200

# nginx
location / { try_files $uri /index.html; }

# GitHub Pages serves from /repo-name/, so set Vite's base path:
# vite.config.js -> export default defineConfig({ base: "/your-repo-name/" })
`}
        />
      </Example>

      <Example title="4. A typical CI pipeline (GitHub Actions)">
        <CodeBlock
          code={`
# .github/workflows/ci.yml: check every push before it can be deployed
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: reactRefresher } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci             # clean install from package-lock.json
      - run: npm run lint
      - run: npm run typecheck
      - run: npx vitest run
      - run: npm run build
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Putting secret keys in <code>VITE_</code> variables. They ship to every
            visitor's browser.
          </li>
          <li>
            Forgetting the <code>VITE_</code> prefix: <code>API_URL</code> is
            silently <code>undefined</code> in the browser.
          </li>
          <li>
            Editing <code>.env</code> and expecting the running dev server to pick
            it up. Restart it.
          </li>
          <li>
            Using <code>process.env.X</code> (Create React App / Node style). In Vite
            it's <code>import.meta.env.X</code>.
          </li>
          <li>
            No SPA fallback on the host: the home page works, but refreshing any
            other URL gives a 404.
          </li>
          <li>
            Committing <code>.env.local</code> with personal or secret values.
            Keep it out of git.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default DeploymentLesson;
