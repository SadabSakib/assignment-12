import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../components/hooks/useAxiosPublic";
import { AuthContext } from "../provider/AuthProvider";

const AddStory = () => {
  const img_hosting_key = "ceb11657bc5ce481788b7ae73151fb92";
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      text: "",
      images: "",
      email: user?.email,
      appliedDate: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
    },
  });

  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log("Story Data:", data);
    const files = data.images;
    const imageUrls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("image", files[i]);
        const res = await axios.post(img_hosting_api, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res.data.success) {
          imageUrls.push(res.data.data.url);
        }
      }

      const storyData = {
        title: data.title,
        text: data.text,
        images: imageUrls,
        email: user?.email,
      };

      // Send data to the server and database
      const response = await fetch(
        "https://assignment-12-server-beige-two.vercel.app/story",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(storyData),
        }
      );

      const result = await response.json();
      if (result.insertedId) {
        console.log(result);
        toast.success("Story added");
        navigate("/my-stories");
        reset();
      }
    } catch (error) {
      console.error("Error uploading images or submitting story:", error);
      toast.error("Failed to add story");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Add Story</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
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
            htmlFor="text"
          >
            Text
          </label>
          <textarea
            id="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("text", { required: true })}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="images"
          >
            Images
          </label>
          <input
            id="images"
            type="file"
            multiple
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("images")}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Story
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddStory;
