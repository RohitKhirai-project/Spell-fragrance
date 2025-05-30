const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");

// Register user with hashed password
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        return res.status(500).send("Error registering user");
      }
      res.send("User registered successfully");
    });
  } catch (err) {
    console.error("Hashing error:", err);
    res.status(500).send("Server error");
  }
});

// Login user with password comparison
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (results.length === 0) {
      return res.status(401).send("Invalid email or password"); // Prevents unregistered users
    }
  

    if (results.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    const user = results[0];

    try {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.send("Login successful");
      } else {
        res.status(401).send("Invalid email or password");
      }
    } catch (err) {
      console.error("Comparison error:", err);
      res.status(500).send("Server error");
    }
  });
});

module.exports = router;
