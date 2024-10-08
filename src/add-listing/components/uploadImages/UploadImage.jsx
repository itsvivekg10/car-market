// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./uploadImages.css";
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
    <div className="upload-container">
      {selectedFile.map((image, index) => (
        <div key={index} className="upload">
          <button className="dlt-btn" onClick={() => onDeleteImage(index)}>
            ❌
          </button>
          <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
        </div>
      ))}
      <div className="file-input-wrapper">
        <input
          type="file"
          id="file1"
          className="file-input"
          onChange={onFileSelected}
          multiple
        />
        <label htmlFor="file1" className="file-label"></label>
      </div>
    </div>
  );
}

export default UploadImage;
