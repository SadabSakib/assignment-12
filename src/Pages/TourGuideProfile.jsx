import React, { useEffect, useState } from "react";
import useAxiosPublic from "../components/hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const TourGuideProfile = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [tourGuide, setTourGuideProfile] = useState([]);
  useEffect(() => {
    axiosPublic.get(`/tour-guide/${id}`).then((res) => {
      setTourGuideProfile(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div
     
      className="card w-full md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl mx-auto my-5"
    >
      <figure className="px-10 pt-10">
        <img
          src={tourGuide.photoURL}
          alt={tourGuide.name}
          className="rounded-full w-48 h-48 object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold">{tourGuide.name}</h2>
        <p className="text-xl">{tourGuide.specialty}</p>
        <p className="text-lg text-gray-500">
          {tourGuide.experience} experience
        </p>
        <p className="text-lg text-yellow-500">Rating: {tourGuide.rating} ★</p>
        <p className="text-base">{tourGuide.bio}</p>
        <div className="card-actions mt-4">
          <a href={`mailto:${tourGuide.email}`} className="btn btn-primary">
            Contact via Email
          </a>
          <a href={`tel:${tourGuide.phone}`} className="btn btn-secondary">
            Call
          </a>
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;
