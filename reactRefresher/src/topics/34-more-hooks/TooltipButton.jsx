import { useState } from "react";
import Tooltip from "./Tooltip";

function TooltipButton({ label, tip }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="tooltip-anchor">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {label}
      </button>
      {isHovered && <Tooltip text={tip} />}
    </span>
  );
}

export default TooltipButton;
