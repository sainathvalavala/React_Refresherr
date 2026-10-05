import { useState } from "react";
import TemperatureInput from "./TemperatureInput";

function toCelsius(f) {
  return ((f - 32) * 5) / 9;
}

function toFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

// Converts a typed string, or returns "" if it isn't a number yet
function convert(value, convertFn) {
  const number = parseFloat(value);
  if (Number.isNaN(number)) return "";
  return String(Math.round(convertFn(number) * 100) / 100);
}

// Single source of truth: if each input kept its own state, they'd drift
// apart. Instead the parent stores ONE temperature (plus which box was
// typed in) and CALCULATES the other box's value during render.
function TemperatureConverter() {
  const [temperature, setTemperature] = useState("100");
  const [scale, setScale] = useState("c");

  function handleCelsius(value) {
    setScale("c");
    setTemperature(value);
  }

  function handleFahrenheit(value) {
    setScale("f");
    setTemperature(value);
  }

  const celsius = scale === "c" ? temperature : convert(temperature, toCelsius);
  const fahrenheit = scale === "f" ? temperature : convert(temperature, toFahrenheit);

  return (
    <div className="stack">
      <TemperatureInput scale="c" value={celsius} onChange={handleCelsius} />
      <TemperatureInput scale="f" value={fahrenheit} onChange={handleFahrenheit} />
      <p>{parseFloat(celsius) >= 100 ? "💧 Water would boil." : "Water would not boil."}</p>
    </div>
  );
}

export default TemperatureConverter;
