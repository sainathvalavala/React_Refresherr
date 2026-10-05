import { Link, Outlet } from "react-router-dom";

// Layout: a component with the parts every page shares (header, nav, footer).
// <Outlet /> is the placeholder where the matched child route's page appears.
// The header and footer stay mounted while only the Outlet content changes.
function MainLayout() {
  return (
    <div className="layout">
      <header className="layout-header">
        <strong>MySite</strong>
        <nav className="row">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Log in</Link>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">Footer: same on every page</footer>
    </div>
  );
}

export default MainLayout;
