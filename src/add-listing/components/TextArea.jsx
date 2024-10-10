import React from "react";

function TextArea({ item, handleInputChanges }) {
  const textAreaStyle = {
    width: "100%", // Full width for responsiveness
    maxWidth: "400px", // Maximum width limit
    minHeight: "100px", // Minimum height for better user experience
    padding: "10px", // Padding inside the textarea
    borderRadius: "5px", // Rounded corners
    border: "1px solid #000", // Border color
    outline: "none", // No outline on focus
    fontSize: "1rem", // Font size
    boxSizing: "border-box", // Include padding and border in the element's total width and height
  };

  const containerStyle = {
    display: "flex", // Flex container for better layout
    flexDirection: "column", // Stack elements vertically
    marginBottom: "15px", // Space between textarea fields
  };

  return (
    <div style={containerStyle}>
      <textarea
        name={item.name}
        onChange={(e) => handleInputChanges(item.name, e.target.value)}
        style={textAreaStyle} // Apply the textarea styles
      ></textarea>
    </div>
  );
}

export default TextArea;
