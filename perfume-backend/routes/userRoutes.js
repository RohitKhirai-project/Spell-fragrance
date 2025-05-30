const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all registered users
router.get("/users", (req, res) => {
  const query = "SELECT id, name, email FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

module.exports = router;
