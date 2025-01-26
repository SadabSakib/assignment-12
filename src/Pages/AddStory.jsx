
// import React, { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import useAxiosPublic from "../components/hooks/useAxiosPublic";
// import useAxiosSecure from "../components/hooks/useAxiosSecure";
// import { AuthContext } from "../provider/AuthProvider";

// const AddStory = () => {
//     const img_hosting_key = "ceb11657bc5ce481788b7ae73151fb92";
//     const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
    
//   const { user } = useContext(AuthContext);

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       title: "",
//       text: '',
//       images: '',
//       email: user?.email,
//       appliedDate: new Date().toLocaleDateString("en-US", {
//         month: "2-digit",
//         day: "2-digit",
//         year: "numeric",
//       }),
//       imgFile: "",
//     },
//   });

//   const axiosPublic = useAxiosPublic();
// //   const axiosSecure = useAxiosSecure();
//   const onSubmit = async (data) => {
//     console.log("Visa Data:", data);

//     const imgFile = { image: data.imgFile[0] };
//     const res = await axiosPublic.post(img_hosting_api, imgFile, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     });
//     console.log(res.data);
//     if (res.data.success) {
//       const storyData = {
//         title: data.title,
//         text: data.text,
//         images: data.images,
//       };
//       // // send data to the server and database
//       fetch("http://localhost:5000/visas", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.insertedId) {
//             console.log(data);
//             console.log(data.insertedId);
//             toast.success('story added')
//             reset();
//           }
//         });
//       const addVisaRes = await axiosSecure.post("visas", storyData);
//       console.log(addVisaRes.data);
//       if (addVisaRes.data.insertedId) {
//         // show success popup
//         toast.success("Visa added successfully!");
//       }
//       reset();
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Add Visa</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             className="grow"
//             id="title"
//             {...register("title", { required: true })}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="text">Text</label>
//           <textarea
//             id="text"
//             {...register("text", { required: true })}
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="images">Images</label>
//           <input id="images" type="file" multiple {...register("images")} />
//         </div>
//         <button type="submit">Add Story</button>
//       </form>
//       <ToastContainer />
//     </div>
//   );

// };

// export default AddStory;


// // import React from "react";
// // import { useForm } from "react-hook-form";
// // import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import useAxiosPublic from "../components/hooks/useAxiosPublic";


// // const AddStory = () => {
// //     const axiosPublic=useAxiosPublic()
// //   const { register, handleSubmit, reset } = useForm();
// //   const navigate = useNavigate();
// //   const queryClient = useQueryClient();

// //   const addStoryMutation = useMutation(
// //     (newStory) =>
// //       axiosPublic.post("/api/stories", newStory, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       }),
// //     {
// //       onSuccess: () => {
// //         queryClient.invalidateQueries("stories");
// //         navigate("/manage-stories");
// //       },
// //     }
// //   );

// //   const onSubmit = (data) => {
// //     const formData = new FormData();
// //     formData.append("title", data.title);
// //     formData.append("text", data.text);
// //     Array.from(data.images).forEach((file) => formData.append("images", file));
// //     addStoryMutation.mutate(formData);
// //     reset();
// //   };

// //   return (
// //     <div className="add-story">
// //       <form onSubmit={handleSubmit(onSubmit)}>
// //         <div className="form-group">
// //           <label htmlFor="title">Title</label>
// //           <input id="title" {...register("title", { required: true })} />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="text">Text</label>
// //           <textarea
// //             id="text"
// //             {...register("text", { required: true })}
// //           ></textarea>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="images">Images</label>
// //           <input id="images" type="file" multiple {...register("images")} />
// //         </div>
// //         <button type="submit">Add Story</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddStory;


import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../components/hooks/useAxiosPublic";
import useAxiosSecure from "../components/hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const AddStory = () => {
  const img_hosting_key = "ceb11657bc5ce481788b7ae73151fb92";
  const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

  const { user } = useContext(AuthContext);
const navigate=useNavigate()
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
      imgFile: "",
    },
  });

  const axiosPublic = useAxiosPublic();
  //   const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log("Visa Data:", data);

    const imgFile = { image: data.imgFile[0] };
    const res = await axiosPublic.post(img_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      const storyData = {
        title: data.title,
        text: data.text,
        images: res.data.images,
      };
      // // send data to the server and database
      fetch("http://localhost:5000/story", {
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
              toast.success("story added");
              navigate("/my-stories");
            reset();
          }
        });
      const addStoryRes = await axiosPublic.post("visas", storyData);
      console.log(addStoryRes.data);
      if (addStoryRes.data.insertedId) {
        // show success popup
        toast.success("Visa added successfully!");
      }
      reset();
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
