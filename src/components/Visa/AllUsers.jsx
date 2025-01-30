// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// const AllUsers = () => {
//   // const [user, setUsers] = useState([]);

//   const axiosSecure = useAxiosSecure();
//   const axiosPublic=useAxiosPublic()
//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("users");
//       return res.data;
//     },
//   });
//   console.log(users);
//   const handleMakeAdmin = (user) => {
//     axiosPublic.patch(`users/admin/${user._id}`).then(() => {
//       Swal.fire(`${user.displayName} is admin now`);
//       refetch();
//     });
//   };
//   // const handleUserDelete = (id) => {
//   //     // delete user from the mongodb database
//   //   fetch(`https://assignment-12-server-beige-two.vercel.app/users/${id}`, {
//   //     method: "DELETE",
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       console.log("delete is done", data);
//   //       if (data.deletedCount) {
//   //         const remainingUsers = users?.filter((user) => user._id !== id);
//   //         setUsers(remainingUsers);
//   //       }
//   //     });
//   //   Swal.fire({
//   //     title: "Are you sure?",
//   //     text: "You won't be able to revert this!",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#3085d6",
//   //     cancelButtonColor: "#d33",
//   //     confirmButtonText: "Yes, delete it!",
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       axiosPublic.delete(`users/${id}`).then((res) => {
//   //         if (res.data.deletedCount > 0) {
//   //           refetch();
//   //           Swal.fire({
//   //             title: "Deleted!",
//   //             text: "Your file has been deleted.",
//   //             icon: "success",
//   //           });
//   //         }
//   //       });
//   //     }
//   //   });
//   // };

//   return (
//     <div>
//       total users {users?.length}
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Users</th>
//             <th className="border border-gray-300 px-4 py-2">Role </th>
//             <th className="border border-gray-300 px-4 py-2">Email </th>
//             <th className="border border-gray-300 px-4 py-2">Creation Time </th>
//             <th className="border border-gray-300 px-4 py-2">
//               Last Login Time{" "}
//             </th>
//             {/* <th className="border border-gray-300 px-4 py-2">Action </th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {users?.map((user, idx) => (
//             <tr key={idx} className="hover:bg-gray-100">
//               <td className="border border-gray-300 px-4 py-2">
//                 {user?.displayName}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.role === "admin" ? (
//                   "Admin"
//                 ) : (
//                   // <button onClick={() => handleMakeAdmin(user)}>
//                     <p>User</p>
//                   // </button>
//                 )}
//               </td>

//               <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.creationTime}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.lastSignInTime}
//               </td>
//               {/* <td className="border border-gray-300 px-4 py-2">
//                 <button className="bg-purple-700 p-2 border rounded-lg m-2">
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleUserDelete(user._id)}
//                   className="bg-red-500 p-2 border rounded-lg m-2"
//                 >
//                   Delete
//                 </button>
//               </td> */}
//             </tr>
//             // <p key={idx}>{ user?.name}</p>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUsers;

// import React, { useContext, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import Select from "react-select";
// // import useAxiosPublic from "../hooks/useAxiosPublic";
// import { AuthContext } from "../../provider/AuthProvider";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// // import { AuthContext } from "../provider/AuthProvider";

// const AllUsers = () => {
//   // const { user } = useContext(AuthContext);
//   const axiosPublic = useAxiosPublic();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRole, setSelectedRole] = useState({
//     value: "all",
//     label: "All",
//   });

//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users", searchTerm, selectedRole.value],
//     queryFn: async () => {
//       const res = await axiosPublic.get("users", {
//         // Correct API endpoint usage
//         params: {
//           search: searchTerm,
//           role: selectedRole.value,
//         },
//       });
//       console.log(users)
//       return res.data;
//     },
//   });

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     refetch();
//   };

//   const handleRoleChange = (selectedOption) => {
//     setSelectedRole(selectedOption);
//     refetch();
//   };

//   const roleOptions = [
//     { value: "all", label: "All" },
//     { value: "admin", label: "Admin" },
//     { value: "user", label: "User" },
//   ];

//   return (
//     <div className="container mx-auto p-8">
//       <div className="flex justify-between mb-4">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           placeholder="Search by name or email"
//           className="input input-bordered"
//         />
//         <Select
//           options={roleOptions}
//           value={selectedRole}
//           onChange={handleRoleChange}
//           className="w-64"
//         />
//       </div>
//       <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>
//       <div>Total users: {users?.length}</div>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Users</th>
//             <th className="border border-gray-300 px-4 py-2">Role</th>
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Creation Time</th>
//             <th className="border border-gray-300 px-4 py-2">
//               Last Login Time
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {users?.map((user, idx) => (
//             <tr key={idx} className="hover:bg-gray-100">
//               <td className="border border-gray-300 px-4 py-2">
//                 {user?.displayName}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.role === "admin" ? "Admin" : "User"}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.creationTime}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.lastSignInTime}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUsers;
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AllUsers = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState({
    value: "all",
    label: "All",
  });

  // Query with automatic refetch on dependency changes
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchTerm, selectedRole.value],
    queryFn: async () => {
      const params = {
        search: searchTerm,
        role: selectedRole.value !== "all" ? selectedRole.value : undefined,
      };

      console.log("Request params:", params); // Debugging

      const res = await axiosPublic.get("users", { params });
      console.log("Response data:", res?.data); // Debugging
      return res.data;
    },
  });

  // Simplified handlers without manual refetch
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleRoleChange = (selected) => setSelectedRole(selected);

  const roleOptions = [
    { value: "all", label: "All" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  if (isLoading) return <div className="text-center">Loading users...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="input input-bordered flex-grow"
        />

        <Select
          options={roleOptions}
          value={selectedRole}
          onChange={handleRoleChange}
          className="w-full md:w-64"
          isSearchable={false}
        />
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>

      <div className="mb-4 text-lg font-semibold">
        Total users: {users.length}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["User", "Role", "Email", "Creation Time", "Last Login"].map(
                (header) => (
                  <th
                    key={header}
                    className="border border-gray-200 px-4 py-3 text-left"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 even:bg-gray-100">
                <td className="border border-gray-200 px-4 py-2">
                  {user.displayName}
                </td>
                <td className="border border-gray-200 px-4 py-2 capitalize">
                  {user.role}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(user.creationTime).toLocaleString()}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.lastSignInTime
                    ? new Date(user.lastSignInTime).toLocaleString()
                    : "Never"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
