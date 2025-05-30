import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminContactPage.css";

const AdminContactPage = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");  // Ensure it's always a string
  const [error, setError] = useState("");  // Error state

  // Fetch contact info on load
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/contact")
      .then((res) => {
        // Set default values if undefined or null
        setAddress(res.data.address || "");
        setPhone(res.data.phone || "");
        setGoogleMapUrl(res.data.google_map_url || "");  // Ensure it's an empty string if undefined
      })
      .catch((err) => {
        console.error("Error fetching contact info:", err);
        setError("Error fetching contact info: " + err.message);
      });
  }, []);

  // Save updated contact info
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedContact = {
      address,
      phone,
      google_map_url: googleMapUrl,
    };

    axios
      .post("http://localhost:3001/api/contact", updatedContact)
      .then((response) => {
        alert("Contact information updated successfully!");
      })
      .catch((err) => {
        console.error("Error saving contact info:", err);
        setError("Error saving contact info: " + err.message);
      });
  };

  return (
    <div className="admin-contact-container">
      <h1 className="admin-contact-title">Edit Contact Information</h1>

      {error && <p className="error-message">{error}</p>} {/* Show error message if any */}

      <form className="admin-contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the new address"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter the new phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Google Maps Location URL</label>
          <input
            type="text"
            value={googleMapUrl}
            onChange={(e) => setGoogleMapUrl(e.target.value)}
            placeholder="Enter the new Google Maps location URL"
            required
          />
        </div>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>

      <div className="admin-contact-info">
        <h2>Preview</h2>
        <div className="admin-contact-info-preview">
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </div>

        <div className="map-container">
          <h3>Google Map Preview</h3>
          {googleMapUrl ? (
            <iframe
              title="Google Map Preview"
              src={googleMapUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}  
              loading="lazy"
            />
          ) : (
            <p>No map URL provided.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContactPage;
