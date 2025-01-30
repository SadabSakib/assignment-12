// import React from 'react';

// const AdminCandidates = () => {
//     return (
//         <div>
//             AdminCandidates
//         </div>
//     );
// };

// export default AdminCandidates;
import { useQuery } from "@tanstack/react-query";
import React from "react";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";

const AdminCandidates = () => {
  // const [user, setUsers] = useState([]);

  const axiosSecure = useAxiosSecure();
  const axiosPublic=useAxiosPublic()
  const { data: UsersToGuide = [], refetch } = useQuery({
    queryKey: ["JoingGuideCandidades"],
    queryFn: async () => {
      const res = await axiosPublic.get("reqsOfJoiningGuides");
      return res.data;
    },
  });
  console.log(UsersToGuide);
  const handleMakeTourGuide = (user) => {
    axiosSecure.patch(`users/tourGuide/${user.email}`).then(() => {
      Swal.fire(`${user.displayName} is TourGuide now`);
      refetch();
    });
  };
  const handleUserDelete = (id) => {
    //   delete user from the mongodb database
    // fetch(`https://assignment-12-server-beige-two.vercel.app/users/${id}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("delete is done", data);
    //     if (data.deletedCount) {
    //       const remainingUsers = users?.filter((user) => user._id !== id);
    //       setUsers(remainingUsers);
    //     }
    //   });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

    return (
    //   need to fix the below code 
    <div>
      total users {UsersToGuide.length}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Users</th>
            <th className="border border-gray-300 px-4 py-2">Role </th>
            <th className="border border-gray-300 px-4 py-2">Email </th>
            <th className="border border-gray-300 px-4 py-2">Creation Time </th>
            <th className="border border-gray-300 px-4 py-2">
              Last Login Time{" "}
            </th>
            <th className="border border-gray-300 px-4 py-2">Action </th>
          </tr>
        </thead>
        <tbody>
          {UsersToGuide?.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {user?.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user?.role === "tourGuide" ? (
                  "tourGuide"
                ) : (
                  <button onClick={() => handleMakeTourGuide(user)}>
                    <p>User</p>
                  </button>
                )}
              </td>

              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
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
      </table>
    </div>
  );
};

export default AdminCandidates;
