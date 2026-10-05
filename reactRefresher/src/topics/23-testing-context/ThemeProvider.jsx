import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

// Provider component: owns the theme state and shares it, plus a function to
// change it, with everything rendered inside it (children, topic 8).
function ThemeProvider({ children, initialTheme = "light" }) {
  const [theme, setTheme] = useState(initialTheme);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

export default ThemeProvider;
