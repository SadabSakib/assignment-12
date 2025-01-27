import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ visa }) => {
  const {
    _id,
    countryName,
    countryImage,
    visaType,
    processingTime,
    email,
    fee,
    validity,
    applicationMethod,
    ageRestriction,
    requiredDocuments,
    description,
  } = visa;
  console.log(_id);
  console.log(requiredDocuments);
  const [visaData, setVisaData] = useState({
    countryImage,
    countryName,
    visaType,
    processingTime,
    requiredDocuments,
    description,
    ageRestriction,
    fee,
    validity,
    applicationMethod,
    email,
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newDocuments = checked
        ? [...visaData.requiredDocuments, value]
        : visaData.requiredDocuments.filter((doc) => doc !== value);
      setVisaData({ ...visaData, requiredDocuments: newDocuments });
    } else {
      setVisaData({ ...visaData, [name]: value });
    }
  };

  const handlUpdate = (e) => {
    e.preventDefault();
    fetch(`https://assignment-12-server-beige-two.vercel.app/visa/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(visaData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          //   console.log(data._id);
          toast.success("Visa added successfully!");
          // e.target.reset();
        } else {
          toast.error("No changes made or visa not found.");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating visa");
      });
    console.log(visaData);
  };
  return (
    <div>
      <dialog id={_id} className="modal">
        <div className=" modal-box container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Add Visa</h1>
          <form onSubmit={handlUpdate}>
            <div className="mb-4">
              <label className="block mb-2">Country Image URL</label>
              <input
                type="text"
                name="countryImage"
                //   value={visaData.countryImage}
                defaultValue={countryImage}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter the image URL"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Country Name</label>
              <input
                type="text"
                name="countryName"
                //   value={visaData.countryName}
                defaultValue={countryName}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter the country name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Visa Type</label>
              <select
                name="visaType"
                //   value={visaData.visaType}
                defaultValue={visaType}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                {/* nicher egula kongla default chck dimu?kmne dimu? */}
                <option value="">Select visa type</option>
                <option value="Tourist visa">Tourist visa</option>
                <option value="Student visa">Student visa</option>
                <option value="Official visa">Official visa</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Processing Time</label>
              <input
                type="text"
                name="processingTime"
                //   value={visaData.processingTime}
                defaultValue={processingTime}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter processing time"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Required Documents</label>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    name="requiredDocuments"
                    value="Valid passport"
                    checked={visaData.requiredDocuments.includes(
                      "Valid passport"
                    )}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text ml-2">Valid passport</span>
                </label>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    name="requiredDocuments"
                    value="Visa application form"
                    checked={visaData.requiredDocuments.includes(
                      "Visa application form"
                    )}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text ml-2">Visa application form</span>
                </label>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    name="requiredDocuments"
                    value="Recent passport-sized photograph"
                    checked={visaData.requiredDocuments.includes(
                      "Recent passport-sized photograph"
                    )}
                    onChange={handleInputChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text ml-2">
                    Recent passport-sized photograph
                  </span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                //   value={visaData.description}
                defaultValue={description}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Age Restriction</label>
              <input
                type="number"
                name="ageRestriction"
                //   value={visaData.ageRestriction}
                defaultValue={ageRestriction}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter age restriction"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Fee</label>
              <input
                type="number"
                name="fee"
                //   value={visaData.fee}
                defaultValue={fee}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter fee"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Validity</label>
              <input
                type="text"
                name="validity"
                //   value={visaData.validity}
                defaultValue={validity}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter validity period"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Application Method</label>
              <input
                type="text"
                name="applicationMethod"
                //   value={visaData.applicationMethod}
                defaultValue={applicationMethod}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter application method"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Update
            </button>
          </form>
          {/* <button type="submit" className="btn btn-primary w-full">
          Update
        </button> */}
          <div className="modal-action flex justify-center items-center">
            <form method="dialog flex justify-center items-center">
              <button className="btn btn-accent">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default Modal;
