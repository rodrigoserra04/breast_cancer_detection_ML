import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "../components/assets/Spinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userType, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  // Redirect the user to the login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect users with the wrong role to the main page
  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
