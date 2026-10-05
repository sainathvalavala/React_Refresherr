import { useLoaderData } from "react-router-dom";

// Only reachable when accountLoader didn't redirect, so user always exists here.
function AccountPage() {
  const { user } = useLoaderData();

  return <p className="card">🔒 Welcome to your account, {user.name}!</p>;
}

export default AccountPage;
