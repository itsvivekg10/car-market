import React from "react";

const DetailHeader = ({ carDetails }) => {
  const styles = {
    header: {
      padding: "20px",
      backgroundColor: "white",
      color: "black",
    },
    title: {
      fontSize: "36px",
      margin: 0,
      color: "black",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: "18px",
      margin: "5px 0 20px",
      color: "black",
    },
    detailsContainer: {
      display: "flex",
      gap: "15px",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      display: "inline-flex",
    },
    detail: {
      display: "flex",
      alignItems: "center",
      padding: "5px 10px",
      borderRadius: "5px",
      backgroundColor: "#f0f4ff",
      color: "#0088cc",
      fontSize: "14px",
    },
    icon: {
      marginRight: "5px",
    },
  };

  return (
    <div style={styles.header}>
      <h1 style={styles.title}>{carDetails?.listingTitle}</h1>
      <p style={styles.subtitle}>{carDetails?.tagline}</p>
      <div style={styles.detailsContainer}>
        <div style={styles.detail}>
          <span style={styles.icon}>📅</span> 2021
        </div>
        <div style={styles.detail}>
          <span style={styles.icon}>📍</span> 250 miles
        </div>
        <div style={styles.detail}>
          <span style={styles.icon}>⚙️</span> {carDetails?.transmission}
        </div>
        <div style={styles.detail}>
          <span style={styles.icon}>⛽</span> {carDetails?.fuelType}
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
