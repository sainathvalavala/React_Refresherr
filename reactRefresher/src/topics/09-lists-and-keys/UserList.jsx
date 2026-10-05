const users = [
  { id: 101, name: "Arun", role: "Developer" },
  { id: 102, name: "Priya", role: "Designer" },
  { id: 103, name: "Kiran", role: "Tester" },
];

// Keys: every item in a list needs a "key" prop that is unique among its
// siblings and stays the same between renders. A database id is ideal.
// filter() is often chained before map() to show only some items.
function UserList() {
  return (
    <ul>
      {users
        .filter((user) => user.role !== "Tester")
        .map((user) => (
          <li key={user.id}>
            {user.name}: {user.role}
          </li>
        ))}
    </ul>
  );
}

export default UserList;
