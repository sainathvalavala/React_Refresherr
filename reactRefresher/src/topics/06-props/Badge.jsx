// Two more prop tricks:
//   1. Boolean shorthand: <Badge highlighted /> is the same as highlighted={true}.
//   2. JSX as a prop: icon={<span>⭐</span>} passes ready-made JSX for the
//      child to place wherever it wants.
function Badge({ text, icon = null, highlighted = false }) {
  return (
    <span className={highlighted ? "badge highlighted" : "badge"}>
      {icon} {text}
    </span>
  );
}

export default Badge;
