import React, { useEffect, useState } from "react";
import { db } from "../../../configs";
import { carImages, CarListing } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import FormatResult from "../../../shared/Service";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom"; // Import Link

function MostSaleCar() {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    getPopularCarList();
  }, []); // Added user as a dependency to make sure the effect runs when user is available

  const getPopularCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(carImages, eq(CarListing.id, carImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(10);

    const resp = FormatResult(result);
    console.log("this is index", resp);
    setCarList(resp);
  };

  return (
    <>
      <h1>Most Searched Cars</h1>
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
              <Link to={"/listingDetails/" + item?.id} className="view-details">
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
