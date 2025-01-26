import React from "react";

const TourGuideCard = ({ guide }) => (
  <div className="card">
    <img src={guide.photoURL} alt={guide.name} className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">{guide.name}</h5>
      <p className="card-text">Specialty: {guide.specialty}</p>
      <button
        onClick={() => (window.location.href = `/tour-guide/${guide._id}`)}
        className="btn btn-primary"
      >
        Details
      </button>
    </div>
  </div>
);

export default TourGuideCard;
