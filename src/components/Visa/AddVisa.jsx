import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

// const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_key = "ceb11657bc5ce481788b7ae73151fb92";
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const AddVisa = () => {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      countryImage: "",
      countryName: "",
      visaType: "",
      processingTime: "",
      requiredDocuments: [],
      description: "",
      ageRestriction: "",
      fee: "",
      validity: "",
      applicationMethod: "",
      email: user.email,
      appliedDate: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      imgFile: "",
    },
  });


  const onSubmit = async (data) => {
    console.log("Visa Data:", data);

    // // send data to the server and database
    fetch("http://localhost:5000/visas", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log(data);
          console.log(data.insertedId);
          alert("added");
          reset();
        }
      });
    toast.success("Visa added successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Visa</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2">Country Image URL</label>
          <div className="flex">
            <input
              type="text"
              {...register("countryImage")}
              className="input input-bordered w-full mr-3"
              placeholder="Enter the image URL"
            />
            <input
              {...register("imgFile")}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Country Name</label>
          <input
            type="text"
            {...register("countryName")}
            className="input input-bordered w-full"
            placeholder="Enter the country name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Visa Type</label>
          <select
            {...register("visaType")}
            className="select select-bordered w-full"
          >
            <option value="">Select visa type</option>
            <option value="Tourist visa">Tourist visa</option>
            <option value="Student visa">Student visa</option>
            <option value="Official visa">Official visa</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Processing Time</label>
          <input
            type="text"
            {...register("processingTime")}
            className="input input-bordered w-full"
            placeholder="Enter processing time"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Required Documents</label>
          <div className="form-control">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                {...register("requiredDocuments")}
                value="Valid passport"
                className="checkbox checkbox-primary"
              />
              <span className="label-text ml-2">Valid passport</span>
            </label>
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                {...register("requiredDocuments")}
                value="Visa application form"
                className="checkbox checkbox-primary"
              />
              <span className="label-text ml-2">Visa application form</span>
            </label>
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                {...register("requiredDocuments")}
                value="Recent passport-sized photograph"
                className="checkbox checkbox-primary"
              />
              <span className="label-text ml-2">
                Recent passport-sized photograph
              </span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Age Restriction</label>
          <input
            type="number"
            {...register("ageRestriction")}
            className="input input-bordered w-full"
            placeholder="Enter age restriction"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Fee</label>
          <input
            type="number"
            {...register("fee")}
            className="input input-bordered w-full"
            placeholder="Enter fee"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Validity</label>
          <input
            type="text"
            {...register("validity")}
            className="input input-bordered w-full"
            placeholder="Enter validity period"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Application Method</label>
          <input
            type="text"
            {...register("applicationMethod")}
            className="input input-bordered w-full"
            placeholder="Enter application method"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Visa
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddVisa;
