import UserGreeting from "./UserGreeting";
import RenameButton from "./RenameButton";

// No user prop any more: Header doesn't need to know about it.
function Header() {
  return (
    <div className="nested">
      Header (no props)
      <UserGreeting />
      <RenameButton />
    </div>
  );
}

export default Header;
