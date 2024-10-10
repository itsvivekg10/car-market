import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of Link for programmatic navigation

function SearchBar() {
  const [cars, setCar] = useState("");
  const [make, setMakers] = useState("");
  const [price, setPricing] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buildQueryString = () => {
    const queryParams = [];

    if (cars) queryParams.push(`car=${encodeURIComponent(cars)}`);
    if (make) queryParams.push(`make=${encodeURIComponent(make)}`);
    if (price) queryParams.push(`price=${encodeURIComponent(price)}`);

    return queryParams.length ? `./search?${queryParams.join("&")}` : "#";
  };

  // Inline styles
  const searchBarStyle = {
    display: "flex",
    flexDirection: windowWidth <= 768 ? "column" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "50px",
    padding: "10px",
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    marginBottom: "10px",
  };

  const searchSelectStyle = {
    border: "none",
    outline: "none",
    fontSize: windowWidth <= 768 ? "0.9rem" : "1rem",
    padding: "5px 10px",
    flex: 1,
    fontStyle: "italic",
    background: "none",
    margin: windowWidth <= 768 ? "5px 0" : "0 10px",
  };

  const dividerStyle = {
    width: "1px",
    height: "100%",
    backgroundColor: "black",
    margin: "0 10px",
    display: windowWidth <= 768 ? "none" : "block",
  };

  const mobileSearchInputStyle = {
    width: "100%",
    padding: "8px",
    border: "none",
    outline: "none",
    fontSize: "0.9rem",
    marginBottom: "10px",
    backgroundColor: "transparent",
  };

  // Search button styles
  const searchButtonStyle = {
    border: "none",
    background: "none",
    cursor: "pointer",
  };

  const searchIconStyle = {
    width: "24px",
    height: "24px",
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    const queryString = buildQueryString();
    navigate(queryString); // Navigate to the search page
  };

  return (
    <form style={searchBarStyle} onSubmit={handleSearch}>
      {/* Mobile search input */}
      {windowWidth <= 768 ? (
        <input
          type="text"
          placeholder="Search for cars..."
          style={mobileSearchInputStyle}
        />
      ) : (
        <>
          <select
            style={searchSelectStyle}
            value={cars}
            onChange={(e) => setCar(e.target.value)}
          >
            <option value="">Car</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Truck">Truck</option>
          </select>

          <div style={dividerStyle}></div>

          <select
            style={searchSelectStyle}
            value={make}
            onChange={(e) => setMakers(e.target.value)}
          >
            <option value="">Car Makers</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
          </select>

          <div style={dividerStyle}></div>

          <select
            style={searchSelectStyle}
            value={price}
            onChange={(e) => setPricing(e.target.value)}
          >
            <option value="">Pricing</option>
            <option value="Below 20k">Below $20,000</option>
            <option value="20k-50k">$20,000 - $50,000</option>
            <option value="Above 50k">Above $50,000</option>
          </select>
          <button type="submit" style={searchButtonStyle}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/search--v1.png"
              alt="Search Icon"
              style={searchIconStyle}
            />
          </button>
        </>
      )}
    </form>
  );
}

export default SearchBar;
