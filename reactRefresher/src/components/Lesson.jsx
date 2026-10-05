// Lesson: the page frame every topic uses. It shows the topic number, title
// and a one-line definition, then renders the examples passed in as children.
function Lesson({ number, title, definition, children }) {
  return (
    <article className="lesson">
      <header className="lesson-header">
        <p className="lesson-number">Topic {number}</p>
        <h2>{title}</h2>
        <p className="definition">
          <strong>Definition: </strong>
          {definition}
        </p>
      </header>
      {children}
    </article>
  );
}

export default Lesson;
