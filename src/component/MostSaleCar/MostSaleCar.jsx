import React, { useEffect, useState } from "react";
import { db } from "../../../configs";
import { carImages, CarListing } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import FormatResult from "../../../shared/Service";
import { Link } from "react-router-dom"; // Import Link

function MostSaleCar() {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    getPopularCarList();
  }, []);

  const getPopularCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(carImages, eq(CarListing.id, carImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(10);

    const resp = FormatResult(result);
    setCarList(resp);
  };

  return (
    <>
      <h1>Most Searched Cars</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {carList.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
                    height: "150px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No Image
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

            <div style={{ padding: "15px" }}>
              <h3>{item.listingTitle}</h3>
              <div>
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                  {item.mileage} Miles
                </p>
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                  {item.fuelType} | {item.transmission}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "18px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  ${item.sellingPrice}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                borderTop: "1px solid #ddd",
              }}
            >
              <Link
                to={"/listingDetails/" + item?.id}
                style={{
                  color: "#0088cc",
                  textDecoration: "none",
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MostSaleCar;
