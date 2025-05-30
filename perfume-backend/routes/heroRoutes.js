const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a database connection in db.js

// GET hero slides
router.get('/', (req, res) => {
  const query = 'SELECT * FROM hero_slides';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No slides found' });
    }

    res.status(200).json(results);
  });
});

// POST hero slides (replace all existing)
router.post('/', (req, res) => {
  const { slides } = req.body;

  if (!slides || !Array.isArray(slides)) {
    return res.status(400).json({ error: 'Invalid slides format' });
  }

  // Clear existing slides
  db.query('DELETE FROM hero_slides', (deleteErr) => {
    if (deleteErr) {
      console.error('Error deleting old slides:', deleteErr);
      return res.status(500).json({ error: 'Failed to clear old slides' });
    }

    // Insert new slides
    const values = slides.map(slide => [slide.image, slide.title, slide.subtitle, slide.description]);

    const insertQuery = 'INSERT INTO hero_slides (image, title, subtitle, description) VALUES ?';
    db.query(insertQuery, [values], (insertErr) => {
      if (insertErr) {
        console.error('Error inserting slides:', insertErr);
        return res.status(500).json({ error: 'Failed to save new slides' });
      }

      res.status(200).json({ message: 'Hero slides updated successfully!' });
    });
  });
});

module.exports = router;
