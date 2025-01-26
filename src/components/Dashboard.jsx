import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import useAdmin from "./hooks/useAdmin";
import useAxiosSecure from "./hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`applyvisa/${user?.email}`)
      .then((res) => setVisas(res.data));
  }, [user?.email]);
  console.log(visas?.length);

  let [isAdmin] = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">Manage profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">My Assigned Tours</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">Add Stories</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">Manage Stories</NavLink>
              </li>
              {/* <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li> */}
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">Manage profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userHome">My Bookings</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userHome">Manage Stories</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userHome">Add Stories</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userHome">Join as tour guide</NavLink>
              </li>
              {/* <li>
                <NavLink to="/dashboard/paymentHistory">
                  Real Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendar></FaCalendar>
                  Reservation
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart ({cart.length})
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink to="/my-visa-applications">
                  My Applied Visas({visas?.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaAd></FaAd>
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaList></FaList>
                  My Bookings
                </NavLink>
              </li> */}
            </>
          )}
          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch></FaSearch>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="container mx-auto mt-10">
        {/* <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Users</th>
              <th className="border border-gray-300 px-4 py-2">Email </th>
              <th className="border border-gray-300 px-4 py-2">
                Creation Time{" "}
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Last Login Time{" "}
              </th>
              <th className="border border-gray-300 px-4 py-2">Action </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {user?.displayName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.creationTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.lastSignInTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-purple-700 p-2 border rounded-lg m-2">
                    Edit
                  </button>
                  <button
                    onClick={() => handleUserDelete(user._id)}
                    className="bg-red-500 p-2 border rounded-lg m-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              // <p key={idx}>{ user?.name}</p>
            ))}
          </tbody>
        </table> */}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
