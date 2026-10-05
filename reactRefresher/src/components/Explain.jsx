// Explain: a block of explanation text in a lesson, with no live demo.
// warning={true} switches to the red "common mistakes" style.
function Explain({ title, warning = false, children }) {
  return (
    <section className={warning ? "explain warning" : "explain"}>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export default Explain;
