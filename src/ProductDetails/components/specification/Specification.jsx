import React from "react";

const Specification = ({ carDetails }) => {
  const containerStyle = {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "350px",
    marginLeft: "30px",
    fontFamily: '"Arial", sans-serif',
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
  };

  const listItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f0f0f0",
  };

  const lastItemStyle = {
    borderBottom: "none",
  };

  const spanStyle = {
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <span style={spanStyle}>🚗 Body:</span>
          {carDetails?.category}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>📏 Mileage:</span>
          {carDetails?.mileage}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>⛽ Fuel Type:</span>
          {carDetails?.fuelType}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>📅 Year:</span>
          {carDetails?.year}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>⚙️ Transmission:</span>{" "}
          {carDetails?.transmission}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>🚙 Drive Type:</span> {carDetails?.driveType}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>🔧 Condition:</span> {carDetails?.condition}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>🛠 Engine Size:</span> {carDetails?.engineSize}
        </li>
        <li style={{ ...listItemStyle, ...lastItemStyle }}>
          <span style={spanStyle}>🚪 Door:</span> 4
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>🔩 Cylinder:</span> {carDetails?.cylinder}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>🎨 Color:</span> {carDetails?.color}
        </li>
        <li style={listItemStyle}>
          <span style={spanStyle}>🆔 VIN:</span> {carDetails?.vin}
        </li>
      </ul>
    </div>
  );
};

export default Specification;
