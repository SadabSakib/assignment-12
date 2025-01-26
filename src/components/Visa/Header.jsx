// import React, { useContext } from "react";
// import ThemeToggle from "./ThemeToggle";
// import { NavLink } from "react-router-dom";
// import { AuthContext } from "../../provider/AuthProvider";
// import useAdmin from "../hooks/useAdmin";

// const Header = () => {
//   const {
//     user,
//     setUser,
//     loading,
//     creatUser,
//     signInUser,
//     handleGoogleSignIn,
//     resetPass,
//     handleSignOut,
//   } = useContext(AuthContext);
//   const [isAdmin] = useAdmin();

//   // user?condition?'double true':'one true':'false'
//   console.log(user);
//   return (
//     <div>
//       <nav className="navbar bg-base-100">
//         {" "}
//         <div className="navbar-start">
//           {" "}
//           <a className="btn btn-ghost normal-case text-xl">
//             Visa Navigator
//           </a>{" "}
//         </div>{" "}
//         <div className="navbar-center hidden lg:flex">
//           {" "}
//           <ul className="menu menu-horizontal px-1">
//             {" "}
//             <li>
//               {" "}
//               <NavLink to="/" activeClassName="active">
//                 Home
//               </NavLink>{" "}
//             </li>{" "}
//             <li>
//               {" "}
//               <NavLink to="/all-visas" activeClassName="active">
//                 All Visas
//               </NavLink>{" "}
//             </li>{" "}
//             <li>
//               {user ? (
//                 isAdmin ? (
//                   <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
//                 ) : (
//                   <NavLink to="/dashboard/userHome">Dashboard</NavLink>
//                 )
//               ) : (
//                 "false"
//               )}
//             </li>
//             <li>
//               {" "}
//               <NavLink to="/add-visa" activeClassName="active">
//                 Add Visa
//               </NavLink>{" "}
//             </li>{" "}
//             <li>
//               {" "}
//               <NavLink to="/my-added-visas" activeClassName="active">
//                 My Added Visas
//               </NavLink>{" "}
//             </li>{" "}
//             <li>
//               {" "}
//               <NavLink to="/my-visa-applications" activeClassName="active">
//                 My Visa Applications
//               </NavLink>{" "}
//             </li>{" "}
//           </ul>{" "}
//         </div>{" "}
//         <div className=" flex justify-around">
//           {" "}
//           {user ? (
//             <>
//               <img
//                 src={user?.photoURL}
//                 className="rounded-full w-9 mx-3"
//                 alt=""
//               />
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => handleSignOut()}
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <NavLink to="/login" className="btn btn-success ">
//               Login
//             </NavLink>
//           )}{" "}
//           {/* <NavLink to="/register" className="btn">
//               Register
//             </NavLink>{" "} */}
//           <ThemeToggle />
//         </div>{" "}
//       </nav>
//     </div>
//   );
// };

// export default Header;
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
          <span className="text-xl font-bold">Website Name</span>
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
          <Link to="/packages" className="mr-4">
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
