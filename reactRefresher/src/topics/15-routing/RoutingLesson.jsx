import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import AddressBar from "../../components/AddressBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import homePageCode from "./pages/HomePage.jsx?raw";
import userPageCode from "./pages/UserPage.jsx?raw";
import searchPageCode from "./pages/SearchPage.jsx?raw";
import routingLessonCode from "./RoutingLesson.jsx?raw";

// Routing with React Router:
//   <Routes>  looks at the current URL and renders the best matching <Route>
//   <Route>   pairs a path with the element to show
//   <Link>    changes the URL without a page reload (use it instead of <a href>)
//   path="*"  matches anything not matched by the others: a 404 page
function RoutingLesson() {
  return (
    <Lesson
      number={15}
      title="Single page applications, routing"
      definition="A single page application (SPA) loads one HTML page once, then JavaScript swaps the content when the URL changes. Routing maps each URL to the component that should be shown."
    >
      <Explain title="How it works">
        <p>
          <strong>Multi-page app (traditional):</strong> every link asks the
          server for a brand new HTML page. The screen flashes white, and all
          JavaScript state is lost.
        </p>
        <p>
          <strong>Single page app:</strong> the server sends{" "}
          <code>index.html</code> once. When you click a link, the router
          updates the URL with the browser's History API (no request) and
          React renders a different component. It's faster, there's no flash,
          and state can survive navigation.
        </p>
        <p>
          React itself has no router. <strong>React Router</strong> is the
          standard library:
        </p>
        <table>
          <thead>
            <tr>
              <th>Piece</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BrowserRouter</td>
              <td>Wraps the app; syncs with the real address bar</td>
            </tr>
            <tr>
              <td>Routes / Route</td>
              <td>Pick the element whose path matches the URL</td>
            </tr>
            <tr>
              <td>Link / NavLink</td>
              <td>Navigate on click without reloading</td>
            </tr>
            <tr>
              <td>useNavigate()</td>
              <td>Navigate from code (after a submit, a login...)</td>
            </tr>
            <tr>
              <td>useParams()</td>
              <td>
                Read dynamic segments: <code>/users/:id</code>
              </td>
            </tr>
            <tr>
              <td>useSearchParams()</td>
              <td>
                Read and write the query string: <code>?q=hooks</code>
              </td>
            </tr>
            <tr>
              <td>useLocation()</td>
              <td>The current path, query and hash</td>
            </tr>
          </tbody>
        </table>
      </Explain>

      <Example title="1. A mini app with routes, params, query strings and a 404" code={routingLessonCode}>
        {/* Real apps wrap <App /> in <BrowserRouter> in main.jsx. MemoryRouter
            keeps this demo from changing the real address bar. */}
        <MemoryRouter>
          <div className="browser">
            <AddressBar />
            <nav className="row">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/users/7">User 7</Link>
              <Link to="/search?q=use">Search "use"</Link>
              <Link to="/does-not-exist">Broken link</Link>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </MemoryRouter>
      </Example>

      <Example title="2. Navigating from code: useNavigate" code={homePageCode}>
        <p>
          The Home page's button calls <code>navigate("/users/42")</code>.
          Other forms: <code>navigate(-1)</code> goes back,{" "}
          <code>{'navigate("/login", { replace: true })'}</code> replaces the
          current history entry (so Back doesn't return to it).
        </p>
      </Example>

      <Example title="3. URL params: useParams" code={userPageCode}>
        <p>
          Open "User 7" above, then try "Next user" and "Back". The URL is the
          single source of truth for which user is shown.
        </p>
      </Example>

      <Example title="4. Query strings: useSearchParams" code={searchPageCode}>
        <p>
          Open "Search" above and type: the address bar updates as you type,
          so the search could be bookmarked or shared.
        </p>
      </Example>

      <Example title="5. Setting it up in a real app">
        <CodeBlock
          code={`
npm install react-router-dom

// main.jsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// App.jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/users/:id" element={<UserPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Using <code>{'<a href="/about">'}</code> for internal links. It
            reloads the whole page and wipes all state. Use{" "}
            <code>{'<Link to="/about">'}</code>.
          </li>
          <li>
            Calling <code>useNavigate</code>, <code>useParams</code> or{" "}
            <code>{"<Link>"}</code> outside a router: "useNavigate() may be used
            only in the context of a {"<Router>"} component".
          </li>
          <li>
            Forgetting that params are strings: <code>id === 7</code> is false
            when <code>id</code> is <code>"7"</code>.
          </li>
          <li>
            No <code>path="*"</code> route: unknown URLs show a blank area
            instead of a 404 page.
          </li>
          <li>
            Production server returning 404 when you refresh on{" "}
            <code>/about</code>. The server must send <code>index.html</code>{" "}
            for every path and let React Router handle it (a "SPA fallback").
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default RoutingLesson;
