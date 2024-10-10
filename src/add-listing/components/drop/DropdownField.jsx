import React from "react";

function DropdownField({ item, handleInputChange, carInfo }) {
  const selectStyle = {
    width: "100%",
    backgroundColor: "#fff", // White background
    color: "#000", // Black text
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #000", // Black border
    outline: "none",
    fontSize: "1rem",
    // marginLeft: "30px",
  };

  return (
    <select
      onChange={(e) => handleInputChange(item.name, e.target.value)}
      required={item.required}
      value={carInfo?.[item.name] || ""}
      style={selectStyle} // Apply inline styles here
    >
      <option value="">Select...</option>
      {item?.options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default DropdownField;
