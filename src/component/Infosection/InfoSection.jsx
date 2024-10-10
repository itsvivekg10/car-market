import React, { useEffect, useState } from "react";

function InfoSection() {
  // State for current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Array of vintage car images
  const vintageCarImages = [
    "https://i.pinimg.com/originals/0a/21/6c/0a216c693f3b492833c6a5edd3cc8174.jpg",
    "https://www.shutterstock.com/image-photo/vintage-classic-cars-car-show-600nw-2290836507.jpg",
  ];

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % vintageCarImages.length);
    }, 3000); // Changed to 3000ms for a 3-second interval

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [vintageCarImages.length]);

  // Define styles as JavaScript objects
  const styles = {
    section: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
      display: "flex",
      flexDirection: window.innerWidth < 768 ? "column" : "row", // Conditional for mobile and desktop
    },
    imageWrapper: {
      position: "relative",
      overflow: "hidden",
      height: "300px", // Set a fixed height for the image
      flex: 1,
    },
    image: {
      width: "100%",
      height: "300px",
      objectFit: "cover",
      transition: "opacity 0.5s ease-in-out",
    },
    contentWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f3f4f6", // Light gray background
      padding: "2rem",
      flex: 1,
      flexDirection: window.innerWidth < 768 ? "column" : "row", // Responsive layout
    },
    content: {
      maxWidth: "500px",
      textAlign: "left",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    description: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "2rem",
    },
    button: {
      display: "inline-block",
      padding: "0.75rem 2rem",
      backgroundColor: isHovered ? "transparent" : "#4f46e5", // Indigo color
      color: isHovered ? "#4f46e5" : "white",
      textDecoration: "none",
      border: "1px solid #4f46e5",
      borderRadius: "4px",
      fontSize: "1rem",
      transition: "all 0.3s ease",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.contentWrapper}>
        <div style={styles.imageWrapper}>
          <img
            alt="Vintage Car"
            src={vintageCarImages[currentSlide]}
            style={styles.image}
          />
        </div>
        <div style={styles.content}>
          <h2 style={styles.heading}>Explore Our Collection of Vintage Cars</h2>
          <p style={styles.description}>
            Discover the beauty and history of vintage automobiles. These
            classic cars are a testament to timeless design and craftsmanship.
          </p>
          <a
            href="#"
            style={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
