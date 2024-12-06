import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // VALidating the auth token
        await axios.get("http://localhost:8000/validate-token/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUserType(decodedToken.user_type);
      } catch (error) {
        // IF THE TOKEN IS INVALID, WE SHOULD DELETE USER SESSION
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkTokenValidity();
  }, []);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setIsAuthenticated(true);
    setUserType(decodedToken.user_type);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem("token");
  };

  const value = {
    isAuthenticated,
    userType,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
