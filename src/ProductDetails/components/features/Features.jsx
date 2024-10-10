import React from "react";

function Features({ carDetails }) {
  console.log("ln4", carDetails?.features);

  const featureData = carDetails?.features
    ? Object.keys(carDetails.features)
    : [];

  // Inline styles
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 equal columns
    gap: "16px", // Space between items
    marginTop: "20px",
  };

  const featureItemStyle = {
    display: "flex",
    alignItems: "center",
  };

  const checkboxStyle = {
    marginRight: "8px", // Space between the checkbox and feature text
  };

  // Media queries for smaller screens
  const mobileStyle =
    window.innerWidth <= 768
      ? { gridTemplateColumns: "repeat(2, 1fr)" }
      : window.innerWidth <= 480
      ? { gridTemplateColumns: "1fr" }
      : {};

  return (
    <>
      <div>
        <h3>Features</h3>
        <div style={{ ...containerStyle, ...mobileStyle }}>
          {featureData.length > 0 ? (
            featureData.map((item, index) => (
              <div key={index} style={featureItemStyle}>
                <span style={checkboxStyle}>☑️</span>
                <span>{item}</span>
              </div>
            ))
          ) : (
            <p>No features available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Features;
