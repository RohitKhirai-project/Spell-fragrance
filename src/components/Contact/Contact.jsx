import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [contactData, setContactData] = useState({
    address: "Loading...",
    phone: "Loading...",
    google_map_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/contact") // Updated the endpoint to the correct port
      .then((res) => {
        setContactData({
          address: res.data.address,
          phone: res.data.phone,
          google_map_url: res.data.google_map_url,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch contact info");
        setLoading(false);
        console.error("Failed to fetch contact info:", err);
      });
  }, []);

  if (loading) {
    return <div>Loading contact information...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-subtitle">
        We’re here to assist you with any inquiries or feedback. Reach out to us today!
      </p>

      <form className="contact-form">
        <div className="form-group">
          <label>Your First Name*</label>
          <input type="text" placeholder="Enter your first name" required />
        </div>

        <div className="form-group">
          <label>Your Phone Number*</label>
          <input type="tel" placeholder="Enter your phone number" required />
        </div>

        <div className="form-group">
          <label>Your Message*</label>
          <textarea rows="5" placeholder="Type your message here" required></textarea>
        </div>

        <button type="submit" className="contact-btn">Send Your Query</button>
      </form>

      <div className="contact-info">
        <h2>Our Location</h2>
        <p>Address: {contactData.address}</p>
        <p>Phone: {contactData.phone}</p>
      </div>

      <div className="map-container">
        {contactData.google_map_url ? (
          <iframe
            title="Location on Google Maps"
            src={contactData.google_map_url}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen={true}  
            loading="lazy"
          ></iframe>
        ) : (
          <p>Google Maps location is unavailable.</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
