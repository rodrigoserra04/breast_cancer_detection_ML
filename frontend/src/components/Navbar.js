import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, logout, userType } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col p-4 h-screen">
      <div className="mb-6">
        <img
          src="/logo.ico"
          alt="Logo"
          className="h-16 w-16 mx-auto rounded-full"
        />
        <h1 className="text-center text-2xl font-bold mt-2">Breast Cancer Prediction - ML</h1>
      </div>
      <nav className="flex-grow">
        <ul>
          {isAuthenticated ? (
            <>
              <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
                <Link to="/" className="block text-white">Home</Link>
                </li>
              <li className="py-2 px-4 rounded hover:bg-blue-500 transition block text-white" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                Logout
              </li>
              
              {userType === "doctor" && (
                <>
                  <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
                    <Link to="/predictions-doctor" className="block text-white">Predictions (Doctor)</Link>
                    </li>
                  <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
                    <Link to="/explain-doctor" className="block text-white">Prediction Analytics (Doctor)</Link>
                  </li>
                </>
              )}
              {userType === "patient" && (
                <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
                  <Link to="/predictions" className="block text-white">Predictions</Link>
                </li>
              )}
            </>
          ) : (
            <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
              <Link to="/login" className="block text-white">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <Footer/>
    </aside>
  );
}

export default Navbar;
