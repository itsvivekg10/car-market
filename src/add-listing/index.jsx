import { useState, useEffect } from "react";
import Header from "../component/header/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./addListing.css";
import carDetails from "../assets/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/drop/DropdownField";
import TextArea from "./components/TextArea";
import features from "../assets/features.json";
import Checkbox from "./components/Checkboxx";
import { db } from "../../configs";
import { carImages, CarListing } from "../../configs/schema";
import UploadImage from "./components/uploadImages/UploadImage";
import { useUser } from "@clerk/clerk-react";
import { eq } from "drizzle-orm";
import FormatResult from "../../shared/Service";

function AddListing() {
  const [formData, setFormData] = useState({}); // Unified state for form data
  const [featuresData, setFeaturesData] = useState({});
  const [triggerUploadImage, setTriggerUploadImage] = useState(null);
  const [searchParams] = useSearchParams();
  const [savedId, setSavedId] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");
  console.log("this is record id", recordId);
  useEffect(() => {
    if (mode === "edit") {
      GetListingDetail();
    }
  }, []);

  const GetListingDetail = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(carImages, eq(CarListing.id, carImages.carListingId))
        .where(eq(CarListing.id, recordId));
      const resp = FormatResult(result);
      setFormData(resp[0]); // Set formData directly from the fetched result
      setFeaturesData(resp[0]?.features || {}); // Initialize features
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //

  // const handleFeatureChange = (name, value) => {
  //   setFeaturesData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const handleFeatureChange = (name, value) => {
    // Update the state with the new feature value
    setFeaturesData((prevData) => {
      // Create a new object by including the current feature change
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      // Remove keys with false values
      return Object.fromEntries(
        Object.entries(updatedData).filter(([key, val]) => val) // Keep only true values
      );
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const emailAddress = user?.primaryEmailAddress?.emailAddress;

    if (!emailAddress) {
      alert("User email is not available. Please log in.");
      return;
    }

    try {
      if (mode === "edit") {
        await db
          .update(CarListing)
          .set({
            ...formData,
            features: featuresData,
            createdBy: emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
          })
          .where(eq(CarListing.id, recordId));
        navigate("/profile");
      } else {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: emailAddress,
          })
          .returning({ id: CarListing.id });

        if (result) {
          setTriggerUploadImage(result[0]?.id);
          setSavedId(result[0]?.id);
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    if (savedId) {
      navigate("/profile");
    }
  }, [savedId, navigate]);

  return (
    <>
      <Header />
      <div className="full-page">
        <h2>{mode === "edit" ? "Edit Listing" : "Add New Listing"}</h2>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <div>
              <h2>Car Details</h2>
              <div>
                {carDetails.carDetails.map((item, index) => (
                  <div key={index}>
                    <label>
                      {item.label}
                      {item.required && <span>*</span>}
                    </label>
                    {item.fieldType === "text" ||
                    item.fieldType === "number" ? (
                      <InputField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={formData} // Passing formData instead of carInfo
                      />
                    ) : item.fieldType === "dropdown" ? (
                      <DropdownField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={formData} // Passing formData
                      />
                    ) : item.fieldType === "textarea" ? (
                      <TextArea
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={formData} // Passing formData
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div>
              <h2>Features</h2>
              <div className="features-container">
                {features.features.map((item, index) => (
                  <div key={index}>
                    <Checkbox
                      label={item.label}
                      onChange={(e) =>
                        handleFeatureChange(item.name, e.target.checked)
                      }
                      checked={featuresData?.[item.name] || false}
                    />
                  </div>
                ))}
              </div>
              <hr />
            </div>
            <h3>Upload Car Images</h3>
            <div>
              <UploadImage triggerUploadImage={triggerUploadImage} />
            </div>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddListing;
