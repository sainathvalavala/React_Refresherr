import { Profiler, useState } from "react";
import SlowList from "../33-transitions/SlowList";
import { profilerLog } from "./profilerLog";
import ProfilerLogTable from "./ProfilerLogTable";

let renderNumber = 0;

// <Profiler id onRender> measures how long its subtree took to render.
// onRender gets (id, phase, actualDuration, baseDuration, ...):
//   phase          -> "mount" (first time) or "update"
//   actualDuration -> time spent rendering THIS commit (low when memo skips work)
//   baseDuration   -> estimated time to render the whole subtree with no memo
function recordRender(id, phase, actualDuration, baseDuration) {
  renderNumber += 1;
  profilerLog.add({
    n: renderNumber,
    phase,
    actual: actualDuration.toFixed(1),
    base: baseDuration.toFixed(1),
  });
}

// SlowList (from topic 33) is wrapped in memo():
//   "Change the data" -> its prop changes, so it really re-renders: high actualDuration
//   "Unrelated update" -> its prop is the same, so memo skips it: actualDuration ~0
function ProfilerDemo() {
  const [label, setLabel] = useState("Row");
  const [ticks, setTicks] = useState(0);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={() => setLabel(label === "Row" ? "Item" : "Row")}>Change the data</button>
        <button onClick={() => setTicks(ticks + 1)}>Unrelated update ({ticks})</button>
      </div>
      <div className="grid">
        <Profiler id="SlowList" onRender={recordRender}>
          <SlowList text={label} />
        </Profiler>
        <ProfilerLogTable />
      </div>
    </div>
  );
}

export default ProfilerDemo;
