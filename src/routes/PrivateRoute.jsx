import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  console.log(currentUser);

  if (currentUser?.role) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}
