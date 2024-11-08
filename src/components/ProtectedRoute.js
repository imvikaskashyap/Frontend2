'use client';
import { useAuth } from "../contexts/AuthContext";
import NotFoundPage from "../components/NotFoundPage";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // If the user is not authenticated or doesn’t have an allowed role, show `NotFoundPage`
  if (!user || !allowedRoles.includes(user.role)) {
    return <NotFoundPage />;
  }

  // Render children if the user is authenticated and has the required role
  return children;
};

export default ProtectedRoute;
