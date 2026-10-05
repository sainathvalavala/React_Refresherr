import { createContext } from "react";

// Shared between <Tabs> and its parts. Not exported to users of Tabs: the
// parts find each other through it, so the user never wires any props.
export const TabsContext = createContext(null);
