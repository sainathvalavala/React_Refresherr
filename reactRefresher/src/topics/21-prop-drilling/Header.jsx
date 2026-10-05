import UserGreeting from "./UserGreeting";

// Header doesn't use user either, but must accept it to pass it on.
function Header({ user }) {
  return (
    <div className="nested">
      Header (just passing user down)
      <UserGreeting user={user} />
    </div>
  );
}

export default Header;
