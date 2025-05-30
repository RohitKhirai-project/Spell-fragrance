import React, { useState, useEffect } from "react";
import "./AdminEditPerfumes.css";

const AdminEditPerfumes = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImageIndex, setUploadingImageIndex] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3001/api/perfumes")
      .then((response) => response.json())
      .then((data) => {
        setPerfumes(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching perfumes:", error);
        setIsLoading(false);
        alert("Error fetching perfumes data!");
      });
  }, []);

  const handleNameChange = (index, value) => {
    const updatedPerfumes = [...perfumes];
    updatedPerfumes[index].name = value;
    setPerfumes(updatedPerfumes);
  };

  const handleImageUpload = (index, file) => {
    if (!file) {
      console.error("No file selected");
      alert("Please select an image to upload.");
      return;
    }

    console.log("Selected file:", file);
    setUploadingImageIndex(index);

    const formData = new FormData();
    formData.append("image", file);

    // Upload image to server
    fetch("http://localhost:3001/api/perfumes/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.imagePath) {
          console.log("Image uploaded successfully:", data.imagePath);
          const updatedPerfumes = [...perfumes];
          updatedPerfumes[index].image = data.imagePath;
          setPerfumes(updatedPerfumes);
        } else {
          console.error("Upload succeeded but response did not contain imagePath", data);
          throw new Error("Upload succeeded but invalid response.");
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Image upload failed! Check console for details.");
      })
      .finally(() => {
        setUploadingImageIndex(null);
      });
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(index, file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = () => {
    setIsLoading(true);
    fetch("http://localhost:3001/api/perfumes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ perfumes }),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Perfume carousel updated!");
        return fetch("http://localhost:3001/api/perfumes");
      })
      .then((res) => res.json())
      .then((data) => setPerfumes(data))
      .catch((error) => {
        console.error("Error updating perfumes:", error);
        alert("Error updating perfumes!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="admin-edit-perfumes">
      <h2>Edit Perfume Carousel</h2>
      {isLoading && <p className="loading">Loading...</p>}
      <div className="perfume-slider">
        {perfumes.map((perfume, index) => (
          <div key={index} className="perfume-item">
            <label>Image for {perfume.name || `Perfume ${index + 1}`}:</label>
            <div
              className="image-upload-box"
              onDrop={(e) => handleDrop(index, e)}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById(`fileInput-${index}`).click()}
            >
              <input
                id={`fileInput-${index}`}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(index, e.target.files[0])}
              />
              <div className="current-image-preview">
                {perfume.image ? (
                  <img
                    src={perfume.image?.startsWith("/uploads") ? `http://localhost:3001${perfume.image}` : perfume.image}
                    alt="Perfume"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback.jpg"; // Optional fallback image
                    }}
                  />
                ) : (
                  <p>No image selected</p>
                )}
              </div>
              {uploadingImageIndex === index && <p>Uploading...</p>}
            </div>

            <label>Perfume Name:</label>
            <input
              type="text"
              value={perfume.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="save-btn" onClick={handleSave} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminEditPerfumes;
