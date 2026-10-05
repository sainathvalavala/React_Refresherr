import { Link, useSearchParams } from "react-router-dom";
import { recipes } from "../recipes";

// Lists (topic 9) + routing: each item links to its own detail URL.
// The search box is stored in the URL (?q=...), so a filtered list can be
// bookmarked, and pressing Back from a recipe returns to the same search.
function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const matching = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="stack">
      <h4>All recipes</h4>
      <input
        value={query}
        onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        placeholder="Search recipes"
      />
      {matching.length === 0 ? (
        <p>No recipes match "{query}".</p>
      ) : (
        <ul>
          {matching.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link> ({recipe.minutes} min)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipesPage;
