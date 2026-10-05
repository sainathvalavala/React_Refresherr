// A component is a JavaScript function that returns JSX. Its name must start
// with a capital letter, so React can tell <Greeting /> apart from an HTML tag.
function Greeting() {
  const name = "Arun";

  // JSX: HTML-like syntax inside JavaScript. Curly braces {} switch back to
  // JavaScript, so any expression (variable, maths, function call) can go there.
  return (
    <p>
      Hello, {name.toUpperCase()}! 2 + 2 = {2 + 2}
    </p>
  );
}

export default Greeting;
