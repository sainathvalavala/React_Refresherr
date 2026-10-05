// Multiple "slots": children is just one slot. When a wrapper needs content
// in several places, take extra props that hold JSX (header, footer) and use
// children for the main body.
function Panel({ header, footer, children }) {
  return (
    <div className="panel">
      <div className="panel-header">{header}</div>
      <div className="panel-body">{children}</div>
      {footer && <div className="panel-footer">{footer}</div>}
    </div>
  );
}

export default Panel;
