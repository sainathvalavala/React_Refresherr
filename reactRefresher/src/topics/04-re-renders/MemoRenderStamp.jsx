import { memo } from "react";
import RenderStamp from "../../components/RenderStamp";

// memo(): wraps a component so React skips re-rendering it when its props
// are the same as last time, even if the parent re-renders.
export default memo(RenderStamp);
