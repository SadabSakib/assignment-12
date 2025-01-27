import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
  const laodedUser = useLoaderData();
  console.log(laodedUser);
  // const [users, setUsers] = useState(laodedUser);
  const [users, setUsers] = useState([]);

  axios
    .get("https://assignment-12-server-beige-two.vercel.app/users", {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      setUsers(res.data);
    });

  const handleUserDelete = (id) => {
    //   delete user from the mongodb database
    fetch(`https://assignment-12-server-beige-two.vercel.app/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("delete is done", data);
        if (data.deletedCount) {
          const remainingUsers = users?.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };
  console.log(users);
  return (
    <div>
      <div className="container mx-auto mt-10">
        <table className="table-auto w-full border-collapse border border-gray-300">
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
                  {user?.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user?.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user?.creationTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user?.lastSignInTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-purple-700 p-2 border rounded-lg m-2">
                    Edit
                  </button>
                  <button
                    onClick={() => handleUserDelete(user?._id)}
                    className="bg-red-500 p-2 border rounded-lg m-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
