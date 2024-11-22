import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "../components/assets/Spinner"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <Spinner/>
  }

  // Redirect the user to the login page if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
