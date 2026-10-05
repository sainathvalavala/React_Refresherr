import { Form, NavLink, Outlet, useNavigation } from "react-router-dom";
import AddressBar from "../../components/AddressBar";
import { fakeAuth } from "./fakeAuth";

// useNavigation(): tells you whether the router is busy. state is "idle",
// "loading" (running loaders for the next page) or "submitting" (running
// an action). The old page stays visible meanwhile, so show a progress hint.
function RootLayout() {
  const navigation = useNavigation();
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <div className="browser">
      <AddressBar />
      <nav className="row">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/products/99" className={linkClass}>
          Missing product
        </NavLink>
        <NavLink to="/account" className={linkClass}>
          Account 🔒
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About (lazy)
        </NavLink>
        {fakeAuth.user && (
          // A Form with action="/logout" runs that route's action
          <Form method="post" action="/logout">
            <button type="submit">Log out {fakeAuth.user.name}</button>
          </Form>
        )}
        {navigation.state !== "idle" && <span>⏳ {navigation.state}...</span>}
      </nav>
      <main style={{ opacity: navigation.state === "loading" ? 0.5 : 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
