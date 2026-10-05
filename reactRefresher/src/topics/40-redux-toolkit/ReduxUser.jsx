import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userSlice";

function ReduxUser() {
  const { status, data, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="stack">
      <div className="row">
        {[1, 2, 3].map((id) => (
          <button key={id} onClick={() => dispatch(fetchUser(id))}>
            Load user {id}
          </button>
        ))}
      </div>
      {status === "idle" && <p>No user loaded.</p>}
      {status === "loading" && <p className="skeleton">⏳ Loading...</p>}
      {status === "error" && <p className="error-box">Error: {error}</p>}
      {status === "success" && (
        <p className="card">
          {data.name} ({data.email})
        </p>
      )}
    </div>
  );
}

export default ReduxUser;
