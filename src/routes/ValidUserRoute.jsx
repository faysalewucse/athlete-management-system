import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const ValidUserRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser?.role === "sadmin" ||
    currentUser?.role === "admin" ||
    currentUser?.role === "coach" ||
    currentUser?.role === "sub_coach" ||
    currentUser?.role === "parents" ||
    currentUser?.role === "athlete" ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
};
