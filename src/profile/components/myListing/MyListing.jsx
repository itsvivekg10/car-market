import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../../../configs";
import { desc, eq } from "drizzle-orm";
import { carImages, CarListing } from "../../../../configs/schema";
import FormatResult from "../../../../shared/Service";

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  const deleteData = async (carListingId) => {
    try {
      await db
        .delete(carImages)
        .where(eq(carImages.carListingId, carListingId));
      await db.delete(CarListing).where(eq(CarListing.id, carListingId));
      GetUserListing(); // Refresh car listing after deletion
    } catch (error) {
      console.error("Error deleting the listing:", error);
    }
  };

  useEffect(() => {
    if (user) {
      GetUserListing();
    }
  }, [user]);

  const GetUserListing = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(carImages, eq(CarListing.id, carImages.carListingId))
        .where(
          eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(CarListing.id));
      const resp = FormatResult(result);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching user listings:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>My Listing</h2>
        <Link to={"/addListing"}>
          <button
            style={{
              backgroundColor: "#0088cc",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            + Add New Listing
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {carList.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ position: "relative" }}>
              {item.images.length > 0 ? (
                <img
                  src={item?.images[0].imageUrl}
                  alt={item.listingTitle}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "150px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No Image
                </div>
              )}
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#00cc00",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                New
              </span>
            </div>

            <div style={{ padding: "15px" }}>
              <h3>{item.listingTitle}</h3>
              <div>
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                  {item.mileage} Miles
                </p>
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                  {item.fuelType} | {item.transmission}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "18px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  ${item.sellingPrice}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                borderTop: "1px solid #ddd",
              }}
            >
              <Link
                to={"/listingDetails/" + item?.id}
                style={{
                  color: "#0088cc",
                  textDecoration: "none",
                }}
              >
                View Details
              </Link>
              <div style={{ display: "flex", gap: "10px" }}>
                <Link to={"/addListing?mode=edit&id=" + item?.id}>
                  <button
                    style={{
                      backgroundColor: "#0088cc",
                      color: "white",
                      padding: "8px 15px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fa fa-pencil"></i> Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteData(item.id)}
                  style={{
                    backgroundColor: "#0088cc",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyListing;
