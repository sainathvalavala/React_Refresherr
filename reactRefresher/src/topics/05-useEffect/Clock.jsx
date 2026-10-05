import { useEffect, useState } from "react";

// Empty dependency array []: the effect runs once after the component first
// appears on screen (mounts). The function it returns is the CLEANUP, which
// React runs when the component is removed (unmounts). Without the cleanup,
// the interval would keep running forever.
function Clock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    console.log("Clock mounted: starting interval");
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      console.log("Clock unmounted: clearing interval");
      clearInterval(id);
    };
  }, []);

  return <p className="big">{time}</p>;
}

export default Clock;
