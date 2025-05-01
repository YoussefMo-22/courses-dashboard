// src/Components/Layout/Navbar/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function Navbar() {
  const { loggedInUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <Link className="text-xl font-bold">EduVerse</Link>

      <div className="space-x-4 flex items-center">
        {loggedInUser ? (
          <>
            <span className="text-sm mr-2">Welcome, <strong>{loggedInUser.username}</strong></span>
            <Link to="/courses" className="hover:underline">Courses</Link>
            <button
              onClick={logout}
              className="hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
