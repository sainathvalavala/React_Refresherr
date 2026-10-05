import { useState } from "react";

// Uncontrolled form: the DOM keeps the values, not React. There's no state
// per field and no onChange. defaultValue sets the starting value only.
// On submit, FormData reads every field that has a name attribute.
// Simpler for forms where you only need the values at the end.
function FeedbackFormUncontrolled() {
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Object.fromEntries turns the name/value pairs into a plain object
    setResult(Object.fromEntries(formData));
    e.currentTarget.reset(); // back to the defaultValues
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <label htmlFor="feedback-city">City</label>
      <input id="feedback-city" name="city" defaultValue="Hyderabad" />

      <label htmlFor="feedback-rating">Rating</label>
      <select id="feedback-rating" name="rating" defaultValue="5">
        <option value="5">5: Excellent</option>
        <option value="3">3: Okay</option>
        <option value="1">1: Poor</option>
      </select>

      <label htmlFor="feedback-comment">Comment</label>
      <textarea id="feedback-comment" name="comment" rows={2} defaultValue="" />

      <div className="row">
        <button type="submit">Send feedback</button>
      </div>
      {result && <code>{JSON.stringify(result)}</code>}
    </form>
  );
}

export default FeedbackFormUncontrolled;
