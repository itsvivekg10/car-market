import React from "react";

function Checkbox({ label, checked, onChange, carInfo }) {
  return (
    <div className="checkbox-container">
      <input type="checkbox" id={label} checked={checked} onChange={onChange} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
}

export default Checkbox;
