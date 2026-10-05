// map(): turns an array of data into an array of JSX elements. Wrap the JSX
// in parentheses so the arrow function RETURNS it. With curly braces you
// would need an explicit return, or every item becomes undefined.
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];

  return (
    <ul>
      {numbers.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}

export default NumberList;
