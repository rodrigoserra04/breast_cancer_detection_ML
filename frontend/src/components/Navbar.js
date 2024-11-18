import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-4 h-screen">
        <div className="mb-6">
          <img
            src="https://www.tailwindai.dev/placeholder.svg"
            alt="Logo"
            className="h-12 w-12 mx-auto rounded-full"
          />
          <h1 className="text-center text-2xl font-bold mt-2">Breast Cancer Prediction - ML</h1>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
              <Link to="/" className="block text-white">Home</Link>
              </li>
            <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
              <Link to="/predictions" className="block text-white">Predictions (Doctor)</Link>
              </li>
            <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
              <Link to="/explain-doctor" className="block text-white">Prediction Analytics (Doctor)</Link>
              </li>
            <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
              <Link to="/explain-patient" className="block text-white">Prediction Analytics (Patient)</Link>
            </li>
            <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
              <Link to="/login" className="block text-white">Login</Link>
            </li>
          </ul>
        </nav>
        <footer className="mt-auto text-center">
          <ul>
            <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
              <Link to="https://github.com/rodrigoserra04" className="text-sm">© 2024 Rodrigo Serra</Link>
            </li>
          </ul>
        </footer>
      </aside>
  );
}

export default Navbar;
