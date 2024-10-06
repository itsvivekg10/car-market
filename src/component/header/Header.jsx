import React from "react";
import "./Header.css"; // Import the CSS file
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={"/"}>
          {" "}
          <img
            src="https://i.pinimg.com/474x/58/83/50/58835056a4df73143850f0c1b7e0ff4f.jpg"
            alt="Logo"
          />
        </Link>
      </div>
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Search</li>
        <li>New</li>
        <li>Preowned</li>
      </ul>
      {isSignedIn ? (
        <div>
          <Link to={"/profile"}>
            {" "}
            <UserButton className="userButton" />
          </Link>

          <Link to={"/profile"}>
            {" "}
            <button className="sign-in-button">Submit Listing</button>
          </Link>
        </div>
      ) : (
        <SignInButton className="sign-in-button"> Sign in</SignInButton>
      )}
    </nav>
  );
}

export default Header;
