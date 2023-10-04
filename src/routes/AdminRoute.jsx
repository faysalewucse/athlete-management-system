import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser?.role === "admin" ? children : <Navigate to={"/"} />;
};
