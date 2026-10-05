// Inline styles shine when a value is computed at runtime, like a width
// that comes from a prop. A CSS file can't know the number in advance.
function ProgressBar({ percent }) {
  const color = percent < 40 ? "tomato" : percent < 80 ? "orange" : "seagreen";

  return (
    <div style={{ height: 14, borderRadius: 7, background: "var(--border)", overflow: "hidden" }}>
      <div
        style={{
          width: `${percent}%`, // a string, because "%" is not px
          height: "100%",
          background: color,
          transition: "width 0.2s, background 0.2s",
        }}
      />
    </div>
  );
}

export default ProgressBar;
