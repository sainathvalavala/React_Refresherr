// if / else with early return: best when the two cases render very different
// JSX. A component can also return null to render nothing at all.
function LoginStatus({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Welcome back! You are logged in.</p>;
  }
  return <p>Please log in to continue.</p>;
}

export default LoginStatus;
