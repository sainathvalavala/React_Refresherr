import { useEffect, useState } from "react";

// A custom hook can hide an effect too: subscribe to the browser's resize
// event and unsubscribe in the cleanup. Components just get a number.
export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
