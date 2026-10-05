import useToggle from "./useToggle";

// Two independent toggles from one hook, each named for its own purpose.
function ToggleDemo() {
  const [isDetailsOpen, toggleDetails] = useToggle();
  const [isMuted, toggleMuted] = useToggle(true);

  return (
    <div className="stack">
      <div className="row">
        <button onClick={toggleDetails}>{isDetailsOpen ? "Hide" : "Show"} details</button>
        <button onClick={toggleMuted}>{isMuted ? "🔇 Unmute" : "🔊 Mute"}</button>
      </div>
      {isDetailsOpen && <p>Here are the details!</p>}
    </div>
  );
}

export default ToggleDemo;
