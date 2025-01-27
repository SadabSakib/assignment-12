import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Users from "../Users";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyVisaApplications = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  console.log(userEmail);
  console.log(user);
  const [visas, setVisas] = useState([]);
  const [query, setQuery] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // fetch(`https://assignment-12-server-beige-two.vercel.app/applyvisa/${userEmail}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setVisas(data);
    //     console.log(data);
    //   })
    //   .catch((error) => console.error("Error fetching data:", error));
    // axios.get(`https://assignment-12-server-beige-two.vercel.app/applyvisa/${userEmail}`, {
    //   withCredentials: true,
    // });
    axiosSecure.get(`applyvisa/${userEmail}`).then((res) => setVisas(res.data));
  }, [userEmail]);
  console.log(visas?.length);

  const handleDelete = (_id) => {
    console.log(_id);

    fetch(
      `https://assignment-12-server-beige-two.vercel.app/myVisaApplication/${_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          const remaining = visas.filter((visa) => visa._id !== _id);
          setVisas(remaining);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://assignment-12-server-beige-two.vercel.app/search?q=${query}`
      );
      const data = await response.json();
      setVisas(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const {
  //   firstName,
  //   lastName,
  //   email,
  //   appliedDate,
  //   fee,
  //   countryName,
  //   countryImage,
  //   ageRestriction,
  //   applicationMethod,
  //   description,
  //   processingTime,
  //   requiredDocuments,
  //   validity,
  //   visaType,
  // } = visas;

  // console.log(firstName,visas)
  // console.log(visas[0].firstName)
  useEffect(() => {
    console.log("Updated visas:", visas);
  }, [visas]);
  return (
    <div>
      <form onSubmit={handleSearch}>
        {" "}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by country name"
          className="input input-bordered w-full"
        />{" "}
        <button type="submit" className="btn btn-primary">
          Search
        </button>{" "}
      </form>
      {visas?.map((visa) => (
        <div className="card w-96 bg-base-100 shadow-xl">
          {" "}
          <div className="card-body">
            {" "}
            <div className="flex items-center">
              {" "}
              <img
                src={`${visa.countryImage}`}
                alt="Canada Flag"
                className="w-6 h-6 mr-2"
              />{" "}
              <h2 className="card-title">Country: {visa.countryName}</h2>{" "}
            </div>{" "}
            <p>
              <strong>Visa Type:</strong> {visa.visaType}
            </p>{" "}
            <p>
              <strong>Processing Time:</strong>
              {visa.processingTime}
            </p>{" "}
            <p>
              <strong>Fee:</strong> {visa.fee}
            </p>{" "}
            <p>
              <strong>Validity:</strong> {visa.validity}
            </p>{" "}
            <p>
              <strong>Application Method:</strong> {visa.applicationMethod}
            </p>{" "}
            <p>
              <strong>Applied Date:</strong> {visa.appliedDate}
            </p>{" "}
            <p>
              <strong>Applicant's Name:</strong> {visa.firstName}{" "}
              {visa.lastName}
            </p>{" "}
            <p>
              <strong>Applicant's Email:</strong> {visa.email}
            </p>{" "}
            <div className="card-actions justify-end">
              {" "}
              <button
                className="btn btn-primary"
                onClick={() => handleDelete(visa._id)}
              >
                Cancel
              </button>{" "}
              <Link to={"/payment"}>
                <button className="btn btn-primary">
                  Pay for Your Application
                </button>
              </Link>
            </div>{" "}
          </div>{" "}
        </div>
      ))}
    </div>
  );
};

export default MyVisaApplications;
