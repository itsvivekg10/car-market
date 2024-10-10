import React, { useEffect, useState } from "react";
import DetailHeader from "../components/Detail/DetailHeader";
import Header from "../../component/header/Header";
import Calculator from "../components/Calculator";
import Price from "../components/Price";
import Features from "../components/features/Features";
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
      console.log("Error fetching details", error);
    }
  };

  // Inline styles
  const listingDetailsContainer = {
    width: "95%",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    marginLeft: "15px",
  };

  const detailsContent = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const detailsLeft = {
    flex: 1,
    maxWidth: "60%",
    paddingRight: "20px",
  };

  const detailsImg = {
    width: "750px",
    height: "500px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    marginLeft: "50px",
  };

  const detailsRight = {
    flex: 1,
    maxWidth: "35%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const sectionStyle = {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const responsiveStyle = {
    flexDirection: "column",
  };

  return (
    <>
      <Header />
      <div style={listingDetailsContainer}>
        <DetailHeader carDetails={carDetails} />
        <div
          style={
            window.innerWidth <= 768
              ? { ...detailsContent, ...responsiveStyle }
              : detailsContent
          }
        >
          {/* Left Section */}
          <div style={detailsLeft}>
            <img
              style={detailsImg}
              src={carDetails?.images[0].imageUrl}
              alt="Car"
            />
            <Features carDetails={carDetails} />
            <Calculator />
          </div>

          {/* Right Section */}
          <div style={detailsRight}>
            <div style={sectionStyle}>
              <Price carDetails={carDetails} />
            </div>
            <div style={sectionStyle}>
              <Specification carDetails={carDetails} />
            </div>
            <div style={sectionStyle}>
              <OwnerDetails carDetails={carDetails} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingDetails;
