// Composition version: Page receives a ready-made header element and
// places it. No user prop passes through here.
function ComposedPage({ header }) {
  return (
    <div className="nested">
      Page (places the header it was given)
      {header}
    </div>
  );
}

export default ComposedPage;
