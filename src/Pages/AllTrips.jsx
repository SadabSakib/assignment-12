import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../components/hooks/useAxiosPublic';

const AllTrips = () => {
    const axiosPublic=useAxiosPublic()
    const [packages, setPackages] = useState([]);
        useEffect(() => {
          axiosPublic.get("/api/allPackages").then((res) => {
            setPackages(res.data);
            console.log(res.data);
          });
        },[axiosPublic])
     
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {packages?.map((singlePackage) => (
        <div className="card">
          <img
            src={singlePackage?.photoURL}
            alt={singlePackage?.title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{singlePackage?.title}</h5>
            <p className="card-text">Tour Type: {singlePackage?.tourType}</p>
            <p className="card-text">Price: ${singlePackage?.price}</p>
            <button
              onClick={() =>
                (window.location.href = `/package/${singlePackage?._id}`)
              }
              className="btn btn-primary"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTrips;