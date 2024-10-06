import React from "react";

function Price({ carDetails }) {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "350px",
        margin: "0 auto",
      }}
    >
      <p style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
        Our Price
      </p>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>
        ${carDetails?.originalPrice}
      </h1>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          marginLeft: "70px",
        }}
      >
        <span role="img" aria-label="tag" style={{ fontSize: "18px" }}>
          🔖
        </span>
        Make an Offer Price
      </button>
    </div>
  );
}

export default Price;
