import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="stack">
      <h4>Log in</h4>
      <input placeholder="Email" />
      <input placeholder="Password" type="password" />
      <p>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
