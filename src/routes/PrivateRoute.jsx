import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}
