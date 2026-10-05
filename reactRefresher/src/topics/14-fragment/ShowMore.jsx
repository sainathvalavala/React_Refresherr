import { useState } from "react";

// Grouping elements for a condition: && needs ONE value on its right side,
// so several paragraphs are wrapped in a Fragment, without adding a <div>.
function ShowMore() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="stack">
      <p>React is a library for building user interfaces.</p>
      {isOpen && (
        <>
          <p>It was created at Facebook and released in 2013.</p>
          <p>Hooks arrived in React 16.8, in 2019.</p>
        </>
      )}
      <div className="row">
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Show less" : "Show more"}</button>
      </div>
    </div>
  );
}

export default ShowMore;
