import { useEffect } from "react";
import LoggedChild from "./LoggedChild";

// Order of mounting: React renders top-down (parent, then child) but runs
// effects bottom-up. The child's effects run BEFORE the parent's, because
// a parent isn't "mounted" until everything inside it is.
function LoggedParent({ count, setLog }) {
  useEffect(() => {
    setLog((log) => [...log, "Parent: mounted"]);
    return () => setLog((log) => [...log, "Parent: unmounted (cleanup)"]);
  }, [setLog]);

  return (
    <div className="nested">
      Parent
      <LoggedChild count={count} setLog={setLog} />
    </div>
  );
}

export default LoggedParent;
