// A CONTROLLED component: it has no state of its own. The parent decides
// the value and gets told about changes through onChange.
// "Data flows down (value), events flow up (onChange)."
function TemperatureInput({ scale, value, onChange }) {
  return (
    <label className="row">
      {scale === "c" ? "Celsius" : "Fahrenheit"}
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export default TemperatureInput;
