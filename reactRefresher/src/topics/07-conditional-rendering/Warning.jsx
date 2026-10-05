// Returning null: a component can decide to render nothing at all. The parent
// always writes <Warning message={...} />, and Warning itself decides whether
// to show up.
function Warning({ message }) {
  if (!message) {
    return null;
  }
  return <p className="error-box">⚠️ {message}</p>;
}

export default Warning;
