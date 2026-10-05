import { createContext } from "react";

// Default value, used when there is no ThemeProvider above. One of the
// tests checks exactly this case.
export const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });
