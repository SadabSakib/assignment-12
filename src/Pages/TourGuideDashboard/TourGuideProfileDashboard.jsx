// import React from 'react';

// const TourGuideProfileDashboard = () => {
//     return (
//         <div>
//             TourGuideDashboard
//         </div>
//     );
// };

// export default TourGuideProfileDashboard;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import { Modal } from "react-daisyui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const TourGuideProfileDashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: data?.displayName,
      photoURL: data?.photoURL,
    })
      .then(() => {
        // Profile updated!
        setIsModalOpen(false);
      })
      .catch((error) => {
        // An error occurred
        console.log("Error updating user data:", error);
      });

    console.log(data);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome, {user?.displayName}!
      </h1>
      <div className="card w-full md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl mx-auto">
        <figure className="px-10 pt-10">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="rounded-full w-48 h-48 object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-lg text-gray-500">{user?.email}</p>
          <p className="text-lg text-gray-500">Role: {user?.role}</p>
          <div className="card-actions mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              onClick={() => navigate("/join-tour-guide")}
              className="btn btn-secondary"
            >
              Apply for Tour Guide
            </button>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onClickBackdrop={() => setIsModalOpen(false)}>
        <Modal.Header className="font-bold text-lg">Edit Profile</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="displayName"
              >
                Name
              </label>
              <input
                type="text"
                id="displayName"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
                {...register("displayName", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="photoURL"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                defaultValue={user?.photoURL}
                className="input input-bordered w-full"
                {...register("photoURL", { required: true })}
              />
            </div>
          </form>

                  <h1 className="text-lg">Stories added by You Tour Guide</h1>
                  
        </Modal.Body>
        <Modal.Actions>
          <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
            Save
          </button>
          <button onClick={() => setIsModalOpen(false)} className="btn">
            Cancel
          </button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default TourGuideProfileDashboard;
