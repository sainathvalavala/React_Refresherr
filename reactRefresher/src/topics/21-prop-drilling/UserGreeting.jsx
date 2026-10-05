// The only component that actually USES user, three levels down.
function UserGreeting({ user }) {
  return (
    <p className="nested">
      UserGreeting: Hello, <strong>{user}</strong>!
    </p>
  );
}

export default UserGreeting;
