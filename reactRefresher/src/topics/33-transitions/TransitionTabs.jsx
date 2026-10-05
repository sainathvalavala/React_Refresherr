import { useState, useTransition } from "react";
import SlowList from "./SlowList";

// useTransition: mark a state update as NON-URGENT.
//   const [isPending, startTransition] = useTransition();
//   startTransition(() => setTab("posts"));
// React keeps showing the current tab (still clickable!) while it renders
// the slow one in the background, and isPending lets you show a hint.
// Without it, the click freezes the page until the slow tab is done.
function TransitionTabs() {
  const [tab, setTab] = useState("about");
  const [useTransitionOn, setUseTransitionOn] = useState(true);
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab) {
    if (useTransitionOn) {
      startTransition(() => setTab(nextTab));
    } else {
      setTab(nextTab);
    }
  }

  return (
    <div className="stack">
      <label className="row">
        <input type="checkbox" checked={useTransitionOn} onChange={(e) => setUseTransitionOn(e.target.checked)} />
        Use startTransition
      </label>
      <div className="row">
        {["about", "posts", "contact"].map((name) => (
          <button key={name} onClick={() => selectTab(name)} style={{ fontWeight: tab === name ? 700 : 400 }}>
            {name}
            {name === "posts" && " (slow)"}
          </button>
        ))}
        {isPending && <span>⏳ Loading tab...</span>}
      </div>
      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        {tab === "about" && <p>About: click "posts", then quickly click "contact".</p>}
        {tab === "posts" && <SlowList text="Post" />}
        {tab === "contact" && <p>Contact: you got here without waiting for posts.</p>}
      </div>
    </div>
  );
}

export default TransitionTabs;
