import React from 'react';
import useAxiosPublic from '../components/hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const PackageDetails = () => {
    const axiosPublic=useAxiosPublic()
      const { id } = useParams();
const fetchPackageDetails = async () => {
  const { data } = await axiosPublic.get(`/package/${id}`);
  return data;
};
      const {
        data: packageDetails,
        error,
        isLoading,
      } = useQuery({
        queryKey: ["packageDetails", id],
        queryFn: fetchPackageDetails,
      });

      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

      return (
        <div className="card w-full md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl mx-auto my-8">
          <figure className="px-10 pt-10">
            <img
              src={packageDetails.photoURL}
              alt={packageDetails.title}
              className="rounded-lg w-full h-64 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl font-bold">
              {packageDetails.title}
            </h2>
            <p className="text-lg mt-4">{packageDetails.description}</p>
            <div className="card-actions mt-6">
              <p className="text-lg">
                <strong>Tour Type:</strong> {packageDetails.tTourType}
              </p>
              <p className="text-lg">
                <strong>Price:</strong> ${packageDetails.price}
              </p>
              <p className="text-lg">
                <strong>Duration:</strong> {packageDetails.duration}
              </p>
              <p className="text-lg">
                <strong>Location:</strong> {packageDetails.location}
              </p>
            </div>
          </div>
        </div>
      );
};

export default PackageDetails;