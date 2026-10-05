import useWindowWidth from "./useWindowWidth";

function WindowWidth() {
  const width = useWindowWidth();

  return (
    <p>
      Window width: <strong>{width}px</strong> ({width < 768 ? "mobile" : "desktop"} layout).
      Resize the window to see it update.
    </p>
  );
}

export default WindowWidth;
