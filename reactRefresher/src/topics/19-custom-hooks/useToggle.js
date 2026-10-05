import { useState } from "react";

// A custom hook can return whatever shape is most convenient. Returning an
// ARRAY (like useState does) lets each caller pick its own names:
//   const [isOpen, toggleOpen] = useToggle();
//   const [isDark, toggleDark] = useToggle(true);
export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((v) => !v);

  return [value, toggle];
}
