import React from "react";
import data from "../../assets/data";
import "./cateagory.css"; // Make sure this matches your file name
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="category-container">
      <h3 className="category-heading">Browse By Type</h3>
      <div className="category-list">
        {data.Category.map((category, index) => (
          <Link key={index} to={"/search/" + category.name}>
            <div className="category-item" style={{ textDecoration: "none" }}>
              <img
                src={category.icon}
                alt={category.name}
                className="category-icon"
              />
              <p className="category-name" style={{ textDecoration: "none" }}>
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
