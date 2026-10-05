import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// The component under test: it reads theme from context and calls
// toggleTheme when clicked.
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`theme-box theme-${theme}`}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}

export default ThemeToggle;
