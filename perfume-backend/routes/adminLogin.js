const express = require('express');
const router = express.Router();
const db = require('../db'); // update if your path is different
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Convert db.query to a promise-based function
const queryAsync = (sql, params) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await queryAsync('SELECT * FROM admin_users WHERE email = ?', [email]);


    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = results[0];

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      'your_jwt_secret_key_here', // Replace with your actual secret
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
