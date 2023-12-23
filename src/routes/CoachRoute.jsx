import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const CoachRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser?.role === "sadmin" ||
    currentUser?.role === "admin" ||
    currentUser?.role === "coach" ||
    currentUser?.role === "sub_coach" ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
};
