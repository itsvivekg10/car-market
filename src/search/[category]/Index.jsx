import React, { useEffect, useState } from "react";
import SearchBar from "../../components/ui/searchbar/SearchBar";
import { db } from "../../../configs";
import { carImages, CarListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import FormatResult from "../../../shared/Service";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/header/Header";

function SearchByCategory() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularCarList();
  }, [category]);

  const getPopularCarList = async () => {
    setLoading(true);
    const startTime = Date.now();

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
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);

      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    }
  };

  const skeletonCardStyle = {
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    padding: "16px",
    boxSizing: "border-box",
  };

  const skeletonImageStyle = {
    width: "100%",
    height: "150px",
    backgroundColor: "#e0e0e0",
    marginBottom: "10px",
  };

  const skeletonTextStyle = {
    width: "70%",
    height: "20px",
    backgroundColor: "#e0e0e0",
    marginBottom: "10px",
  };

  return (
    <div style={{ padding: "16px" }}>
      <Header />
      <div
        style={{
          marginBottom: "20px",
          width: "100%",
          height: "100px",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <SearchBar />
        </div>
      </div>

      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>{category}</h1>

      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} style={skeletonCardStyle}>
              <div style={skeletonImageStyle}></div>
              <div>
                <div style={skeletonTextStyle}></div>
                <div style={skeletonTextStyle}></div>
              </div>
            </div>
          ))}
        </div>
      ) : carList.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {carList.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative" }}>
                {item.images.length > 0 ? (
                  <img
                    src={item?.images[0].imageUrl}
                    alt={item.listingTitle}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p>No Image</p>
                  </div>
                )}
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#00cc00",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                  }}
                >
                  New
                </span>
              </div>

              <div style={{ padding: "16px", flexGrow: 1 }}>
                <h3 style={{ fontSize: "18px", margin: "0 0 10px" }}>
                  {item.listingTitle}
                </h3>
                <div>
                  <p style={{ margin: "5px 0" }}>{item.mileage} Miles</p>
                  <p style={{ margin: "5px 0" }}>
                    {item.fuelType} | {item.transmission}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      margin: "5px 0",
                    }}
                  >
                    ${item.sellingPrice}
                  </p>
                </div>
              </div>

              <div style={{ padding: "16px", borderTop: "1px solid #ccc" }}>
                <Link to={"/listingDetails/" + item?.id}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Cars Found in {category}</p>
      )}
    </div>
  );
}

export default SearchByCategory;
