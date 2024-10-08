import React from "react";
import "./features.css"; // Import your CSS file

function Features({ carDetails }) {
  console.log("ln4", carDetails?.features);

  const featureData = carDetails?.features
    ? Object.keys(carDetails.features)
    : [];

  return (
    <>
      <div>
        <h3>Features</h3>
        <div className="features-container">
          {featureData.length > 0 ? (
            featureData.map((item, index) => (
              <div key={index} className="feature-item">
                <span>☑️</span>
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
