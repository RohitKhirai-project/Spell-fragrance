const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Save order and address (with duplicate check)
  router.post('/', (req, res) => {
    const {
      name,
      lastName,
      address,
      apartment = '',
      city,
      state,
      pincode,
      phone,
      country,
      billingSame = false,
      cartItems = []
    } = req.body;

    if (!name || !lastName || !address || !city || !state || !pincode || !phone || !country) {
      return res.status(400).json({ error: 'Missing required address fields' });
    }

    const normalizedApartment = apartment?.trim() || null;

    // Check for duplicate address
    const checkSql = `
      SELECT id FROM orders
      WHERE
        name = ? AND
        lastName = ? AND
        address = ? AND
        (apartment = ? OR (apartment IS NULL AND ? IS NULL)) AND
        city = ? AND
        state = ? AND
        pincode = ? AND
        phone = ? AND
        country = ?
      LIMIT 1
    `;

    const checkValues = [
      name,
      lastName,
      address,
      normalizedApartment,
      normalizedApartment,
      city,
      state,
      pincode,
      phone,
      country
    ];

    db.query(checkSql, checkValues, (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking address existence:', checkErr);
        return res.status(500).json({ error: 'Database error during address check' });
      }

      const insertSql = `
        INSERT INTO orders
        (name, lastName, address, apartment, city, state, pincode, phone, country, billingSame, cart)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const insertValues = [
        name,
        lastName,
        address,
        normalizedApartment,
        city,
        state,
        pincode,
        phone,
        country,
        billingSame ? 1 : 0,
        JSON.stringify(cartItems)
      ];

      db.query(insertSql, insertValues, (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error saving order:', insertErr);
          return res.status(500).json({ error: 'Failed to save order' });
        }

        if (checkResults.length > 0) {
          res.json({ message: 'Order saved successfully (existing address used)', orderId: insertResult.insertId });
        } else {
          res.json({ message: 'Order saved successfully (new address stored)', orderId: insertResult.insertId });
        }
      });
    });
  });

  // Fetch last 5 saved addresses
  router.get('/', (req, res) => {
    const sql = `
      SELECT id, name AS firstName, lastName, address, apartment, city, state, pincode, phone, country
      FROM orders
      ORDER BY id DESC
      LIMIT 5
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching addresses:', err);
        return res.status(500).json({ error: 'Failed to fetch addresses' });
      }

      res.json(results);
    });
  });

  return router;
};
