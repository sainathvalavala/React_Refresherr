import { useContext } from "react";
import { TabsContext } from "./TabsContext";

function TabPanel({ value, children }) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div role="tabpanel">{children}</div>;
}

export default TabPanel;
