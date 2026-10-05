import { useRef } from "react";

const items = Array.from({ length: 30 }, (_, i) => `Message ${i + 1}`);

// Scrolling is a DOM operation React has no prop for, so we need the real
// element. One ref points at the scrollable container, another at one item.
function ScrollBox() {
  const boxRef = useRef(null);
  const targetRef = useRef(null);

  function scrollToTop() {
    boxRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToBottom() {
    boxRef.current.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }

  function scrollToTarget() {
    targetRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div className="stack">
      <div className="row">
        <button onClick={scrollToTop}>Top</button>
        <button onClick={scrollToTarget}>Message 20</button>
        <button onClick={scrollToBottom}>Bottom</button>
      </div>
      <ul ref={boxRef} className="scroll-box">
        {items.map((item, index) => (
          // Only message 20 gets the ref; ref={undefined} on the others is ignored
          <li key={item} ref={index === 19 ? targetRef : undefined}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScrollBox;
