import React, { useContext, useEffect, useState } from "react";
// import VisaCard from "./VisaCard/VisaCard";
import { AuthContext } from "../../provider/AuthProvider";
import { HiH1 } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import Modal from "./ModalVisaUpdate/Modal";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyAddedVisas = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  // const loadedVisas = useLoaderData();
  // console.log(loadedVisas)

  const [myAdded, setMyAdded] = useState(null);
  useEffect(() => {
    // fetch(`http://localhost:5000/visas/${user?.email}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setMyAdded(data);
    //     // console.log(myAdded)
    //   });
    axiosSecure.get(`visas/${user?.email}`).then((res) => {
      setMyAdded(res.data);
      console.log(res.data);
    });
  }, [user]);
  const handleDelete = (_id) => {
    console.log(_id);

    fetch(`http://localhost:5000/visa/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          const remaining = myAdded.filter((visa) => visa._id !== _id);
          setMyAdded(remaining);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(myAdded, user);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 min-h-screen">
        {myAdded?.map((visa, index) => (
          <div
            key={index}
            className="m-10 transform transition-transform duration-300 hover:scale-105 box-content"
          >
            <div className="card w-80 h-96 bg-base-100 shadow-xl mb-4">
              {" "}
              <div className="card-body">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <img
                    src={visa?.countryImage}
                    alt={`${visa?.countryName} Flag`}
                    className="w-12 h-8 mr-4"
                  />{" "}
                  <div>
                    {" "}
                    <p className="text-sm">
                      <strong>Country:</strong> {visa?.countryName}
                    </p>{" "}
                    <p className="text-sm">
                      <strong>Visa Type:</strong> {visa?.visaType}
                    </p>{" "}
                    <p className="text-sm">
                      <strong>Processing Time:</strong> {visa?.processingTime}
                    </p>{" "}
                    <p className="text-sm">
                      <strong>Fee:</strong> ${visa?.fee}
                    </p>{" "}
                    <p className="text-sm">
                      <strong>Validity:</strong> {visa?.validity}
                    </p>{" "}
                    <p className="text-sm">
                      <strong>Application Method:</strong>{" "}
                      {visa?.applicationMethod}
                    </p>{" "}
                    <div className="flex gap-3">
                      <button
                        className="btn btn-primary btn-sm mt-3"
                        onClick={() =>
                          document.getElementById(`${visa._id}`).showModal()
                        }
                      >
                        Update
                      </button>{" "}
                      <button
                        className="btn btn-primary btn-sm mt-3"
                        onClick={() => handleDelete(visa?._id)}
                      >
                        Delete
                      </button>{" "}
                    </div>
                  </div>{" "}
                </div>{" "}
                <div className="card-actions justify-center mt-4"> </div>{" "}
              </div>{" "}
              <Modal visa={visa}></Modal>
            </div>
            {/* Add more visa details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedVisas;
