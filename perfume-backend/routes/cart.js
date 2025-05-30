const express = require('express');
const router = express.Router();
const db = require('../db'); // adjust the path if needed

// GET all cart items
router.get('/', (req, res) => {
  const query = 'SELECT * FROM cart';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ message: 'Failed to fetch cart items' });
    }
    res.json(results);
  });
});

// POST add a perfume to the cart
router.post('/', (req, res) => {
  const { id, name, description, price, image, ml, quantity = 1 } = req.body;

  if (!id || !ml) {
    return res.status(400).json({ message: 'Perfume ID and ML are required' });
  }

  // Insert with quantity defaulting to 1 if not provided
  const query = `
    INSERT INTO cart (id, name, description, price, image, ml, quantity)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [id, name, description, price, image, ml, quantity], (err, result) => {
    if (err) {
      console.error('Error adding to cart:', err);
      return res.status(500).json({ message: 'Failed to add item to cart' });
    }
    res.status(201).json({ message: 'Item added to cart successfully' });
  });
});

// PUT update quantity of a cart item by id and ml
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { ml, quantity } = req.body;

  if (!ml) {
    return res.status(400).json({ message: 'ML is required to update the item' });
  }
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  const query = 'UPDATE cart SET quantity = ? WHERE id = ? AND ml = ?';

  db.query(query, [quantity, id, ml], (err, result) => {
    if (err) {
      console.error('Error updating cart item:', err);
      return res.status(500).json({ message: 'Failed to update cart item' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Cart item quantity updated successfully' });
  });
});

// DELETE remove item from cart by ID and ML
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { ml } = req.body;

  if (!ml) {
    return res.status(400).json({ message: 'ML is required to delete the item' });
  }

  const query = 'DELETE FROM cart WHERE id = ? AND ml = ?';

  db.query(query, [id, ml], (err, result) => {
    if (err) {
      console.error('Error deleting from cart:', err);
      return res.status(500).json({ message: 'Failed to remove item from cart' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Item removed from cart successfully' });
  });
});

module.exports = router;
