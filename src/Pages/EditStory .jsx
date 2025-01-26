import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAxiosPublic from "../components/hooks/useAxiosPublic"; // Ensure you have this custom hook
import useAxiosSecure from "../components/hooks/useAxiosSecure";

const fetchStoryDetails = async (id) => {
  const { data } = await axios.get(`/api/stories/${id}`);
  return data;
};

const EditStory = () => {
  const img_hosting_key = "ceb11657bc5ce481788b7ae73151fb92";
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();
  const axiosSecure=useAxiosSecure()
  const axiosPublic = useAxiosPublic();

  const {
    data: story,
    error,
    isLoading,
  } = useQuery(["story", id], () => fetchStoryDetails(id));

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
          const res = await axiosPublic.post(img_hosting_api, formData, {
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
        imgFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);
          const res = await axiosPublic.post(img_hosting_api, formData, {
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
    <div className="edit-story">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" {...register("title", { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            {...register("text", { required: true })}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="images">Add New Images</label>
          <input id="images" type="file" multiple {...register("images")} />
        </div>
        <button type="submit">Update Story</button>
      </form>

      <div className="current-images">
        <h3>Current Images</h3>
        {story.images.map((image, idx) => (
          <div key={idx} className="image-item">
            <img src={image} alt={`Story ${idx}`} />
            <button onClick={() => removeImage(image)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="additionalImages">Upload Additional Images</label>
        <input
          id="additionalImages"
          type="file"
          multiple
          onChange={(e) => addImages(e.target.files)}
        />
      </div>
    </div>
  );
};

export default EditStory;
