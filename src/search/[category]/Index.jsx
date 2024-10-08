import React, { useEffect, useState } from "react";
import SearchBar from "../../components/ui/searchbar/SearchBar";
import { db } from "../../../configs";
import { carImages, CarListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import FormatResult from "../../../shared/Service";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/header/Header";
import "./categoryyy.css";

function SearchByCategory() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    getPopularCarList();
  }, [category]);

  const getPopularCarList = async () => {
    setLoading(true); // Start loading when fetching data
    const startTime = Date.now(); // Capture the start time

    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(carImages, eq(CarListing.id, carImages.carListingId))
        .where(eq(CarListing.category, category));

      const resp = FormatResult(result);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching car list:", error);
    } finally {
      // Ensure loading lasts at least 10 seconds
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime); // Calculate remaining time if any

      setTimeout(() => {
        setLoading(false); // Stop loading after at least 10 seconds
      }, remainingTime);
    }
  };

  return (
    <>
      <Header />
      <div
        className="search_back"
        style={{
          width: "100%",
          height: "180px",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SearchBar />
      </div>

      <div>
        <h1>{category}</h1>

        {/* Conditionally render skeleton while loading */}
        {loading ? (
          <div className="skeleton-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-details"></div>
              </div>
            ))}
          </div>
        ) : carList.length > 0 ? (
          <div className="car-grid">
            {carList.map((item, index) => (
              <div className="car-card" key={index}>
                <div className="car-card-header">
                  {item.images.length > 0 ? (
                    <img
                      src={item?.images[0].imageUrl}
                      alt={item.listingTitle}
                      className="car-image"
                    />
                  ) : (
                    <div className="car-image-placeholder">No Image</div>
                  )}
                  <span className="new-badge">New</span>
                </div>

                <div className="car-card-body">
                  <h3>{item.listingTitle}</h3>
                  <div className="car-details">
                    <p>{item.mileage} Miles</p>
                    <p>
                      {item.fuelType} | {item.transmission}
                    </p>
                    <p className="price">${item.sellingPrice}</p>
                  </div>
                </div>

                <div className="car-card-footer">
                  <Link
                    to={"/listingDetails/" + item?.id}
                    className="view-details"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Cars Found in {category}</p>
        )}
      </div>
    </>
  );
}

export default SearchByCategory;
