// import React from "react";
// import Modal from "../ModalVisaUpdate/Modal";

// const VisaCard = ({ visa, visas, setVisas }) => {
//   const {
//     countryName,
//     countryImage,
//     visaType,
//     processingTime,
//     fee,
//     validity,
//     applicationMethod,
//     _id,
//     ageRestriction,
//     requiredDocuments,
//     email,
//     description,
//   } = visa;
// const handleDelete = (_id) => {
//   console.log(_id);

//   fetch(`https://assignment-12-server-beige-two.vercel.app/visa/${_id}`, {
//     method: "DELETE",
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       if (data.deletedCount > 0) {
//         const remaining = visas.filter((visa) => visa._id !== _id);
//         setVisas(remaining);
//       }
//     })
//     .catch(err => {
//     console.log(err)
//   })
// };
//   return (
//     <div className="card w-96 bg-base-100 shadow-xl">
//       {" "}
//       <div className="card-body">
//         {" "}
//         <div className="flex items-center">
//           {" "}
//           <img
//             src="path_to_us_flag_image"
//             alt="US Flag"
//             className="w-12 h-8 mr-4"
//           />{" "}
//           <div>
//             {" "}
//             <p>Country: {countryName}</p> <p>Visa Type: {visaType}</p>{" "}
//             <p>Processing Time:{processingTime}</p>
//             <p>Fee: {fee}</p> <p>Validity:{validity}</p>{" "}
//             <p>Application method:{validity}</p>{" "}
//           </div>{" "}
//         </div>{" "}
//         <div className="card-actions justify-end">
//           {" "}
//           <button
//             className="btn btn-primary "
//             onClick={() => document.getElementById(`${_id}`).showModal()}
//           >
//             Update
//           </button>{" "}
//           <button className="btn btn-secondary" onClick={() => handleDelete(_id)}>
//             Delete
//           </button>{" "}
//         </div>
//         <Modal
//           key={_id}
//           countryName={countryName}
//           countryImage={countryImage}
//           visaType={visaType}
//           processingTime={processingTime}
//           email={email}
//           fee={fee}
//           validity={validity}
//           applicationMethod={applicationMethod}
//           _id={_id}
//           ageRestriction={ageRestriction}
//           requiredDocuments={requiredDocuments}
//           description={description}
//         ></Modal>
//       </div>
//     </div>
//   );
// };

// export default VisaCard;
