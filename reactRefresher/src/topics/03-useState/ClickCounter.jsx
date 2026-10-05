import { useState } from "react";

// State belongs to each component INSTANCE. Rendering <ClickCounter />
// three times creates three separate counts that don't affect each other.
function ClickCounter() {
  const [clicks, setClicks] = useState(0);

  return <button onClick={() => setClicks(clicks + 1)}>Clicks: {clicks}</button>;
}

export default ClickCounter;
