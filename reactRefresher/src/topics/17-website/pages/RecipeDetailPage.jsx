import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { recipes } from "../recipes";

// Detail page: read the id from the URL, find the matching item, and handle
// the case where nothing matches (conditional rendering, topic 7).
// The favorite button uses the shared state from SiteLayout's Outlet context.
function RecipeDetailPage() {
  const { recipeId } = useParams();
  const { favoriteIds, toggleFavorite } = useOutletContext();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return <p>No recipe called "{recipeId}".</p>;
  }

  const isFavorite = favoriteIds.includes(recipe.id);

  return (
    <div className="stack">
      <h4>{recipe.name}</h4>
      <p>Ready in {recipe.minutes} minutes.</p>
      <ol>
        {recipe.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="row">
        <button onClick={() => toggleFavorite(recipe.id)}>
          {isFavorite ? "★ Remove from favorites" : "☆ Add to favorites"}
        </button>
        {/* navigate(-1) returns to the previous URL, including its ?q= search */}
        <button onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
