// Composition version: Header no longer knows about user at all. It just
// renders whatever it was given as children.
function ComposedHeader({ children }) {
  return (
    <div className="nested">
      Header (renders children, knows nothing about user)
      {children}
    </div>
  );
}

export default ComposedHeader;
