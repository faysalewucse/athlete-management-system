import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const InstructorRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser?.role === "instructor" ? children : <Navigate to={"/"} />;
};
