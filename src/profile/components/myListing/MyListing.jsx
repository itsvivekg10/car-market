import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../../../configs";
import { desc, eq } from "drizzle-orm";
import { carImages, CarListing } from "../../../../configs/schema";
import FormatResult from "../../../../shared/Service";
import "./myListinng.css";

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  const deleteData = async (carListingId) => {
    try {
      await db
        .delete(carImages)
        .where(eq(carImages.carListingId, carListingId));
      await db.delete(CarListing).where(eq(CarListing.id, carListingId));
      // Refresh car listing after deletion
      GetUserListing();
    } catch (error) {
      console.error("Error deleting the listing:", error);
    }
  };

  useEffect(() => {
    if (user) {
      user && GetUserListing();
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
      <div className="heading">
        <h2>My Listing</h2>
        <Link to={"/addListing"}>
          <button className="add-listing-btn">+ Add New Listing</button>
        </Link>
      </div>
      <div className="car-grid">
        {carList.map((item, index) => (
          <div className="car-card" key={index}>
            <div className="car-card-header">
              {item.images.length > 0 ? (
                <img
                  src={item?.images[0].imageUrl}
                  alt={item.listingTitle}
                  className="car-image"
                />
              ) : (
                <div className="car-image-placeholder">No Image</div>
              )}
              <span className="new-badge">New</span>
            </div>

            <div className="car-card-body">
              <h3>{item.listingTitle}</h3>
              <div className="car-details">
                <p>{item.mileage} Miles</p>
                <p>
                  {item.fuelType} | {item.transmission}
                </p>
                <p className="price">${item.sellingPrice}</p>
              </div>
            </div>

            <div className="car-card-footer">
              <Link to={"/listingDetails/" + item?.id} className="view-details">
                View Details
              </Link>
              <div className="action-buttons">
                <Link to={"/addListing?mode=edit&id=" + item?.id}>
                  {" "}
                  <button className="edit-btn">
                    <i className="fa fa-pencil"></i> Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteData(item.id)}
                  className="delete-btn"
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
