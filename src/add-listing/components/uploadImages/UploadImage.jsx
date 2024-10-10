// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { storage } from "../../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { carImages } from "../../../../configs/schema";
import { db } from "../../../../configs";
// eslint-disable-next-line react/prop-types
function UploadImage({ triggerUploadImage }) {
  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    if (triggerUploadImage) {
      uploadImagesToServer();
    }
  }, [triggerUploadImage]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setSelectedFile((prev) => [...prev, file]);
    }
  };

  const onDeleteImage = (index) => {
    setSelectedFile((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToServer = () => {
    selectedFile.forEach((file) => {
      const fileName = Date.now() + "_" + file.name;
      const storageRef = ref(storage, "car-marketplace/" + fileName);
      const metaData = {
        contentType: file.type,
      };

      uploadBytes(storageRef, file, metaData)
        .then(() => {
          console.log("Uploaded file:", fileName);
        })
        .then(() => {
          getDownloadURL(storageRef)
            .then(async (downloadUrl) => {
              console.log("File available at:", downloadUrl);
              await db.insert(carImages).values({
                imageUrl: downloadUrl,
                carListingId: triggerUploadImage,
              });
            })
            .catch((error) => {
              console.error("Error uploading file:", error);
            });
        });
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {selectedFile.map((image, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            display: "inline-block",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              border: "none",
              borderRadius: "50%",
              color: "white",
              padding: "5px",
              cursor: "pointer",
              fontSize: "12px",
            }}
            onClick={() => onDeleteImage(index)}
          >
            ❌
          </button>
          <img
            src={URL.createObjectURL(image)}
            alt={`Preview ${index}`}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "2px solid #e0e0e0",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      ))}
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url("https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <input
          type="file"
          id="file1"
          style={{
            opacity: 0,
            position: "absolute",
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
          onChange={onFileSelected}
          multiple
        />
        <label
          htmlFor="file1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            width: "100%",
            height: "100%",
          }}
        ></label>
      </div>
    </div>
  );
}

export default UploadImage;
