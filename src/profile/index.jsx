import React, { useState } from "react";
import Header from "../component/header/Header";
import Inbox from "./components/Inbox";
import "./index.css";
import MyListing from "./components/myListing/MyListing";

function Profile() {
  const [activeSection, setActiveSection] = useState("my-listing");

  const renderContent = () => {
    switch (activeSection) {
      case "my-listing":
        return <MyListing />;
      case "inbox":
        return <Inbox />;
      case "profile":
        return <h2>My Profile</h2>;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="profile-tabs">
        <button
          className={`profile-tab-button ${
            activeSection === "my-listing" ? "active" : ""
          }`}
          onClick={() => setActiveSection("my-listing")}
        >
          My Listing
        </button>
        <button
          className={`profile-tab-button ${
            activeSection === "inbox" ? "active" : ""
          }`}
          onClick={() => setActiveSection("inbox")}
        >
          Inbox
        </button>
        <button
          className={`profile-tab-button ${
            activeSection === "profile" ? "active" : ""
          }`}
          onClick={() => setActiveSection("profile")}
        >
          Profile
        </button>
      </div>
      <div className="profile-content">{renderContent()}</div>
    </>
  );
}

export default Profile;
