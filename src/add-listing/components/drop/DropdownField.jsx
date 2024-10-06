import React from "react";
import "./dropdown.css";

function DropdownField({ item, handleInputChange, carInfo }) {
  return (
    <select
      onChange={(e) => handleInputChange(item.name, e.target.value)}
      required={item.required}
      value={carInfo?.[item.name] || ""} // Controlled component: value is tied to state
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
