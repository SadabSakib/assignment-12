
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../components/hooks/useAxiosPublic";
import useAxiosSecure from "../components/hooks/useAxiosSecure";



const EditStory = () => {
  const fetchStoryDetails = async (id) => {
    const axiosPublic = useAxiosPublic();
    const { data } = await axiosPublic.get(`/api/stories/${id}`);
    console.log(data);
    return data;
  };
  const img_hosting_key = "ceb11657bc5ce481788b7ae73151fb92";
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: story,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["story", id],
    queryFn: () => fetchStoryDetails(id),
  });

  const updateStory = async (formData) => {
    try {
      await axiosPublic.put(`/api/stories/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      queryClient.invalidateQueries("stories");
      queryClient.invalidateQueries(["story", id]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = async (imageUrl) => {
    try {
      await axiosPublic.patch(`/api/stories/${id}/remove-image`, { imageUrl });
      queryClient.invalidateQueries(["story", id]);
    } catch (error) {
      console.error(error);
    }
  };

  const addImages = async (images) => {
    try {
      const imgFiles = Array.from(images);
      const imgUploads = await Promise.all(
        imgFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);
          const res = await axios.post(img_hosting_api, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return res.data.data.display_url;
        })
      );

      const formData = { images: imgUploads };
      await axiosPublic.patch(`/api/stories/${id}/images`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      queryClient.invalidateQueries(["story", id]);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      text: data.text,
      images: [],
    };

    if (data.images.length) {
      const imgFiles = Array.from(data.images);
      const imgUploads = await Promise.all(
        imgFiles?.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);
          const res = await axios.post(img_hosting_api, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return res.data.data.display_url;
        })
      );
      formData.images = imgUploads;
    }

    updateStory(formData);
  };

  useEffect(() => {
    if (story) {
      setValue("title", story.title);
      setValue("text", story.text);
    }
  }, [story, setValue]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    // <div className="edit-story">
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div className="form-group">
    //       <label htmlFor="title">Title</label>
    //       <input id="title" {...register("title", { required: true })} />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="text">Text</label>
    //       <textarea
    //         id="text"
    //         {...register("text", { required: true })}
    //       ></textarea>
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="images">Add New Images</label>
    //       <input id="images" type="file" multiple {...register("images")} />
    //     </div>
    //     <button type="submit">Update Story</button>
    //   </form>

    //   <div className="current-images">
    //     <h3>Current Images</h3>
    //     {story?.images?.map((image, idx) => (
    //       <div key={idx} className="image-item">
    //         <img src={image} alt={`Story ${idx}`} />
    //         <button onClick={() => removeImage(image)}>Remove</button>
    //       </div>
    //     ))}
    //   </div>

    //   <div className="form-group">
    //     <label htmlFor="additionalImages">Upload Additional Images</label>
    //     <input
    //       id="additionalImages"
    //       type="file"
    //       multiple
    //       onChange={(e) => addImages(e.target.files)}
    //     />
    //   </div>
    // </div>
    <div className="edit-story container mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="form-group mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("title", { required: true })}
          />
        </div>
        <div className="form-group mb-4">
          <label
            htmlFor="text"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Text
          </label>
          <textarea
            id="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("text", { required: true })}
          ></textarea>
        </div>
        <div className="form-group mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Add New Images
          </label>
          <input
            id="images"
            type="file"
            multiple
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("images")}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Story
        </button>
      </form>

      <div className="current-images bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-bold mb-4">Current Images</h3>
        {story?.images?.map((image, idx) => (
          <div key={idx} className="image-item mb-4">
            <img
              src={image}
              alt={`Story ${idx}`}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <button
              onClick={() => removeImage(image)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-group bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label
          htmlFor="additionalImages"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Upload Additional Images
        </label>
        <input
          id="additionalImages"
          type="file"
          multiple
          onChange={(e) => addImages(e.target.files)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default EditStory;
