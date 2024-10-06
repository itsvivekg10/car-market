import PropTypes from "prop-types";
import "./carItem.css";

const CarItem = ({ car }) => {
  return (
    <div className="car-item">
      <div className="car-item-image">
        <img src={car.images[0]?.imageUrl} alt={car?.listingTitle || "Car"} />
        {car.isNew && <span className="new-badge">New</span>}
      </div>
      <div className="car-item-details">
        <h2>{car.mileage} miles</h2>
        <div className="car-item-info">
          <span>
            <i className="icon-id-card"></i> {car.vin}
          </span>
          <span>
            <i className="icon-fuel"></i> {car.fuelType}
          </span>
          <span>
            <i className="icon-gear"></i> {car.transmission}
          </span>
          <span>
            <i className="icon-mileage"></i> {car.mileage} Miles
          </span>
        </div>
        <div className="car-item-footer">
          <span className="price">${car.sellingPrice}</span>
          <a href={car.detailsLink} className="details-link">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

// Adding prop-types for validation
CarItem.propTypes = {
  car: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
      })
    ),
    listingTitle: PropTypes.string,
    isNew: PropTypes.bool,
    mileage: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired,
    fuelType: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    sellingPrice: PropTypes.number.isRequired,
    detailsLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarItem;
