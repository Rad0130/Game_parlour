const express = require('express');
const router = express.Router();
const db = require('../db');

// Update profile
router.put('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  try {
    // Update query
    const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
    const values = [name, email, password, userId];

    await db.execute(query, values);

    res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// Fetch profile details
router.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `SELECT id, name, email FROM users WHERE id = ?`;
    const [rows] = await db.execute(query, [userId]);

    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch profile details.' });
  }
});

module.exports = router;
