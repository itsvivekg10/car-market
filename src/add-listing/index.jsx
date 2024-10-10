import { useState, useEffect } from "react";
import Header from "../component/header/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [formData, setFormData] = useState({});
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
      setFormData(resp[0]);
      setFeaturesData(resp[0]?.features || {});
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

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      return Object.fromEntries(
        Object.entries(updatedData).filter(([key, val]) => val)
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

  // Inline styles with responsiveness
  const styles = {
    fullPage: {
      backgroundColor: "#f4f4f4",
      padding: "20px",
      minHeight: "100vh",
    },
    formContainer: {
      width: "90%",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      border: "2px solid #000",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      margin: "0 auto",
    },
    heading: {
      marginBottom: "20px",
      color: "#000",
      fontSize: "1.8rem",
      textAlign: "center",
    },
    sectionHeader: {
      fontSize: "1.5rem",
      marginBottom: "20px",
      color: "#000",
    },
    fieldContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    },
    label: {
      marginBottom: "5px",
      fontSize: "1rem",
      color: "#000",
    },
    inputField: {
      backgroundColor: "#fff",
      color: "#000",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #000",
      outline: "none",
      fontSize: "1rem",
      width: "100%",
    },
    textarea: {
      width: "100%",
      height: "100px",
    },
    requiredAsterisk: {
      color: "#e74c3c",
      marginLeft: "5px",
    },
    featuresContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    submitButton: {
      backgroundColor: "#00aaff",
      border: "none",
      padding: "10px 15px",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      borderRadius: "4px",
      width: "20%",
      marginTop: "10px",
      marginLeft: "35 %",
    },
  };

  return (
    <>
      <Header />
      <div style={styles.fullPage}>
        <h2 style={styles.heading}>
          {mode === "edit" ? "Edit Listing" : "Add New Listing"}
        </h2>
        <div style={styles.formContainer}>
          <form onSubmit={onSubmit}>
            <div>
              <h2 style={styles.sectionHeader}>Car Details</h2>
              <div style={styles.fieldContainer}>
                {carDetails.carDetails.map((item, index) => (
                  <div key={index}>
                    <label style={styles.label}>
                      {item.label}
                      {item.required && (
                        <span style={styles.requiredAsterisk}>*</span>
                      )}
                    </label>
                    {item.fieldType === "text" ||
                    item.fieldType === "number" ? (
                      <InputField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={formData}
                        style={styles.inputField}
                      />
                    ) : item.fieldType === "dropdown" ? (
                      <DropdownField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={formData}
                      />
                    ) : item.fieldType === "textarea" ? (
                      <TextArea
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={formData}
                        style={styles.textarea}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div>
              <h2 style={styles.sectionHeader}>Features</h2>
              <div style={styles.featuresContainer}>
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
            <button style={styles.submitButton} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddListing;
