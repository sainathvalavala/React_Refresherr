import { Link, Outlet } from "react-router-dom";

// A completely different layout for login/signup: no site header or footer,
// just a centered card. It's used as a PATHLESS layout route:
//   <Route element={<AuthLayout />}>   <- no path: adds no URL segment
//     <Route path="/login" ... />
//     <Route path="/signup" ... />
//   </Route>
function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <Outlet />
        <Link to="/">← Back to site</Link>
      </div>
    </div>
  );
}

export default AuthLayout;
