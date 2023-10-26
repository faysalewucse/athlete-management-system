import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const AthleteRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser?.role === "sadmin" ||
    currentUser?.role === "admin" ||
    currentUser?.role === "athlete" ||
    currentUser?.role === "coach" ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
};
