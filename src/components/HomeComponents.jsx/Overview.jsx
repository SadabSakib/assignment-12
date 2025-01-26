import React from "react";

const Overview = () => {
  return (
    <div className="p-8 bg-base-100">
      <h2 className="text-4xl font-bold text-center mb-6">
        Welcome to Our Tourism Management System
      </h2>
      <p className="text-xl text-center mb-6">
        Explore the world with us! Our platform provides comprehensive tour
        packages, personalized travel guides, and unforgettable experiences.
      </p>
      <div className="flex justify-center">
        <div className="card w-full md:w-3/4 bg-base-100 shadow-xl">
          <figure>
            <video controls className="w-full">
              <source src="promo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Overview;
