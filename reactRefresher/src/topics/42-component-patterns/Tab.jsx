import { useContext } from "react";
import { TabsContext } from "./TabsContext";

function Tab({ value, children }) {
  const { active, setActive } = useContext(TabsContext);
  const isActive = active === value;

  return (
    <button role="tab" aria-selected={isActive} onClick={() => setActive(value)} style={{ fontWeight: isActive ? 700 : 400 }}>
      {children}
    </button>
  );
}

export default Tab;
