// This sibling only READS the shared count, so it receives it as a prop.
function CountDisplay({ count }) {
  return <p className="big">{count}</p>;
}

export default CountDisplay;
