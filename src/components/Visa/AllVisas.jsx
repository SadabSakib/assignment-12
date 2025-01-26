import React, { useState, useEffect } from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const AllVisas = () => {
  const loadedVisas = useLoaderData();
  const [visas, setVisas] = useState(loadedVisas);

  console.log(visas);
  const [visaType, setVisaType] = useState("All"); // or "All" initially, based on your requirement

  useEffect(() => {
    if (visaType === "All") {
      setVisas(loadedVisas);
    } else {
      setVisas(loadedVisas.filter((visa) => visa.visaType === visaType));
    }
  }, [visaType, loadedVisas]);

  const handleVisaTypeChange = (e) => {
    setVisaType(e.target.value);
  };
  return (
    <div>
      <label className="block mb-2">Visa Type</label>
      <select
        name="visaType"
        value={visaType}
        onChange={handleVisaTypeChange}
        className="select select-bordered w-full"
      >
        <option value="All">All</option>
        <option value="Tourist visa">Tourist visa</option>
        <option value="Student visa">Student visa</option>
        <option value="Official visa">Official visa</option>
      </select>
      <h1>All Visas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 min-h-screen">
        {visas &&
          visas.map((visa, index) => (
            <div
              key={index}
              className="m-10 transform transition-transform duration-300 hover:scale-105 h-80"
            >
              <div className="card w-80 h-96 bg-base-100 shadow-xl mb-4 ">
                <div className="card-body">
                  <div className="flex items-center">
                    <img
                      src={visa.countryImage}
                      alt={`${visa.countryName} Flag`}
                      className="w-12 h-8 mr-4"
                    />
                    <div>
                      <p className="text-sm">
                        <strong>Country:</strong> {visa.countryName}
                      </p>
                      <p className="text-sm">
                        <strong>Visa Type:</strong> {visa.visaType}
                      </p>
                      <p className="text-sm">
                        <strong>Processing Time:</strong> {visa.processingTime}
                      </p>
                      <p className="text-sm">
                        <strong>Fee:</strong> ${visa.fee}
                      </p>
                      <p className="text-sm">
                        <strong>Validity:</strong> {visa.validity}
                      </p>
                      <p className="text-sm">
                        <strong>Application Method:</strong>
                        {visa.applicationMethod}
                      </p>
                      <NavLink to={`/visa/${visa._id}`}>
                        <button className="btn btn-primary btn-sm mt-3">
                          See Details
                        </button>
                      </NavLink>
                    </div>
                  </div>
                  <div className="card-actions justify-center mt-4"> </div>{" "}
                </div>
              </div>
              {/* Add more visa details as needed */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllVisas;
