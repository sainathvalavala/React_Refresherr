import { use } from "react";
import { LanguageContext } from "../22-context-api/LanguageContext";

// use(): a React 19 API that reads a context OR a promise. Unlike every
// other hook, it can be called inside if statements and loops.
//   use(SomeContext) -> like useContext, but allowed conditionally
//   use(promise)     -> suspends until it resolves (see topic 31)
function ConditionalContext({ showLanguage }) {
  if (!showLanguage) {
    return <p>Language hidden (use() was never called this render).</p>;
  }

  const language = use(LanguageContext); // ✅ allowed after an early return
  return <p>Language from context: {language}</p>;
}

export default ConditionalContext;
