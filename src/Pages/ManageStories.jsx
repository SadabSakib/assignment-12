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
import { useNavigate } from "react-router-dom";
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
            refetch();
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
    <div className="manage-stories">
      {stories?.map((story) => (
        <div key={story._id} className="card">
          <h3>{story.title}</h3>
          <p>{story.text}</p>
          {/* {story?.images?.map((image, idx) => (
            <img key={idx} src={image} alt={`Story ${idx}`} />
          ))} */}
          <button onClick={() => navigate(`/edit-story/${story._id}`)}>
            Edit
          </button>
          <button onClick={() => deleteStory(story._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageStories;
