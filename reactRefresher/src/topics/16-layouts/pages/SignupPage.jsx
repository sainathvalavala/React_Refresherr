import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="stack">
      <h4>Sign up</h4>
      <input placeholder="Name" />
      <input placeholder="Email" />
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default SignupPage;
