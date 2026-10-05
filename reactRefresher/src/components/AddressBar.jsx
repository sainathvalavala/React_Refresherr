import { useLocation } from "react-router-dom";

// AddressBar: shows the current route path, because the router demos use
// MemoryRouter, which keeps the URL in memory instead of the browser's
// address bar. useLocation() works only inside a router.
function AddressBar() {
  const location = useLocation();
  return (
    <p className="address-bar">
      localhost{location.pathname}
      {location.search}
    </p>
  );
}

export default AddressBar;
