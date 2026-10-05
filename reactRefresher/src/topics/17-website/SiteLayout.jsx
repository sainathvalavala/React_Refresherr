import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

// NavLink: a Link that knows whether its route is active. Its className can
// be a function that gets { isActive }, so the current page is highlighted.
// "end" makes "/" active only on the home page, not on every page.
//
// Shared state across pages: favorites lives HERE, in the layout, because
// the header (count) and several pages (detail, favorites) all need it.
// Lifting it to the layout (topic 20) and passing it through Outlet context
// lets every page read and change it.
function SiteLayout() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  function toggleFavorite(id) {
    setFavoriteIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <div className="layout">
      <header className="layout-header">
        <strong>Recipe Box</strong>
        <nav className="row">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/recipes" className={linkClass}>
            Recipes
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            ★ Favorites ({favoriteIds.length})
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>
      </header>
      <main className="layout-main">
        <Outlet context={{ favoriteIds, toggleFavorite }} />
      </main>
      <footer className="layout-footer">Made while learning React</footer>
    </div>
  );
}

export default SiteLayout;
