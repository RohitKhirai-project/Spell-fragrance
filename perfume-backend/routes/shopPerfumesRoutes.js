const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ===============================
// GET all perfumes
router.get("/", (req, res) => {
  db.query("SELECT * FROM shopperfumes", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ===============================
// POST: Add a new perfume
router.post("/addshopperfume", upload.single("image"), (req, res) => {
  const { name, description, price, sizes, category } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO shopperfumes (name, description, price, ml, category, image) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, description, price, sizes, category, image], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ message: "Perfume added successfully" });
  });
});

// ===============================
// PUT: Update perfume with optional image
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, description, price, ml, category } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = image
    ? "UPDATE shopperfumes SET name = ?, description = ?, price = ?, ml = ?, category = ?, image = ? WHERE id = ?"
    : "UPDATE shopperfumes SET name = ?, description = ?, price = ?, ml = ?, category = ? WHERE id = ?";

  const values = image
    ? [name, description, price, ml, category, image, id]
    : [name, description, price, ml, category, id];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// ===============================
// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM shopperfumes WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
