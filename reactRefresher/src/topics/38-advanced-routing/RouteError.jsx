import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

// errorElement: shown instead of the route when its loader, action or
// component throws. Like an error boundary (topic 13), but per route.
// isRouteErrorResponse tells thrown responses (404s from loaders) apart
// from real JavaScript errors.
function RouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-box">
        <p>
          {error.status}: {error.data}
        </p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  return <p className="error-box">Unexpected error: {error.message}</p>;
}

export default RouteError;
