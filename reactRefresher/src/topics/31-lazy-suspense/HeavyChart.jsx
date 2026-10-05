const data = [
  { label: "Mon", value: 40 },
  { label: "Tue", value: 75 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 65 },
];

// Imagine this pulls in a big charting library. Loading it lazily keeps
// that weight out of the first page load for users who never open it.
function HeavyChart() {
  return (
    <svg viewBox="0 0 260 120" width="100%" style={{ maxWidth: 360 }} role="img" aria-label="Weekly visits chart">
      {data.map((d, i) => (
        <g key={d.label}>
          <rect x={10 + i * 50} y={100 - d.value} width="34" height={d.value} rx="4" fill="var(--accent)" />
          <text x={27 + i * 50} y="115" textAnchor="middle" fontSize="10" fill="currentColor">
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default HeavyChart;
