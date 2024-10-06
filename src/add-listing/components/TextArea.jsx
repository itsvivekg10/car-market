import React from "react";

function TextArea({ item, handleInputChanges }) {
  return (
    <textarea
      name={item.name}
      onChange={(e) => handleInputChanges(item.name, e.target.value)}
    ></textarea>
  );
}

export default TextArea;
