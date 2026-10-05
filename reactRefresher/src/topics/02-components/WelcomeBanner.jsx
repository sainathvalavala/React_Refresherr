import Greeting from "./Greeting";

// Composition: components can render other components, like building blocks.
// JSX rules: return ONE parent element, use className instead of class, and
// close every tag (<br />, <img />).
function WelcomeBanner() {
  return (
    <div className="banner">
      <strong>Welcome banner</strong>
      <Greeting />
      <br />
      <small>This banner is a component that uses the Greeting component.</small>
    </div>
  );
}

export default WelcomeBanner;
