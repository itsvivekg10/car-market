import React from "react";
import "./specification.css"; // External CSS file

const Specification = ({ carDetails }) => {
  return (
    <div className="car-details-container">
      <ul className="car-details-list">
        <li>
          <span>🚗 Body:</span>
          {carDetails?.category}
        </li>
        <li>
          <span>📏 Mileage:</span>
          {carDetails?.mileage}
        </li>
        <li>
          <span>⛽ Fuel Type:</span> {carDetails?.fuelType}
        </li>
        <li>
          <span>📅 Year:</span> {carDetails?.year}
        </li>
        <li>
          <span>⚙️ Transmission:</span> {carDetails?.transmission}
        </li>
        <li>
          <span>🚙 Drive Type:</span> {carDetails?.driveType}
        </li>
        <li>
          <span>🔧 Condition:</span>
          {carDetails?.condition}
        </li>
        <li>
          <span>🛠 Engine Size:</span> {carDetails?.engineSize}
        </li>
        <li>
          <span>🚪 Door:</span> 4
        </li>
        <li>
          <span>🔩 Cylinder:</span> {carDetails?.cylinder}
        </li>
        <li>
          <span>🎨 Color:</span> {carDetails?.color}
        </li>
        <li>
          <span>🆔 VIN:</span> {carDetails?.vin}
        </li>
      </ul>
    </div>
  );
};

export default Specification;
