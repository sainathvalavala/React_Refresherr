import { useState } from "react";

// Element variable: when there are more than two cases, decide with a normal
// if / else if chain ABOVE the return, store the JSX in a variable, then
// drop the variable into the JSX. Much easier to read than nested ternaries.
function WeatherAdvice() {
  const [temperature, setTemperature] = useState(25);

  let advice;
  if (temperature < 10) {
    advice = <p>🧥 It's cold. Wear a jacket.</p>;
  } else if (temperature < 25) {
    advice = <p>🙂 Pleasant. A t-shirt is fine.</p>;
  } else if (temperature < 35) {
    advice = <p>☀️ Warm. Drink some water.</p>;
  } else {
    advice = <p>🔥 Very hot! Stay indoors.</p>;
  }

  return (
    <div className="stack">
      <label className="row">
        Temperature: {temperature}°C
        <input
          type="range"
          min="0"
          max="45"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
        />
      </label>
      {advice}
    </div>
  );
}

export default WeatherAdvice;
