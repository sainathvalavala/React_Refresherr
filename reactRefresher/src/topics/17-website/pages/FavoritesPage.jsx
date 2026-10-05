import { Link, useOutletContext } from "react-router-dom";
import { recipes } from "../recipes";

// Derived data: the favorites list isn't stored separately. It's computed
// from the shared favoriteIds every render, so it can never get out of sync.
function FavoritesPage() {
  const { favoriteIds, toggleFavorite } = useOutletContext();
  const favorites = recipes.filter((recipe) => favoriteIds.includes(recipe.id));

  if (favorites.length === 0) {
    return (
      <p>
        No favorites yet. Open a <Link to="/recipes">recipe</Link> and press ☆.
      </p>
    );
  }

  return (
    <div className="stack">
      <h4>Your favorites</h4>
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.id} className="row">
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            <button onClick={() => toggleFavorite(recipe.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
