import React, { useState } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";

function SearchBar() {
  const [cars, setCar] = useState(""); // Initialize with empty string
  const [make, setMakers] = useState(""); // Initialize with empty string
  const [price, setPricing] = useState(""); // Initialize with empty string

  const buildQueryString = () => {
    const queryParams = [];

    if (cars) queryParams.push(`car=${cars}`);
    if (make) queryParams.push(`make=${make}`);
    if (price) queryParams.push(`price=${price}`);

    return queryParams.length ? `./search?${queryParams.join("&")}` : "#";
  };

  return (
    <div className="search-bar">
      {/* Dropdown for Car */}
      <select
        className="search-select"
        value={cars}
        onChange={(e) => setCar(e.target.value)}
      >
        <option value="">Car</option>
        <option value="SUV">SUV</option>
        <option value="Sedan">Sedan</option>
        <option value="Truck">Truck</option>
      </select>

      <div className="divider"></div>

      {/* Dropdown for Car Makers */}
      <select
        className="search-select"
        value={make}
        onChange={(e) => setMakers(e.target.value)}
      >
        <option value="">Car Makers</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Ford">Ford</option>
      </select>

      <div className="divider"></div>

      {/* Dropdown for Pricing */}
      <select
        className="search-select"
        value={price}
        onChange={(e) => setPricing(e.target.value)}
      >
        <option value="">Pricing</option>
        <option value="Below 20k">Below $20,000</option>
        <option value="20k-50k">$20,000 - $50,000</option>
        <option value="Above 50k">Above $50,000</option>
      </select>

      {/* Search button with icon */}
      <Link to={buildQueryString()}>
        <button className="search-button">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/search--v1.png"
            alt="Search Icon"
            className="search-icon"
          />
        </button>
      </Link>
    </div>
  );
}

export default SearchBar;
