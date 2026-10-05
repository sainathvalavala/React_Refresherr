import { useOutletContext } from "react-router-dom";

// useOutletContext(): read the data the parent layout passed via
// <Outlet context={...} />. No props needed.
function OverviewPage() {
  const { user } = useOutletContext();

  return (
    <p>
      Dashboard overview for {user.name} ({user.plan} plan): rendered inside two layouts.
    </p>
  );
}

export default OverviewPage;
