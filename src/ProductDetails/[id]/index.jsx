import React, { useEffect, useState } from "react";
import DetailHeader from "../components/Detail/DetailHeader";
// import Header from "../../component/header/HEader";
import Header from "../../component/header/Header";
import Calculator from "../components/Calculator";
import Price from "../components/Price";
import Features from "../components/features/Features";
import "./cardetails.css";
import Specification from "../components/specification/Specification";
import OwnerDetails from "../components/ProfileId/OwnerDetails";
import FormatResult from "../../../shared/Service";
import { db } from "../../../configs";
import { carImages, CarListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { useParams } from "react-router-dom";
function ListingDetails() {
  const { id } = useParams();
  console.log("this is is", id);
  const [carDetails, setCarDetails] = useState();
  console.log("ln19", carDetails);

  useEffect(() => {
    GetListingDetails();
  }, []);

  const GetListingDetails = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(carImages, eq(CarListing.id, carImages.carListingId))
        .where(eq(CarListing.id, id));
      const resp = FormatResult(result);
      console.log("this is", resp);
      setCarDetails(resp[0]);
    } catch (error) {
      console.log("Error fetching detials", error);
    }
  };

  return (
    <>
      <Header />
      <div className="listing-details-container">
        <DetailHeader carDetails={carDetails} />
        <div className="details-content">
          {/* Left Section */}
          <div className="details-left">
            <img
              className="details-img"
              src={carDetails?.images[0].imageUrl}
              alt="Car"
            />
            <Features carDetails={carDetails} />
            <Calculator />
          </div>

          {/* Right Section */}
          <div className="details-right">
            <Price carDetails={carDetails} />
            <Specification carDetails={carDetails} />
            <OwnerDetails carDetails={carDetails} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingDetails;
