// Functions as props: the parent passes a function (onLike) down. The child
// calls it when clicked, which is how a child "talks back" to its parent.
// Naming convention: onSomething for the prop, handleSomething for the function.
function LikeButton({ label, onLike }) {
  return <button onClick={onLike}>Like {label}</button>;
}

export default LikeButton;
