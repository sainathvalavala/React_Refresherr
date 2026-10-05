import { useState } from "react";
import { TabsContext } from "./TabsContext";
import Tab from "./Tab";
import TabPanel from "./TabPanel";

// Compound components: several components that work together like
// <select> and <option>. The parent holds the shared state and provides it
// through context; the parts read it. Users arrange the parts however they
// like, with no props to wire between them.
//   <Tabs defaultValue="a">
//     <Tabs.Tab value="a">A</Tabs.Tab>
//     <Tabs.Panel value="a">...</Tabs.Panel>
//   </Tabs>
function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);

  return <TabsContext value={{ active, setActive }}>{children}</TabsContext>;
}

// Attaching the parts as properties gives a tidy API: Tabs.Tab, Tabs.Panel
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export default Tabs;
