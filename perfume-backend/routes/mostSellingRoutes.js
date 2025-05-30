const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// GET all
router.get("/", (req, res) => {
  db.query("SELECT * FROM mostsellperfumes", (err, result) => {
    if (err) return res.status(500).send("Error fetching data");
    res.json(result);
  });
});

// POST new
router.post("/", upload.single("image"), (req, res) => {
  const { name, description, price } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  db.query(
    "INSERT INTO mostsellperfumes (name, description, price, image) VALUES (?, ?, ?, ?)",
    [name, description, price, imagePath],
    (err, result) => {
      if (err) return res.status(500).send("Error adding perfume");
      res.status(201).send("Perfume added");
    }
  );
});

// POST update
router.post("/update", upload.single("image"), (req, res) => {
  const { id, name, price } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  let sql, params;

  if (imagePath) {
    sql = "UPDATE mostsellperfumes SET name = ?, price = ?, image = ? WHERE id = ?";
    params = [name, price, imagePath, id];
  } else {
    sql = "UPDATE mostsellperfumes SET name = ?, price = ? WHERE id = ?";
    params = [name, price, id];
  }

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    res.json({ message: "Perfume updated successfully" });
  });
});

module.exports = router;
