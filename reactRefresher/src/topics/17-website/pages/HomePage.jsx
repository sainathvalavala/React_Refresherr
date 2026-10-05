import { Link } from "react-router-dom";
import { recipes } from "../recipes";

function HomePage() {
  return (
    <div className="stack">
      <h4>Welcome to Recipe Box</h4>
      <p>We have {recipes.length} quick recipes for you.</p>
      <Link to="/recipes">Browse recipes</Link>
    </div>
  );
}

export default HomePage;
