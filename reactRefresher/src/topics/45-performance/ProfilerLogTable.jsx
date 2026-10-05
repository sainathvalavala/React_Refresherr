import { useSyncExternalStore } from "react";
import { profilerLog } from "./profilerLog";

function ProfilerLogTable() {
  const entries = useSyncExternalStore(profilerLog.subscribe, profilerLog.getSnapshot);

  return (
    <div className="stack">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>phase</th>
            <th>actualDuration</th>
            <th>baseDuration</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.n}>
              <td>{entry.n}</td>
              <td>{entry.phase}</td>
              <td>{entry.actual} ms</td>
              <td>{entry.base} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <button onClick={() => profilerLog.clear()}>Clear log</button>
      </div>
    </div>
  );
}

export default ProfilerLogTable;
