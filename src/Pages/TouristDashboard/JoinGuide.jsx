import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-daisyui";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";

const JoinGuide = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    const axiosSecure = useAxiosSecure();
    const JoinGuide = {
      tile: data.title,
      reason: data.reason,
      cvLink: data.cvLink,
      email: data.email,
    };
    axiosSecure.post("/reqToJoinGuide", JoinGuide);
    
    
    // Handle form submission, send data to the server
    console.log("Form Data:", data);

    setIsModalOpen(true); // Show success modal

    reset(); // Reset form
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Join as Tour Guide
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Application Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reason"
          >
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            id="reason"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("reason", { required: true })}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cvLink"
          >
            CV Link
          </label>
          <input
            type="url"
            id="cvLink"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("cvLink", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", { required: true })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Application
          </button>
        </div>
      </form>
      <Modal open={isModalOpen} onClickBackdrop={() => setIsModalOpen(false)}>
        <Modal.Header className="font-bold text-lg">
          Application Successful
        </Modal.Header>
        <Modal.Body>
          <p>Your application has been submitted successfully!</p>
        </Modal.Body>
        <Modal.Actions>
          <button className="btn" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default JoinGuide;
