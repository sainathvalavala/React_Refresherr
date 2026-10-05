import { useNavigate, useParams } from "react-router-dom";

// URL parameters: in the route path "/users/:id", ":id" matches any value.
// useParams() returns it as a STRING, e.g. { id: "7" } for /users/7.
// Convert it with Number(id) if you need a number.
function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="stack">
      <h4>User page</h4>
      <p>Showing the profile for user id: {id}</p>
      <div className="row">
        {/* navigate(-1) = the browser's back button */}
        <button onClick={() => navigate(-1)}>← Back</button>
        <button onClick={() => navigate(`/users/${Number(id) + 1}`)}>Next user</button>
      </div>
    </div>
  );
}

export default UserPage;
