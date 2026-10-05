import { useEffect, useState } from "react";

// Dependency array [count]: the effect runs after the first render and then
// again only when count changes. Updating document.title is a side effect,
// because it touches something outside React.
function TitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  return (
    <div className="stack">
      <p>Look at the browser tab title while you click.</p>
      <div className="row">
        <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
      </div>
    </div>
  );
}

export default TitleUpdater;
