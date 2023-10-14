import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser?.role === "admin" || currentUser?.role === "sadmin" ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
};
