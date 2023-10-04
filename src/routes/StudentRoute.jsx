import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const StudentRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser?.role === "student" ? children : <Navigate to={"/"} />;
};
