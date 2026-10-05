import { createContext } from "react";

// Step 1, create the context. The argument is the DEFAULT value, used only
// when a component reads the context without any provider above it.
// It lives in its own file so any component can import it.
export const UserContext = createContext({ user: "Guest", setUser: () => {} });
