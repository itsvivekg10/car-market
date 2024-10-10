import { useEffect, useState } from "react";
import SearchBar from "../../components/ui/searchbar/SearchBar";
import "./Hero.css";

function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Inline styles
  const heroStyle = {
    borderBottomLeftRadius: "3%",
    borderBottomRightRadius: "3%",
    border: "1px solid black",
    height: "100vh", // Full viewport height
    background: "#eef0fc", // Background gradient
    color: "black", // Text color for contrast
    textAlign: "center",
    padding: "0 20px", // Padding for small screens
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const textBoxStyle = {
    marginBottom: "90px",
  };

  const headingStyle = {
    fontSize:
      windowWidth <= 480 ? "1.5rem" : windowWidth <= 768 ? "2rem" : "1.5rem",
    fontWeight: "bold",
    margin: "3px 0",
    marginTop: "10px",
  };

  const secondHeadingStyle = {
    fontSize:
      windowWidth <= 480 ? "2rem" : windowWidth <= 768 ? "2.5rem" : "3rem",
  };

  const imageStyle = {
    width: "100% ",
    marginTop: "70px",
    // Make sure the image scales properly
  };

  return (
    <div style={heroStyle}>
      <div style={textBoxStyle}>
        <h2 style={headingStyle}>Find car for sale and for rent near you</h2>
        <h2 style={{ ...headingStyle, ...secondHeadingStyle }}>
          Find Your Dream Car
        </h2>
      </div>
      <SearchBar />
      <img
        className="her-image"
        style={imageStyle}
        src="https://www.pngplay.com/wp-content/uploads/8/White-Volkswagen-Car-No-Background.png"
        alt="Hero Car"
      />
    </div>
  );
}

export default Hero;
