import { use } from "react";

// use(promise) (topic 34) suspends this component until the promise
// resolves. Suspense works the same way for lazy code and for data.
function DelayedText({ promise }) {
  const text = use(promise);
  return <p className="card">✅ {text}</p>;
}

export default DelayedText;
