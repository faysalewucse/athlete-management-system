import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SocialAuthRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (currentUser?.role) {
    return children;
  }

  return <Navigate to="/social-register" state={{ from: location }} replace />;
}
