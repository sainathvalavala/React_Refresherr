import { useState } from "react";

const allTopics = ["Hooks", "Routing", "Testing", "TypeScript"];

// Every input type, controlled. The key differences:
//   text / textarea / select -> value + e.target.value
//   checkbox                 -> checked + e.target.checked (a boolean)
//   radio group              -> checked={value === option}; same name groups them
//   several checkboxes       -> an array in state; add or remove on change
function PreferencesForm() {
  const [prefs, setPrefs] = useState({
    plan: "free",
    country: "IN",
    newsletter: false,
    topics: ["Hooks"],
    bio: "",
  });

  function update(field, value) {
    setPrefs({ ...prefs, [field]: value });
  }

  function toggleTopic(topic) {
    const topics = prefs.topics.includes(topic)
      ? prefs.topics.filter((t) => t !== topic)
      : [...prefs.topics, topic];
    update("topics", topics);
  }

  return (
    <div className="grid">
      <div className="stack">
        <strong>Plan (radio)</strong>
        {["free", "pro", "team"].map((plan) => (
          <label key={plan} className="row">
            <input
              type="radio"
              name="plan"
              value={plan}
              checked={prefs.plan === plan}
              onChange={(e) => update("plan", e.target.value)}
            />
            {plan}
          </label>
        ))}

        <label className="stack">
          <strong>Country (select)</strong>
          <select value={prefs.country} onChange={(e) => update("country", e.target.value)}>
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
          </select>
        </label>

        <label className="row">
          <input
            type="checkbox"
            checked={prefs.newsletter}
            onChange={(e) => update("newsletter", e.target.checked)}
          />
          <strong>Newsletter (checkbox)</strong>
        </label>

        <strong>Topics (several checkboxes)</strong>
        {allTopics.map((topic) => (
          <label key={topic} className="row">
            <input type="checkbox" checked={prefs.topics.includes(topic)} onChange={() => toggleTopic(topic)} />
            {topic}
          </label>
        ))}

        <label className="stack">
          <strong>Bio (textarea)</strong>
          <textarea value={prefs.bio} onChange={(e) => update("bio", e.target.value)} rows={2} />
        </label>
      </div>
      <div className="stack">
        <strong>State, live</strong>
        <pre className="code">
          <code>{JSON.stringify(prefs, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}

export default PreferencesForm;
