import React from "react";
import Servicee from "../../../../shared/Servicee";
import "./ownerDetails.css"; // External CSS file
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
        //
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

  // const onMessageOwnerButtonClick = async () => {
  //   try {
  //     if (!user) throw new Error("User is not logged in.");

  //     const userId = user.primaryEmailAddress?.emailAddress.split("@")[0];
  //     if (!userId) throw new Error("UserId is undefined.");
  //     console.log("This is user id:", userId);

  //     const userResponse = await Servicee.createUserSendBird(
  //       userId,
  //       user.fullName || "Default Name",
  //       user.imageUrl || "https://via.placeholder.com/150"
  //     );
  //     console.log("User SendBird response:", userResponse);

  //     const ownerUserId = carDetails?.createdBy?.split("@")[0];
  //     console.log(ownerUserId);
  //   } catch (error) {
  //     // console.error("Error in onMessageOwnerButtonClick:", error.message);
  //     console.log(error.message);
  //   }
  //   // const ownerResponse = await Servicee.createUserSendBird(
  //   //   ownerUserId,
  //   //   carDetails?.userName || "Owner Name", // Use actual owner name if available
  //   //   carDetails?.ownerAvatarUrl || "https://via.placeholder.com/150"
  //   // );
  //   // console.log("Owner SendBird response:", ownerResponse);

  //   // const channelResponse = await Servicee.CreateSendBirdChannel(
  //   //   [userId, ownerUserId],
  //   //   carDetails?.listingTitle || "Default Title"
  //   // );
  //   // console.log("Channel creation response:", channelResponse);
  //   // navigate("/profile");
  //   // } catch (error) {
  //   //   // console.error("Error in onMessageOwnerButtonClick:", error.message);
  //   // }
  // };

  return (
    <div className="owner-card">
      <h3>Owner/Deals</h3>
      <div className="owner-info">
        <img
          src={carDetails?.ownerAvatarUrl || "https://via.placeholder.com/50"}
          alt="Owner"
          className="owner-avatar"
        />
        <div className="owner-text">
          <h4>{carDetails?.userName || "Owner Name"}</h4>
          <p>{carDetails?.createdBy || "owner@example.com"}</p>
        </div>
      </div>
      <button onClick={onMessageOwnerButtonClick} className="message-btn">
        Message Owner
      </button>
    </div>
  );
};

export default OwnerDetails;
