import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const SuperAdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser?.role === "sadmin" ? children : <Navigate to={"/"} />;
};
