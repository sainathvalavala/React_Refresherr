import { startTransition, useOptimistic, useState } from "react";
import { sendComment } from "./fakeServer";
import SubmitButton from "./SubmitButton";

// useOptimistic: show the result BEFORE the server confirms it, so the UI
// feels instant. While the action runs, optimisticComments = comments plus
// the pending one. When the action ends, it falls back to the real
// comments: the saved comment if it worked, nothing extra if it failed
// (an automatic rollback).
function OptimisticComments() {
  const [comments, setComments] = useState([{ id: 1, text: "Great lesson!" }]);
  const [shouldFail, setShouldFail] = useState(false);
  const [error, setError] = useState(null);

  const [optimisticComments, addOptimisticComment] = useOptimistic(comments, (current, text) => [
    ...current,
    { id: `pending-${current.length}`, text, sending: true }, // unique even if posted twice quickly
  ]);

  async function postComment(formData) {
    const text = formData.get("text");
    if (!text) return;
    setError(null);
    addOptimisticComment(text);
    try {
      const saved = await sendComment(text, shouldFail);
      // State updates after an await must be wrapped in startTransition
      // to stay part of the action
      startTransition(() => setComments((current) => [...current, saved]));
    } catch (err) {
      startTransition(() => setError(err.message));
    }
  }

  return (
    <div className="stack">
      <ul>
        {optimisticComments.map((comment) => (
          <li key={comment.id} style={{ opacity: comment.sending ? 0.5 : 1 }}>
            {comment.text} {comment.sending && <small>(sending...)</small>}
          </li>
        ))}
      </ul>
      <form action={postComment} className="row">
        <input name="text" placeholder="Write a comment" />
        <SubmitButton>Post</SubmitButton>
      </form>
      <label className="row">
        <input type="checkbox" checked={shouldFail} onChange={(e) => setShouldFail(e.target.checked)} />
        Make the server fail (watch the rollback)
      </label>
      {error && <p className="field-error">❌ {error}. The comment was removed.</p>}
    </div>
  );
}

export default OptimisticComments;
