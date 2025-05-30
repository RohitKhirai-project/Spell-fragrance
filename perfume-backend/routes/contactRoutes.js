// routes/contactRoutes.js
const express = require("express");
const router = express.Router();

// Dummy contact information for example
let contactInfo = {
  email: "support@perfume.com",
  phone: "+1 234 567 890",
  address: "123 Perfume St, Fragrance City",
  google_map_url: "", // Add google map url to the contact info
};

// GET route for contact information
router.get("/", (req, res) => {
  res.json(contactInfo);
});

// POST route to update contact information
router.post("/", (req, res) => {
  const { address, phone, google_map_url } = req.body;

  // Update contact information
  contactInfo = {
    email: contactInfo.email, // Keep email unchanged for now
    phone: phone || contactInfo.phone,
    address: address || contactInfo.address,
    google_map_url: google_map_url || contactInfo.google_map_url,
  };

  res.status(200).json({ message: "Contact information updated successfully!" });
});

module.exports = router;
