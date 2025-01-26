import React, { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../provider/AuthProvider";

const ApplyForVisa = ({ id, visa }) => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const defaulEmail = user.email;
  const {
    countryName,
    countryImage,
    ageRestriction,
    applicationMethod,
    description,
    fee,
    processingTime,
    requiredDocuments,
    validity,
    visaType,
  } = visa;

  const { appliedDate } = visa;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(defaulEmail);
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const appliedDate = e.target.appliedDate.value;
    const fee = e.target.fee.value;

    const newVisaApplication = {
      firstName,
      lastName,
      email,
      appliedDate,
      fee,
      countryName,
      countryImage,
      ageRestriction,
      applicationMethod,
      description,
      fee,
      processingTime,
      requiredDocuments,
      validity,
      visaType,
    };

    fetch("http://localhost:5000/applyVisas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVisaApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log(data);
          console.log(data.insertedId);
          toast.success("Application submitted successfully!");
          e.target.reset();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error submitting application");
      });

    console.log("Form Data:", newVisaApplication);

    // Handle form submission (e.g., send data to the server)
    // toast.success("Application submitted successfully!");
  };

  return (
    <dialog id={`my_modal_${id}`} className="modal">
      <div className="modal-box">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Apply For Visa</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="input input-bordered"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="input input-bordered"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email address</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                placeholder="Enter your email"
                defaultValue={defaulEmail}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Applied date</span>
              </label>
              <input
                name="appliedDate"
                className="input input-bordered"
                defaultValue={appliedDate}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Fee ($)</span>
              </label>
              <input
                type="text"
                name="fee"
                className="input input-bordered"
                placeholder="Enter the fee"
              />
            </div>
            <div className="card-actions justify-center">
              <button type="submit" className="btn btn-primary w-full">
                Apply
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ApplyForVisa;
