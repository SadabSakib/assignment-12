import React from "react";
import { useLoaderData } from "react-router-dom";
import ApplyForVisa from "../ApplyForVisaModal/ApplyForVisa";

const VisaDetails = () => {
  const visa = useLoaderData();
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
  console.log(visa);
 return (
   <div className="card w-64 bg-base-100 shadow-xl mb-4">
     {" "}
     <div className="card-body p-4">
       {" "}
       <h2 className="card-title text-center text-sm">Visa Application</h2>{" "}
       <div className="flex items-center mb-2">
         {" "}
         <img
           src={visa.countryImage}
           alt={`${visa.countryName} Flag`}
           className="w-8 h-6 mr-2"
         />{" "}
         <p className="text-xs">
           <strong>{visa.countryName}</strong>
         </p>{" "}
       </div>{" "}
       <div className="text-xs mb-2">
         {" "}
         <p>
           <strong>Visa Type:</strong> {visa.visaType}
         </p>{" "}
         <p>
           <strong>Processing Time:</strong> {visa.processingTime}
         </p>{" "}
         <p>
           <strong>Fee:</strong> ${visa.fee}
         </p>{" "}
         <p>
           <strong>Validity:</strong> {visa.validity}
         </p>{" "}
         <p>
           <strong>Application Method:</strong> {visa.applicationMethod}
         </p>{" "}
       </div>{" "}
       <div className="card-actions justify-center">
         {" "}
         <button
           className="btn btn-sm btn-primary"
           onClick={() => document.getElementById(`my_modal_${visa._id}`).showModal()}
         >
           Apply for Visa
         </button>{" "}
         <ApplyForVisa id={visa._id} visa={visa}></ApplyForVisa>
       </div>
     </div>
   </div>
 );
};

export default VisaDetails;
