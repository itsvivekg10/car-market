import React from "react";
import Servicee from "../../../../shared/Servicee";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const OwnerDetails = ({ carDetails }) => {
  const { user } = useUser();
  const navigation = useNavigate();

  const onMessageOwnerButtonClick = async () => {
    const userId = user?.primaryEmailAddress?.emailAddress?.split("@")[0];
    const ownerId = carDetails?.createdBy.split("@")[0];
    try {
      await Servicee.createUserSendBird(
        userId,
        user?.fullName || "user Name",
        user?.imageUrl || "https://via.placeholder.com/150"
      ).then((resp) => {
        console.log("this is owner response", resp);
      });
    } catch (e) {}
    try {
      await Servicee.createUserSendBird(
        ownerId,
        carDetails?.nickName || "user Name",
        carDetails?.imageUrl || "https://via.placeholder.com/150"
      );
      console.log(ownerId);
    } catch (e) {}
    try {
      await Servicee.CreateSendBirdChannel(
        [userId, ownerId],
        carDetails?.listingTitle
      ).then((resp) => {
        console.log(resp);
        console.log("chanel created");
        navigation("/profile");
      });
    } catch (e) {}
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "350px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        marginLeft: "30px",
      }}
    >
      <h3>Owner/Deals</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px 0",
        }}
      >
        <img
          src={carDetails?.ownerAvatarUrl || "https://via.placeholder.com/50"}
          alt="Owner"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <div>
          <h4 style={{ margin: "0", fontSize: "16px" }}>
            {carDetails?.userName || "Owner Name"}
          </h4>
          <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
            {carDetails?.createdBy || "owner@example.com"}
          </p>
        </div>
      </div>
      <button
        onClick={onMessageOwnerButtonClick}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Message Owner
      </button>
    </div>
  );
};

export default OwnerDetails;
