import React from "react";

function InputField({ item, handleInputChange, carInfo }) {
  return (
    <div>
      <input
        type={item?.fieldType}
        name={item?.name}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        defaultValue={carInfo?.[item.name]}
      />
    </div>
  );
}

export default InputField;
