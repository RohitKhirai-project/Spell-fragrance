import React, { useState } from "react";
import "./AdminEditHero.css";

const AdminEditHero = () => {
  const [slides, setSlides] = useState([
    {
      image: "/Hero-images/i1.avif",
      title: "Lemon-flavored Soda",
      subtitle: "Fruit Soda",
      description:
        "A refreshing lemon soda with a burst of citrus flavor perfect for summer days.",
    },
    {
      image: "/Hero-images/i2.avif",
      title: "Orange Spark Soda",
      subtitle: "Fruit Soda",
      description: "A tangy orange soda with a spark of sweetness and citrus joy.",
    },
    {
      image: "/Hero-images/i3.avif",
      title: "Grape Rush Soda",
      subtitle: "Fruit Soda",
      description: "A bold grape soda with a juicy flavor that energizes your taste buds.",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    setSlides(updatedSlides);
  };

  const handleImageUpload = (index, file) => {
    const imageUrl = URL.createObjectURL(file);
    const updatedSlides = [...slides];
    updatedSlides[index].image = imageUrl;
    setSlides(updatedSlides);
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(index, file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slides }),
      });

      const data = await response.json();
      console.log(data);
      alert('Hero section updated successfully!');
    } catch (error) {
      console.error('Error updating hero section:', error);
      alert('Failed to update Hero section.');
    }
  };

  return (
    <div className="admin-hero-editor">
      <h2>Edit Hero Section</h2>
      {slides.map((slide, index) => (
        <div key={index} className="hero-form-card">
          <h3>Slide {index + 1}</h3>

          <label>Image:</label>
          <div
            className="image-upload-box"
            onDrop={(e) => handleDrop(index, e)}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById(`fileInput-${index}`).click()}
          >
            {slide.image ? (
              <div className="image-preview-row">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="preview-img-small"
                />
                <span className="image-name">
                  {slide.image.split("/").pop()}
                </span>
              </div>
            ) : (
              <p>Click or drag & drop to upload an image</p>
            )}
            <input
              id={`fileInput-${index}`}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(index, e.target.files[0])}
            />
          </div>

          <label>Title:</label>
          <input
            type="text"
            value={slide.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
          />

          <label>Subtitle:</label>
          <input
            type="text"
            value={slide.subtitle}
            onChange={(e) => handleChange(index, "subtitle", e.target.value)}
          />

          <label>Description:</label>
          <textarea
            value={slide.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          ></textarea>
        </div>
      ))}

      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default AdminEditHero;
