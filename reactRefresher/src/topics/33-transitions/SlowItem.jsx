// Deliberately slow to render: the loop burns time on every render, so a
// list of 250 of these takes a noticeable moment, like a big table or chart.
function SlowItem({ text }) {
  let wasted = 0;
  for (let i = 0; i < 150000; i++) wasted += i;

  return <li data-wasted={wasted > 0}>{text}</li>;
}

export default SlowItem;
