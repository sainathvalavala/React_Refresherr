import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import RouterDemo from "./RouterDemo";
import routerDemoCode from "./RouterDemo.jsx?raw";
import loadersCode from "./loaders.js?raw";
import rootLayoutCode from "./RootLayout.jsx?raw";
import routeErrorCode from "./RouteError.jsx?raw";
import loginPageCode from "./pages/LoginPage.jsx?raw";
import productsPageCode from "./pages/ProductsPage.jsx?raw";

function AdvancedRoutingLesson() {
  return (
    <Lesson
      number={38}
      title="Advanced routing: loaders, actions, protected routes"
      definition="React Router's data APIs let each route declare how to load its data (loader), handle its form submissions (action), show its errors (errorElement) and load its code (lazy), so pages render with data already in hand."
    >
      <Explain title="How it works">
        <p>
          With topic 15's <code>{"<Routes>"}</code>, a page renders first and{" "}
          <em>then</em> fetches in an effect: a blank page, a spinner, and
          requests that start late (a "waterfall"). A <strong>data router</strong>{" "}
          flips the order: on navigation it runs the next route's{" "}
          <strong>loader</strong> first, keeps the old page visible, and renders
          the new page once its data is ready.
        </p>
        <table>
          <thead>
            <tr>
              <th>Route option</th>
              <th>Runs</th>
              <th>Read with</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>loader</td>
              <td>before the route renders (on navigation)</td>
              <td>useLoaderData()</td>
            </tr>
            <tr>
              <td>action</td>
              <td>
                when a <code>{'<Form method="post">'}</code> submits to the route
              </td>
              <td>useActionData()</td>
            </tr>
            <tr>
              <td>errorElement</td>
              <td>when the loader, action or component throws</td>
              <td>useRouteError()</td>
            </tr>
            <tr>
              <td>lazy</td>
              <td>the first time the route matches; loads its code</td>
              <td>(automatic)</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>
            <strong>Protected routes</strong>: check auth in the loader and{" "}
            <code>return redirect("/login")</code>. The page never renders for
            logged-out users.
          </li>
          <li>
            <strong>After an action</strong>, the router automatically re-runs the
            loaders on the page, so the UI shows fresh data without manual refetching.
          </li>
          <li>
            <code>useNavigation()</code> reports "loading" or "submitting" for
            global pending UI.
          </li>
        </ul>
      </Explain>

      <Example title="A complete data router" code={routerDemoCode}>
        <RouterDemo />
        <p className="hint">
          Try Account 🔒 (redirected to login), submit an empty name (action error),
          then log in (redirected back to the account page).
        </p>
      </Example>

      <Example title="1. Loaders and actions" code={loadersCode}>
        <details>
          <summary>Show ProductsPage.jsx (useLoaderData)</summary>
          <CodeBlock code={productsPageCode} />
        </details>
      </Example>

      <Example title="2. Forms that post to an action" code={loginPageCode}>
        <p>
          Router <code>{"<Form>"}</code> + <code>useActionData</code> +{" "}
          <code>useNavigation</code> for the submitting state.
        </p>
      </Example>

      <Example title="3. Errors per route" code={routeErrorCode}>
        <p>Open "Missing product": the loader throws a 404 and this errorElement renders.</p>
      </Example>

      <Example title="4. Global pending UI" code={rootLayoutCode}>
        <p>The layout dims the page and shows the router state while loaders run.</p>
      </Example>

      <Example title="5. Protecting routes in a component instead">
        <CodeBlock
          code={`
// Without loaders (plain <Routes>), guard in a wrapper component:
function RequireAuth({ children }) {
  const { user } = useAuth();          // e.g. from context (topic 22)
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

<Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Using lowercase <code>{"<form>"}</code> instead of the router's{" "}
            <code>{"<Form>"}</code>. The browser does a full-page POST and the
            action never runs.
          </li>
          <li>
            Calling hooks inside loaders or actions. They're plain functions that
            run outside React. Pass in what they need, or read from modules.
          </li>
          <li>
            Mixing <code>{"<BrowserRouter>"}</code> + <code>{"<Routes>"}</code>{" "}
            with loaders. Loaders only work with <code>createBrowserRouter</code> +{" "}
            <code>{"<RouterProvider>"}</code>.
          </li>
          <li>
            Protecting a route only in the UI. Hiding a page doesn't secure the
            data: the server API must check permissions too.
          </li>
          <li>
            Fetching again in a useEffect inside a page that already has a loader.
            That's a duplicate request.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default AdvancedRoutingLesson;
