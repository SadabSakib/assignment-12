// import React from 'react';

// const ManageStories = () => {
//     return (
//         <div>
//             ManageStories
//         </div>
//     );
// };

// export default ManageStories;
import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../components/hooks/useAxiosPublic";
import useAxiosSecure from "../components/hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const ManageStories = () => {
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const fetchStories = async () => {
    const { data } = await axiosPublic.get(`/api/story/${user?.email}`);
    console.log(data);
    return data;
  };
  const {
    data: stories,
    error,
    isLoading,
  } = useQuery({ queryKey: ["stories"], queryFn: fetchStories });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteStory = (id) => {
    // axiosPublic.delete(`/api/stories/${id}`);
    // queryClient.invalidateQueries("stories");
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
        axiosPublic.delete(`/api/stories/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your story has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    // <div className="manage-stories">
    //   {stories?.map((story) => (
    //     <div key={story._id} className="card">
    //       <h3>{story.title}</h3>
    //       <p>{story.text}</p>
    //       {story?.images?.map((image, idx) => (
    //         <img key={idx} src={image} alt={`Story ${idx}`} />
    //       ))}
    //       <button onClick={() => navigate(`/edit-story/${story._id}`)}>
    //         Edit
    //       </button>
    //       <button onClick={() => deleteStory(story._id)}>Delete</button>
    //     </div>
    //   ))}
    // </div>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories?.map((story) => (
          <div
            key={story._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">{story.title}</h3>
              <p className="text-gray-700 text-base">{story.text}</p>
              <div className="mt-4">
                {story?.images?.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`Story ${idx}`}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <Link to={`/edit-story/${story._id}`}>
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteStory(story._id)}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
