import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="stack">
      <h4>404: Page not found</h4>
      <Link to="/">Back home</Link>
    </div>
  );
}

export default NotFoundPage;
