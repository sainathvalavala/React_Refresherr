import { useNavigate } from "react-router-dom";

// useNavigate(): change the route from code, e.g. after a form submit or login,
// instead of the user clicking a <Link>.
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="stack">
      <h4>Home page</h4>
      <div className="row">
        <button onClick={() => navigate("/users/42")}>Go to user 42 from code</button>
      </div>
    </div>
  );
}

export default HomePage;
