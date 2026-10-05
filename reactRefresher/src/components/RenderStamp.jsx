// RenderStamp: prints the time it last rendered. If the time changes, React
// called this component function again (a re-render). Used by topics 4, 20 and 24.
function RenderStamp({ label }) {
  console.log(`${label} rendered`);

  // Reading the clock during render is deliberately impure: it is what lets
  // us see each render. Real components should not do this.
  const time = new Date().toISOString().slice(11, 23);

  return (
    <p className="render-stamp">
      {label}: rendered at <code>{time}</code>
    </p>
  );
}

export default RenderStamp;
