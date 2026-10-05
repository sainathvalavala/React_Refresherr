import { useState } from "react";
import AccordionPanel from "./AccordionPanel";

// "Only one panel open at a time" is a rule about ALL the panels together,
// so no single panel can own it. The state is lifted to their parent,
// which stores which panel is active.
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="stack">
      <AccordionPanel title="What is state?" isActive={activeIndex === 0} onShow={() => setActiveIndex(0)}>
        <p>Data a component remembers between renders.</p>
      </AccordionPanel>
      <AccordionPanel title="What is lifting?" isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>
        <p>Moving state up to the closest parent that needs it.</p>
      </AccordionPanel>
      <AccordionPanel title="Why do it?" isActive={activeIndex === 2} onShow={() => setActiveIndex(2)}>
        <p>So siblings can stay in sync from one source of truth.</p>
      </AccordionPanel>
    </div>
  );
}

export default Accordion;
