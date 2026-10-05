// This sibling only CHANGES the shared count, so it receives the setter.
function CountButtons({ setCount }) {
  return (
    <div className="row">
      <button onClick={() => setCount((c) => c - 1)}>-1</button>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}

export default CountButtons;
