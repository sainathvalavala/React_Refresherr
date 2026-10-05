// children: whatever you put BETWEEN a component's opening and closing tags
// (<Card>...</Card>) arrives as the special "children" prop. Card only
// provides the frame and doesn't need to know what goes inside.
function Card({ title, children }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

export default Card;
