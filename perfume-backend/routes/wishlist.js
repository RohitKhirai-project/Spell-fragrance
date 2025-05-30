const express = require('express');
const router = express.Router();
const db = require('../db'); // adjust path to your MySQL connection

// GET route - fetch all wishlist items
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM wishlist';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching wishlist:', err);
      return res.status(500).json({ message: 'Failed to load wishlist' });
    }
    res.status(200).json(results);
  });
});

// POST route - save wishlist item
router.post('/', (req, res) => {
  const { id, name, description, price, image, ml, category } = req.body;

  const sql = `
    INSERT INTO wishlist (id, name, description, price, image, ml, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE id=id
  `;

  db.query(sql, [id, name, description, price, image, ml, category], (err, result) => {
    if (err) {
      console.error('Error inserting wishlist item:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json({ message: 'Wishlist item saved successfully' });
  });
});

// DELETE route - remove wishlist item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { ml } = req.body; // Assuming the ml value is being passed for unique identification

  const sql = 'DELETE FROM wishlist WHERE id = ? AND ml = ?';
  
  db.query(sql, [id, ml], (err, result) => {
    if (err) {
      console.error('Error deleting wishlist item:', err);
      return res.status(500).json({ message: 'Failed to remove wishlist item' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    
    res.status(200).json({ message: 'Wishlist item removed successfully' });
  });
});

module.exports = router;
