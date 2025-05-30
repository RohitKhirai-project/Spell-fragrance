const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "../uploads/perfumes");

// Ensure the "uploads" folder exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG images are allowed"));
    }
  },
});

// Upload perfume image
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    console.error("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("Uploaded file:", req.file);
  res.json({ imagePath: `/uploads/perfumes/${req.file.filename}` });
});

// Get all perfumes
router.get("/", (req, res) => {
  db.query("SELECT * FROM perfumes", (err, results) => {
    if (err) {
      console.error("Error fetching perfumes:", err);
      return res.status(500).json({ error: "Error fetching perfumes" });
    }
    res.json(results);
  });
});

// Add multiple perfumes (could be improved for partial updates)
router.post("/", (req, res) => {
  const { perfumes } = req.body;
  if (!Array.isArray(perfumes)) {
    return res.status(400).json({ error: "Invalid perfumes format" });
  }

  db.query("DELETE FROM perfumes", (deleteErr) => {
    if (deleteErr) {
      console.error("Error deleting old perfumes:", deleteErr);
      return res.status(500).json({ error: "Error deleting old perfumes" });
    }

    const insertPromises = perfumes.map((perfume) => {
      return new Promise((resolve, reject) => {
        const { name, image } = perfume;
        db.query(
          "INSERT INTO perfumes (name, image) VALUES (?, ?)",
          [name, image],
          (insertErr, result) => {
            if (insertErr) {
              console.error("Error inserting perfume:", insertErr);
              reject(insertErr);
            } else {
              resolve(result);
            }
          }
        );
      });
    });

    Promise.all(insertPromises)
      .then(() => res.json({ message: "Perfumes updated successfully" }))
      .catch((error) => {
        console.error("Error inserting perfumes:", error);
        res.status(500).json({ error: "Error inserting perfumes" });
      });
  });
});

module.exports = router;
