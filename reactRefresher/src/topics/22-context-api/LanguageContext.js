import { createContext } from "react";

// A context holding a plain string. "English" is the default, used only by
// components with NO LanguageContext provider anywhere above them.
export const LanguageContext = createContext("English");
