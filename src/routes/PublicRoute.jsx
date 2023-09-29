import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { currentUser } = useAuth();

  const { state } = useLocation();
  const route = state?.from?.pathname || "/";

  return !currentUser ? children : <Navigate to={route} />;
}
