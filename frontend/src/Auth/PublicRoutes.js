import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "../components/assets/Spinner";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  // BLOCKING THE AUTHENTICATED USER TO CHECK FOR PUBLIC PAGES LIKE LOGIN OR SIGN UP!
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
