import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import Navbar from "../components/Navbar";
import Spinner from "../components/assets/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      const token = response.data.access_token;
      login(token);
      navigate("/");
    } catch (error) {
      setError("Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full p-6 sm:p-12">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
            Login
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <Spinner />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-lg text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
