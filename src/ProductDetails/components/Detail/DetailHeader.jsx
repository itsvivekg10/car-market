import React from "react";
import "./details.css"; // Make sure to create a CSS file or use internal styling

const DetailHeader = ({ carDetails }) => {
  return (
    <div className="detail-header">
      <h1 className="listing-title">{carDetails?.listingTitle}</h1>
      <p className="listing-subtitle">{carDetails?.tagline}</p>
      <div className="listing-details">
        <div className="detail">
          <span className="icon">📅</span> 2021
        </div>
        <div className="detail">
          <span className="icon">📍</span> 250 miles
        </div>
        <div className="detail">
          <span className="icon">⚙️</span> {carDetails?.transmission}
        </div>
        <div className="detail">
          <span className="icon">⛽</span> {carDetails?.fuelType}
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
