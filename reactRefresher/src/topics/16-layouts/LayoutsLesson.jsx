import { MemoryRouter, Routes, Route } from "react-router-dom";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import AddressBar from "../../components/AddressBar";
import MainLayout from "./MainLayout";
import DashboardLayout from "./DashboardLayout";
import AuthLayout from "./AuthLayout";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import mainLayoutCode from "./MainLayout.jsx?raw";
import dashboardLayoutCode from "./DashboardLayout.jsx?raw";
import authLayoutCode from "./AuthLayout.jsx?raw";
import overviewPageCode from "./pages/OverviewPage.jsx?raw";

// Nested routes: a <Route> with children renders its element (the layout),
// and the matching child renders inside that layout's <Outlet />.
//   index      -> the child shown at the parent's exact path
//   child path -> relative, so "settings" under "dashboard" is /dashboard/settings
function LayoutsLesson() {
  return (
    <Lesson
      number={16}
      title="Layouts"
      definition="A layout is a shared page shell (header, navigation, footer, sidebar) that wraps many routes. With nested routes, each page only renders its own content."
    >
      <Explain title="How it works">
        <p>
          Without layouts, every page would repeat the header and footer, and
          they would unmount and remount on each navigation. With{" "}
          <strong>nested routes</strong>, a parent route renders the shell
          once, and only the part inside <code>{"<Outlet />"}</code> changes.
        </p>
        <CodeBlock
          code={`
<Routes>
  <Route path="/" element={<MainLayout />}>            // shell for the site
    <Route index element={<HomePage />} />              // "/"
    <Route path="dashboard" element={<DashboardLayout />}> // shell inside the shell
      <Route index element={<OverviewPage />} />        // "/dashboard"
      <Route path="settings" element={<SettingsPage />} /> // "/dashboard/settings"
    </Route>
  </Route>

  <Route element={<AuthLayout />}>                      // pathless: no URL segment
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
  </Route>
</Routes>
`}
        />
        <ul>
          <li>
            <strong>Outlet</strong>: "render the matching child route here".
          </li>
          <li>
            <strong>index route</strong>: the default child, shown at the
            parent's own path.
          </li>
          <li>
            <strong>Relative paths</strong>: child paths have no leading slash
            and are added to the parent's path.
          </li>
          <li>
            <strong>Pathless layout route</strong>: a Route with only an{" "}
            <code>element</code>, used to group pages under a different shell.
          </li>
          <li>
            <strong>Outlet context</strong>: a layout can hand data to its pages
            with <code>{"<Outlet context={...} />"}</code>.
          </li>
        </ul>
      </Explain>

      <Example title="1. Main layout, nested dashboard layout, and an auth layout">
        <MemoryRouter>
          <div className="browser">
            <AddressBar />
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<OverviewPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>
            </Routes>
          </div>
        </MemoryRouter>
        <p className="hint">
          Visit Dashboard then Settings (the sidebar stays), then Log in (a
          completely different shell).
        </p>
      </Example>

      <Example title="2. The main layout" code={mainLayoutCode}>
        <p>Header + nav + Outlet + footer. Every page under "/" renders inside it.</p>
      </Example>

      <Example title="3. A nested layout passing data with Outlet context" code={dashboardLayoutCode}>
        <details>
          <summary>Show OverviewPage.jsx (reads the context)</summary>
          <CodeBlock code={overviewPageCode} />
        </details>
      </Example>

      <Example title="4. A pathless layout for auth pages" code={authLayoutCode}>
        <p>Login and signup share a centered card instead of the site header.</p>
      </Example>

      <Example title="5. A layout without a router (children)">
        <CodeBlock
          code={`
// For a simple app without routing, a layout is just a wrapper (topic 8):
function PageLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

<PageLayout><Home /></PageLayout>
`}
        />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Forgetting <code>{"<Outlet />"}</code> in the layout: the URL changes
            but the page content never appears.
          </li>
          <li>
            Leading slashes on nested paths (<code>path="/settings"</code>{" "}
            inside "dashboard"). That makes it absolute, and React Router
            throws an error because <code>/settings</code> doesn't start with{" "}
            <code>/dashboard</code>. Write <code>path="settings"</code>.
          </li>
          <li>
            Repeating <code>{"<Header />"}</code> in every page component instead
            of lifting it into a layout route.
          </li>
          <li>
            Calling <code>useOutletContext()</code> in a page whose layout
            doesn't pass a context: you get <code>undefined</code>.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default LayoutsLesson;
