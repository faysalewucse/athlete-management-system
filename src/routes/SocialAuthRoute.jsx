import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SocialAuthRoute({ children }) {
  const { currentUser } = useAuth();
  const isGoogleLoggedIn = localStorage.getItem("isGoogleLoggedIn");
  const isFbLoggedIn = localStorage.getItem("isFbLoggedIn");

  console.log({ currentUser });
  const location = useLocation();

  if (currentUser?.providerId === "firebase") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
}
