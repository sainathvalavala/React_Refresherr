import { useState } from "react";

// Higher-order component (HOC): a FUNCTION that takes a component and
// returns a NEW component with extra behavior. Popular before hooks (e.g.
// Redux's old connect(), React Router's old withRouter()).
// withLoading adds an isLoading prop: while true, show a spinner instead.
function withLoading(WrappedComponent) {
  function WithLoading({ isLoading, ...props }) {
    if (isLoading) return <p className="skeleton">⏳ Loading...</p>;
    return <WrappedComponent {...props} />;
  }
  return WithLoading;
}

function UserCard({ name, role }) {
  return (
    <p className="card">
      {name}: {role}
    </p>
  );
}

// Created ONCE at module level. Calling withLoading inside a component
// would make a new component type every render, which resets its state.
const UserCardWithLoading = withLoading(UserCard);

function HocDemo() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="stack">
      <UserCardWithLoading isLoading={isLoading} name="Priya" role="Designer" />
      <div className="row">
        <button onClick={() => setIsLoading(!isLoading)}>Toggle isLoading</button>
      </div>
    </div>
  );
}

export default HocDemo;
