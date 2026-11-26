
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../auth";

export default function ProtectedRoute({ children, role }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    const dashboardRoutes = {
      admin: "/admin",
      artist: "/artist",
      user: "/dashboard"
    };

    return (
      <Navigate
        to={dashboardRoutes[user.role] || "/"}
        replace
      />
    );
  }

  return children;
}
