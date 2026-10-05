import { Link, Outlet } from "react-router-dom";

// Nested layout: a layout inside another layout. Every /dashboard/* page gets
// this sidebar AND the MainLayout header/footer around it.
//
// <Outlet context={...}> passes data down to whichever page is rendered in
// the outlet. The page reads it with useOutletContext().
function DashboardLayout() {
  const user = { name: "Priya", plan: "Pro" };

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </aside>
      <div>
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}

export default DashboardLayout;
