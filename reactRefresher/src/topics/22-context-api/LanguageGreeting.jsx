import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

const greetings = { English: "Hello", Telugu: "Namaskaram", Hindi: "Namaste" };

// useContext returns the value of the NEAREST provider above this
// component. Rendered in different places, the same component gets
// different values.
function LanguageGreeting() {
  const language = useContext(LanguageContext);

  return (
    <p className="nested">
      {greetings[language]}! (language = {language})
    </p>
  );
}

export default LanguageGreeting;
