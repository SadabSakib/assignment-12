import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-daisyui";
import useAxiosSecure from "../components/hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const UserProfile = () => {
  const navigate = useNavigate();
  const {user}=useContext(AuthContext)
  const [User,setUser]=useState(null)
  // const { user } = {
  //   // This is a mock user object, replace it with the actual user context or state.
  //   name: "Jane Doe",
  //   email: "jane.doe@example.com",
  //   role: "User",
  //   photoURL: "https://example.com/photos/jane-doe.jpg",
  // };

  const axiosSecure = useAxiosSecure()
  
  useEffect(() => {
    axiosSecure.get('users').then(res => {
      setUser(res.data)
    })
  },[axiosSecure])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: User?.displayName,
      photoURL: User?.photoURL,
    },
  });

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    axiosSecure.patch(`user/${user?.email}`,data)
    setIsModalOpen(false);
    // reset()
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome, {User?.displayName}!
      </h1>
      <div className="card w-full md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl mx-auto">
        <figure className="px-10 pt-10">
          <img
            src={User?.photoURL}
            alt={User?.displayName}
            className="rounded-full w-48 h-48 object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">{User?.displayName}</h2>
          <p className="text-lg text-gray-500">{User?.email}</p>
          <p className="text-lg text-gray-500">Role: {User?.role}</p>
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
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
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
                className="input input-bordered w-full"
                {...register("photoURL", { required: true })}
              />
            </div>
          </form>
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

export default UserProfile;
