import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
} from "react-share";
import useAxiosPublic from "../components/hooks/useAxiosPublic";




const Community = () => {
  const axiosPublic = useAxiosPublic();
  const [stories, setStories] = useState([]);
  useEffect(() => {
    axiosPublic.get("/api/stories").then((res) => {
      setStories(res.data);
      console.log(res.data)
    });
  }, [axiosPublic]);
  // const {
  //   data: stories,
  //   error,
  //   isLoading,
  // } = useQuery({ queryKey: ["stories"], queryFn: fetchStories });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="community-page container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Community Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories?.map((story) => (
          <div key={story._id} className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              {story?.images?.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Story ${idx}`}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
              ))}
            </figure>
            <div className="card-body">
              <h3 className="card-title text-2xl font-bold">{story.title}</h3>
              <p className="text-gray-700 mt-2">{story.text}</p>
              <div className="share-buttons mt-4 flex justify-center gap-4">
                <FacebookShareButton
                  url={window.location.href}
                  quote={story.title}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  title={story.title}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={window.location.href}
                  title={story.title}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <RedditShareButton
                  url={window.location.href}
                  title={story.title}
                >
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
