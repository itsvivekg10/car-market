import React from "react";

function InputField({ item, handleInputChange, carInfo }) {
  const inputStyle = {
    width: "100%", // Full width to ensure responsiveness
    maxWidth: "400px", // Maximum width
    padding: "10px", // Padding for the input field
    borderRadius: "5px", // Rounded corners
    border: "1px solid #000", // Border color
    outline: "none", // No outline on focus
    fontSize: "1rem", // Font size
    boxSizing: "border-box", // Include padding and border in element's total width and height
  };

  const containerStyle = {
    display: "flex", // Flex container to align items
    flexDirection: "column", // Stack elements vertically
    marginBottom: "15px", // Space between input fields
  };

  return (
    <div style={containerStyle}>
      <input
        type={item?.fieldType}
        name={item?.name}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        defaultValue={carInfo?.[item.name]}
        style={inputStyle} // Apply the input styles
      />
    </div>
  );
}

export default InputField;
