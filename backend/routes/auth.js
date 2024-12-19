const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

// Sign-Up API
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO Members (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ success: false, message: 'Email already registered.' });
        } else {
          throw err;
        }
      } else {
        res.status(200).json({ success: true, message: 'Registration successful!' });
      }
    }
  );
});

// Sign-In API
router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM Members WHERE email = ?', [email], async (err, results) => {
    if (err) throw err;
    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    } else {
      res.status(200).json({ success: true, message: 'Login successful!' });
    }
  });
});

module.exports = router;
