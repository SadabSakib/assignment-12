import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";
import logo from "../../assets/logo.jpg"; // Replace with the path to your logo image

import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, handleSignOut } = useContext(AuthContext);

  const handleLogout = () => {
    handleSignOut();
  };

  return (
    <nav className="navbar bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-2" />
          <span className="text-xl font-bold">Tourist Ninja</span>
        </div>
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/community" className="mr-4">
            Community
          </Link>
          <Link to="/about" className="mr-4">
            About Us
          </Link>
          <Link to="/AllTrips" className="mr-4">
            Trips
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register" className="mr-4">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={() =>
                  document.getElementById("dropdown").classList.toggle("hidden")
                }
              />
              <div
                id="dropdown"
                className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl hidden"
              >
                <p className="px-4 py-2 text-gray-700">{user.displayName}</p>
                <p className="px-4 py-2 text-gray-700">{user.email}</p>
                <Link to="/dashboard" className="block px-4 py-2 text-gray-700">
                  Dashboard
                </Link>
                <Link
                  to="/offer-announcements"
                  className="block px-4 py-2 text-gray-700"
                >
                  Offer Announcements
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
